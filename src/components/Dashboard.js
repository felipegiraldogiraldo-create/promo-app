import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function Dashboard({ asins, promos, sales, brand }) {
  const [viewMonth, setViewMonth] = useState(4);
  const [viewYear, setViewYear] = useState(2026);
  const [metric, setMetric] = useState('units');
  const [selLine, setSelLine] = useState('ALL');
  const [selAsin, setSelAsin] = useState('ALL');

  const lines = ['ALL', ...Array.from(new Set(asins.map(a => a.line).filter(Boolean)))];
  const filteredAsins = selLine === 'ALL' ? asins : asins.filter(a => a.line === selLine);

  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();

  const effectiveAsins = selAsin !== 'ALL'
    ? [selAsin]
    : filteredAsins.map(a => a.asin);

  const dailyData = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const ds = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

      let units = 0, revenue = 0;
      Object.values(sales).forEach(s => {
        if (s.date !== ds) return;
        if (!effectiveAsins.includes(s.asin)) return;
        units += s.units || 0;
        revenue += s.revenue || 0;
      });

      const activePromos = promos.filter(p => {
        if (!effectiveAsins.includes(p.asin)) return false;
        return p.dateStart <= ds && p.dateEnd >= ds;
      });
      const hasLD = activePromos.some(p => p.subtype?.includes('Lightning'));
      const hasCoupon = activePromos.some(p => p.type === 'COUPON');
      const hasDeal = activePromos.some(p => p.type === 'DEAL');

      return { day, ds, units, revenue: Number(revenue.toFixed(2)),
        promoCount: activePromos.length, hasLD, hasCoupon, hasDeal };
    });
  }, [viewMonth, viewYear, daysInMonth, sales, promos, effectiveAsins.join(',')]);

  const asinStats = useMemo(() => {
    const map = {};
    Object.values(sales).forEach(s => {
      if (!effectiveAsins.includes(s.asin)) return;
      if (!map[s.asin]) map[s.asin] = { units:0, revenue:0, days:0 };
      map[s.asin].units += s.units || 0;
      map[s.asin].revenue += s.revenue || 0;
      map[s.asin].days += 1;
    });
    return Object.entries(map)
      .map(([asin, v]) => ({ asin, ...v, name: asins.find(a=>a.asin===asin)?.name || asin }))
      .sort((a,b) => b.revenue - a.revenue)
      .slice(0, 10);
  }, [sales, asins, effectiveAsins.join(',')]);

  const promoEffect = useMemo(() => {
    const withPromo = dailyData.filter(d => d.promoCount > 0);
    const withoutPromo = dailyData.filter(d => d.promoCount === 0 && (d.units > 0 || d.revenue > 0));
    const avg = arr => arr.length ? arr.reduce((s,d) => s + d[metric], 0) / arr.length : 0;
    return {
      withPromo: avg(withPromo).toFixed(1),
      withoutPromo: avg(withoutPromo).toFixed(1),
      lift: withoutPromo.length && avg(withoutPromo) > 0
        ? (((avg(withPromo) - avg(withoutPromo)) / avg(withoutPromo)) * 100).toFixed(0)
        : null
    };
  }, [dailyData, metric]);

  const totalUnits = dailyData.reduce((s,d) => s+d.units, 0);
  const totalRevenue = dailyData.reduce((s,d) => s+d.revenue, 0);
  const promoDayCount = dailyData.filter(d=>d.promoCount>0).length;

  const handleExport = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try { data[key] = JSON.parse(localStorage.getItem(key)); } catch(e) { data[key] = localStorage.getItem(key); }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promo-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const d = dailyData[label-1];
    return (
      <div style={{ background:'#1E293B', border:'1px solid #334155', borderRadius:8,
        padding:'10px 14px', fontSize:12 }}>
        <div style={{ color:'#F1F5F9', fontWeight:600, marginBottom:6 }}>Day {label}</div>
        <div style={{ color:'#22D3EE' }}>Units: <strong>{d?.units || 0}</strong></div>
        <div style={{ color:'#A78BFA' }}>Revenue: <strong>${d?.revenue?.toFixed(2) || '0.00'}</strong></div>
        {d?.hasLD && <div style={{ color:'#F59E0B', marginTop:4 }}>⚡ Lightning Deal active</div>}
        {d?.hasCoupon && <div style={{ color:'#4ADE80' }}>% Coupon active</div>}
      </div>
    );
  };

  return (
    <div>
      {/* Controls */}
      <div style={{ display:'flex', gap:12, marginBottom:24, flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <button onClick={() => { if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else setViewMonth(m=>m-1); }}
            style={navBtn}>‹</button>
          <span style={{ color:'#F1F5F9', fontWeight:600, minWidth:100, textAlign:'center' }}>
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button onClick={() => { if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else setViewMonth(m=>m+1); }}
            style={navBtn}>›</button>
        </div>

        <select value={selLine} onChange={e=>{ setSelLine(e.target.value); setSelAsin('ALL'); }} style={sel}>
          {lines.map(l => <option key={l} value={l}>{l === 'ALL' ? 'All Lines' : l}</option>)}
        </select>

        <select value={selAsin} onChange={e=>setSelAsin(e.target.value)} style={sel}>
          <option value='ALL'>All Products</option>
          {filteredAsins.map(a => <option key={a.asin} value={a.asin}>{a.name}</option>)}
        </select>

        <div style={{ display:'flex', background:'#1E293B', borderRadius:8, padding:3, gap:2 }}>
          {['units','revenue'].map(m => (
            <button key={m} onClick={() => setMetric(m)}
              style={{ background: metric===m?'#6366F1':'none', border:'none',
                color: metric===m?'#fff':'#94A3B8', borderRadius:6,
                padding:'5px 14px', cursor:'pointer', fontSize:12, fontWeight:500,
                textTransform:'capitalize' }}>
              {m}
            </button>
          ))}
        </div>

        <button onClick={handleExport}
          style={{ background:'#0F172A', border:'1px solid #334155', color:'#94A3B8',
            borderRadius:8, padding:'6px 14px', cursor:'pointer', fontSize:12,
            display:'flex', alignItems:'center', gap:6, marginLeft:'auto' }}
          onMouseEnter={e=>{ e.currentTarget.style.borderColor='#3B82F6'; e.currentTarget.style.color='#3B82F6'; }}
          onMouseLeave={e=>{ e.currentTarget.style.borderColor='#334155'; e.currentTarget.style.color='#94A3B8'; }}>
          ⬇ Export Backup
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Units', value: totalUnits, color:'#22D3EE' },
          { label:'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color:'#A78BFA' },
          { label:'Promo Days', value: promoDayCount, color:'#F59E0B' },
          { label:'Promo Lift', value: promoEffect.lift ? `+${promoEffect.lift}%` : 'N/A', color:'#4ADE80' },
        ].map(k => (
          <div key={k.label} style={{ background:'#1E293B', border:'1px solid #334155',
            borderRadius:10, padding:'14px 16px' }}>
            <div style={{ color:'#64748B', fontSize:11, fontWeight:500, marginBottom:4 }}>{k.label}</div>
            <div style={{ color: k.color, fontSize:22, fontWeight:700 }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Main chart */}
      <div style={{ background:'#1E293B', border:'1px solid #334155', borderRadius:12,
        padding:'16px 8px', marginBottom:20 }}>
        <div style={{ color:'#94A3B8', fontSize:12, fontWeight:600, marginBottom:12, paddingLeft:8 }}>
          Daily {metric === 'units' ? 'Units Sold' : 'Revenue'} — {MONTHS[viewMonth]} {viewYear}
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dailyData} margin={{ top:4, right:16, left:0, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="day" tick={{ fill:'#475569', fontSize:10 }} />
            <YAxis tick={{ fill:'#475569', fontSize:10 }} width={40} />
            <Tooltip content={<CustomTooltip />} />
            {dailyData.filter(d=>d.hasLD).map(d => (
              <ReferenceLine key={d.day} x={d.day} stroke="#F59E0B" strokeDasharray="4 2" strokeOpacity={0.6} />
            ))}
            <Bar dataKey={metric} fill={metric==='units'?'#22D3EE':'#A78BFA'} radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Promo effectiveness */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
        <div style={{ background:'#1E293B', border:'1px solid #334155', borderRadius:12, padding:16 }}>
          <div style={{ color:'#94A3B8', fontSize:12, fontWeight:600, marginBottom:12 }}>Promo Effectiveness</div>
          <div style={{ display:'flex', gap:16 }}>
            <div>
              <div style={{ color:'#475569', fontSize:11 }}>Avg w/ promo</div>
              <div style={{ color:'#F59E0B', fontSize:18, fontWeight:700 }}>{promoEffect.withPromo}</div>
            </div>
            <div>
              <div style={{ color:'#475569', fontSize:11 }}>Avg w/o promo</div>
              <div style={{ color:'#64748B', fontSize:18, fontWeight:700 }}>{promoEffect.withoutPromo}</div>
            </div>
            {promoEffect.lift && (
              <div>
                <div style={{ color:'#475569', fontSize:11 }}>Lift</div>
                <div style={{ color:'#4ADE80', fontSize:18, fontWeight:700 }}>+{promoEffect.lift}%</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ background:'#1E293B', border:'1px solid #334155', borderRadius:12, padding:16 }}>
          <div style={{ color:'#94A3B8', fontSize:12, fontWeight:600, marginBottom:12 }}>Top ASINs (all time)</div>
          {asinStats.length === 0 ? (
            <div style={{ color:'#475569', fontSize:12 }}>No sales logged yet</div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:6, maxHeight:120, overflowY:'auto' }}>
              {asinStats.map((a,i) => (
                <div key={a.asin} style={{ display:'flex', alignItems:'center', gap:8, fontSize:11 }}>
                  <span style={{ color:'#475569', width:16 }}>#{i+1}</span>
                  <span style={{ color:'#CBD5E1', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.name}</span>
                  <span style={{ color:'#A78BFA' }}>${a.revenue.toFixed(0)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Instruction hint */}
      <div style={{ color:'#334155', fontSize:11, textAlign:'right', marginTop:8 }}>
        Click the bar at the bottom of any past or today's cell to log daily sales
      </div>
    </div>
  );
}

const navBtn = {
  background:'#1E293B', border:'1px solid #334155', color:'#94A3B8',
  borderRadius:6, padding:'5px 10px', cursor:'pointer', fontSize:14
};
const sel = {
  background:'#1E293B', border:'1px solid #334155', color:'#F1F5F9',
  borderRadius:8, padding:'6px 10px', fontSize:12, outline:'none', cursor:'pointer'
};
