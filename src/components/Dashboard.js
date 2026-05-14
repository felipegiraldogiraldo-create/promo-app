import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
         CartesianGrid, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function Dashboard({ asins, promos, sales }) {
  const [viewMonth, setViewMonth] = useState(4); // May = 4
  const [viewYear,  setViewYear]  = useState(2026);
  const [metric,    setMetric]    = useState('units'); // units | revenue
  const [selAsin,   setSelAsin]   = useState('ALL');

  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();

  // Build daily data for the month
  const dailyData = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const ds  = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

      // Sum sales for this day
      let units = 0, revenue = 0;
      Object.values(sales).forEach(s => {
        if (s.date !== ds) return;
        if (selAsin !== 'ALL' && s.asin !== selAsin) return;
        units   += s.units   || 0;
        revenue += s.revenue || 0;
      });

      // Count active promos
      const activePromos = promos.filter(p => {
        if (selAsin !== 'ALL' && p.asin !== selAsin) return false;
        return p.dateStart <= ds && p.dateEnd >= ds;
      });
      const hasLD     = activePromos.some(p => p.subtype?.includes('Lightning'));
      const hasCoupon = activePromos.some(p => p.type === 'COUPON');
      const hasDeal   = activePromos.some(p => p.type === 'DEAL');

      return { day, ds, units, revenue: Number(revenue.toFixed(2)),
               promoCount: activePromos.length, hasLD, hasCoupon, hasDeal };
    });
  }, [viewMonth, viewYear, daysInMonth, sales, promos, selAsin]);

  // Promo days for reference lines
  const promoDays = dailyData.filter(d => d.hasLD).map(d => d.day);

  // Top performers
  const asinStats = useMemo(() => {
    const map = {};
    Object.values(sales).forEach(s => {
      if (!map[s.asin]) map[s.asin] = { units:0, revenue:0, days:0 };
      map[s.asin].units   += s.units   || 0;
      map[s.asin].revenue += s.revenue || 0;
      map[s.asin].days    += 1;
    });
    return Object.entries(map)
      .map(([asin, v]) => ({ asin, ...v, name: asins.find(a=>a.asin===asin)?.name || asin }))
      .sort((a,b) => b.revenue - a.revenue)
      .slice(0, 10);
  }, [sales, asins]);

  // Promo type effectiveness
  const promoEffect = useMemo(() => {
    const withPromo    = dailyData.filter(d => d.promoCount > 0);
    const withoutPromo = dailyData.filter(d => d.promoCount === 0 && (d.units > 0 || d.revenue > 0));
    const avg = arr => arr.length ? arr.reduce((s,d) => s + d[metric], 0) / arr.length : 0;
    return {
      withPromo:    avg(withPromo).toFixed(1),
      withoutPromo: avg(withoutPromo).toFixed(1),
      lift: withoutPromo.length && avg(withoutPromo) > 0
        ? (((avg(withPromo) - avg(withoutPromo)) / avg(withoutPromo)) * 100).toFixed(0)
        : null
    };
  }, [dailyData, metric]);

  const totalUnits   = dailyData.reduce((s,d) => s+d.units, 0);
  const totalRevenue = dailyData.reduce((s,d) => s+d.revenue, 0);
  const promoDayCount= dailyData.filter(d=>d.promoCount>0).length;

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const d = dailyData[label-1];
    return (
      <div style={{ background:'#1E293B', border:'1px solid #334155', borderRadius:8,
                     padding:'10px 14px', fontSize:12 }}>
        <div style={{ color:'#F1F5F9', fontWeight:600, marginBottom:6 }}>Day {label}</div>
        <div style={{ color:'#22D3EE' }}>Units: <strong>{d?.units || 0}</strong></div>
        <div style={{ color:'#A78BFA' }}>Revenue: <strong>${d?.revenue?.toFixed(2) || '0.00'}</strong></div>
        {d?.hasLD     && <div style={{ color:'#F59E0B', marginTop:4 }}>⚡ Lightning Deal active</div>}
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

        <select value={selAsin} onChange={e=>setSelAsin(e.target.value)} style={sel}>
          <option value='ALL'>All Products</option>
          {asins.map(a => <option key={a.asin} value={a.asin}>{a.name}</option>)}
        </select>

        <div style={{ display:'flex', background:'#1E293B', borderRadius:8, padding:3, gap:2 }}>
          {['units','revenue'].map(m => (
            <button key={m} onClick={() => setMetric(m)}
                    style={{ background: metric===m?'#6366F1':'none', border:'none',
                             color: metric===m?'#fff':'#94A3B8', borderRadius:6,
                             padding:'5px 14px', cursor:'pointer', fontSize:12, fontWeight:500,
                             textTransform:'capitalize' }}>
              {m === 'units' ? '📦 Units' : '💰 Revenue'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Units',     value: totalUnits,              color:'#22D3EE', fmt: v => v },
          { label:'Total Revenue',   value: totalRevenue,            color:'#A78BFA', fmt: v => `$${v.toFixed(2)}` },
          { label:'Promo Days',      value: promoDayCount,           color:'#F59E0B', fmt: v => `${v} days` },
          { label:'Avg w/ Promo',    value: promoEffect.withPromo,   color:'#4ADE80', fmt: v => metric==='revenue'?`$${v}`:v },
          { label:'Avg w/o Promo',   value: promoEffect.withoutPromo,color:'#F87171', fmt: v => metric==='revenue'?`$${v}`:v },
          { label:'Promo Lift',      value: promoEffect.lift,        color:'#FCD34D',
            fmt: v => v ? `+${v}%` : 'N/A' },
        ].map(c => (
          <div key={c.label} style={{ background:'#1E293B', border:'1px solid #334155',
                                       borderRadius:10, padding:'14px 16px' }}>
            <div style={{ fontSize:11, color:'#64748B', marginBottom:6, textTransform:'uppercase',
                           letterSpacing:0.5 }}>{c.label}</div>
            <div style={{ fontSize:20, fontWeight:700, color:c.color }}>{c.fmt(c.value)}</div>
          </div>
        ))}
      </div>

      {/* Main chart */}
      <div style={{ background:'#1E293B', border:'1px solid #334155', borderRadius:12,
                     padding:'20px 16px', marginBottom:20 }}>
        <div style={{ fontSize:14, fontWeight:600, color:'#CBD5E1', marginBottom:16 }}>
          Daily {metric === 'units' ? 'Units Sold' : 'Revenue'} vs Promotions
        </div>
        <ResponsiveContainer width='100%' height={260}>
          <BarChart data={dailyData} margin={{ top:4, right:8, left:0, bottom:0 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#334155' vertical={false}/>
            <XAxis dataKey='day' tick={{ fill:'#64748B', fontSize:10 }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fill:'#64748B', fontSize:10 }} axisLine={false} tickLine={false}/>
            <Tooltip content={<CustomTooltip/>}/>
            {promoDays.map(d => (
              <ReferenceLine key={d} x={d} stroke='#F59E0B' strokeDasharray='4 2' strokeWidth={1.5}
                              label={{ value:'⚡', position:'top', fontSize:10, fill:'#F59E0B' }}/>
            ))}
            <Bar dataKey={metric} fill='#6366F1' radius={[3,3,0,0]}
                 label={false}
                 isAnimationActive={false}/>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ fontSize:11, color:'#475569', marginTop:8, textAlign:'center' }}>
          ⚡ vertical lines = Lightning Deal days
        </div>
      </div>

      {/* Top products */}
      {asinStats.length > 0 && (
        <div style={{ background:'#1E293B', border:'1px solid #334155', borderRadius:12, padding:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#CBD5E1', marginBottom:14 }}>
            Top Products (all time)
          </div>
          <div style={{ display:'grid', gap:8 }}>
            {asinStats.map((s, i) => (
              <div key={s.asin} style={{ display:'flex', alignItems:'center', gap:12,
                                          padding:'8px 12px', background:'#0F172A',
                                          borderRadius:8 }}>
                <span style={{ color:'#475569', fontSize:12, width:20, textAlign:'center' }}>
                  {i+1}
                </span>
                <div style={{ flex:1 }}>
                  <div style={{ color:'#CBD5E1', fontSize:13, fontWeight:500 }}>{s.name}</div>
                  <div style={{ color:'#475569', fontSize:10, fontFamily:'monospace' }}>{s.asin}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ color:'#A78BFA', fontSize:13, fontWeight:600 }}>
                    ${s.revenue.toFixed(2)}
                  </div>
                  <div style={{ color:'#64748B', fontSize:11 }}>{s.units} units</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {asinStats.length === 0 && (
        <div style={{ background:'#1E293B', border:'1px solid #334155', borderRadius:12,
                       padding:40, textAlign:'center' }}>
          <div style={{ fontSize:32, marginBottom:12 }}>📊</div>
          <div style={{ color:'#94A3B8', fontSize:15, marginBottom:6 }}>No sales data yet</div>
          <div style={{ color:'#475569', fontSize:13 }}>
            Right-click any cell in the calendar to log daily sales
          </div>
        </div>
      )}
    </div>
  );
}

const navBtn = { background:'#1E293B', border:'1px solid #334155', color:'#94A3B8',
                  borderRadius:6, padding:'4px 12px', cursor:'pointer', fontSize:16 };
const sel    = { background:'#1E293B', border:'1px solid #334155', color:'#CBD5E1',
                  borderRadius:8, padding:'6px 12px', fontSize:13, outline:'none', cursor:'pointer' };
