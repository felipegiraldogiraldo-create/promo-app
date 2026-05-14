import React, { useState, useEffect, useCallback } from 'react';
import { db, collection, getDocs, addDoc, deleteDoc, doc, setDoc } from '../firebase';
import { ROMANO_ASINS, ROMANO_PROMOS } from '../data/seedData';
import PromoModal from './PromoModal';
import SalesModal from './SalesModal';
import Dashboard from './Dashboard';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DOW = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const TYPE_COLORS = {
  'DEAL': { confirmed:'#E8920A', window:'#FDEFC3', textC:'#FFFFFF', textW:'#92400E' },
  'COUPON': { confirmed:'#16A34A', textC:'#FFFFFF' },
  'STRIKE': { confirmed:'#64748B', textC:'#FFFFFF' },
};

function dStr(y,m,d){ return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
function today(){ const d=new Date(); return dStr(d.getFullYear(),d.getMonth(),d.getDate()); }

export default function CalendarView({ account, brand, onBack }) {
  const storeKey = `${account.id}_${brand.id}`;
  const isRomano = account.id === 'romano';

const [asins, setAsins] = useState([]);
  const [promos, setPromos] = useState([]);
  const [sales, setSales] = useState({});
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(4); // 0-indexed, 4 = May
const [tab, setTab] = useState('calendar'); // calendar | dashboard
const [promoModal, setPromoModal] = useState(null);
  const [salesModal, setSalesModal] = useState(null);
  const [filterLine, setFilterLine] = useState('ALL');
  const [loading, setLoading] = useState(true);

// Load data
useEffect(() => {
  const load = async () => {
    setLoading(true);
    try {
      // ASINs
    const asinSnap = await getDocs(collection(db, `${storeKey}_asins`));
      if (asinSnap.empty && isRomano) {
        for (const a of ROMANO_ASINS) {
          await setDoc(doc(db, `${storeKey}_asins`, a.asin), a);
        }
        setAsins(ROMANO_ASINS);
      } else {
        setAsins(asinSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      }

    // Promos
    const promoSnap = await getDocs(collection(db, `${storeKey}_promos`));
      if (promoSnap.empty && isRomano) {
        for (const p of ROMANO_PROMOS) {
          await setDoc(doc(db, `${storeKey}_promos`, p.id), p);
        }
        setPromos(ROMANO_PROMOS);
      } else {
        setPromos(promoSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      }

    // Sales
    const salesSnap = await getDocs(collection(db, `${storeKey}_sales`));
      const salesMap = {};
      salesSnap.docs.forEach(d => { salesMap[d.id] = d.data(); });
      setSales(salesMap);
    } catch(e) {
      console.error('Load error:', e);
      if (isRomano) { setAsins(ROMANO_ASINS); setPromos(ROMANO_PROMOS); }
    }
    setLoading(false);
  };
  load();
}, [storeKey, isRomano]);

const addPromo = useCallback(async (promo) => {
  const id = `p_${Date.now()}`;
  const full = { ...promo, id };
  try { await setDoc(doc(db, `${storeKey}_promos`, id), full); } catch(e){}
  setPromos(prev => [...prev, full]);
  setPromoModal(null);
}, [storeKey]);

const deletePromo = useCallback(async (id) => {
  try { await deleteDoc(doc(db, `${storeKey}_promos`, id)); } catch(e){}
  setPromos(prev => prev.filter(p => p.id !== id));
}, [storeKey]);

const saveSales = useCallback(async (asin, date, units, revenue) => {
  const id = `${asin}_${date}`;
  const data = { asin, date, units: Number(units), revenue: Number(revenue) };
  try { await setDoc(doc(db, `${storeKey}_sales`, id), data); } catch(e){}
  setSales(prev => ({ ...prev, [id]: data }));
  setSalesModal(null);
}, [storeKey]);

const addAsin = useCallback(async (asinData) => {
  try { await setDoc(doc(db, `${storeKey}_asins`, asinData.asin), asinData); } catch(e){}
  setAsins(prev => [...prev, asinData]);
}, [storeKey]);

// Calendar math
const daysInMonth = new Date(year, month+1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const cells = Array(firstDow).fill(null).concat(Array.from({length:daysInMonth},(_,i)=>i+1));
  while (cells.length % 7) cells.push(null);

const todayStr = today();

function promosFor(asinCode, dateStr) {
  return promos.filter(p => p.asin === asinCode && p.dateStart <= dateStr && p.dateEnd >= dateStr);
}

function promosOnDate(dateStr) {
  return promos.filter(p => p.dateStart <= dateStr && p.dateEnd >= dateStr);
}

const lines = ['ALL', ...Array.from(new Set(asins.map(a => a.line).filter(Boolean)))];
  const filteredAsins = filterLine === 'ALL' ? asins : asins.filter(a => a.line === filterLine);

if (loading) return (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
              height:'60vh', color:'#94A3B8', fontSize:16 }}>Loading...</div>
);

const btnStyle = (active) => ({
  background: active ? '#3B82F6' : '#1E293B',
  border: `1px solid ${active ? '#3B82F6' : '#334155'}`,
  color: active ? '#fff' : '#94A3B8',
  borderRadius:6, padding:'5px 14px', cursor:'pointer', fontSize:12, fontWeight:500
});

return (
  <div>
{/* Tabs */}
  <div style={{ display:'flex', gap:8, marginBottom:24 }}>
<button onClick={() => setTab('calendar')} style={btnStyle(tab==='calendar')}>📅 Calendar</button>
<button onClick={() => setTab('dashboard')} style={btnStyle(tab==='dashboard')}>📊 Dashboard</button>
  </div>

{tab === 'dashboard' ? (
  <Dashboard asins={asins} promos={promos} sales={sales} brand={brand} />
  ) : (
    <div>
    {/* Controls */}
<div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
<button onClick={() => { const d=new Date(year,month-1,1); setYear(d.getFullYear()); setMonth(d.getMonth()); }}
style={{ background:'#1E293B', border:'1px solid #334155', color:'#94A3B8',
       borderRadius:6, padding:'5px 10px', cursor:'pointer' }}>‹</button>
<span style={{ fontWeight:600, fontSize:16, color:'#F1F5F9', minWidth:140, textAlign:'center' }}>
{MONTHS[month]} {year}
</span>
<button onClick={() => { const d=new Date(year,month+1,1); setYear(d.getFullYear()); setMonth(d.getMonth()); }}
style={{ background:'#1E293B', border:'1px solid #334155', color:'#94A3B8',
       borderRadius:6, padding:'5px 10px', cursor:'pointer' }}>›</button>
<div style={{ display:'flex', gap:6, flexWrap:'wrap', marginLeft:8 }}>
{lines.map(l => (
  <button key={l} onClick={() => setFilterLine(l)} style={btnStyle(filterLine===l)}>{l}</button>
))}
  </div>
  </div>

{/* ASIN grid + calendar */}
{filteredAsins.length === 0 ? (
  <div style={{ color:'#64748B', padding:32, textAlign:'center' }}>No ASINs found.</div>
  ) : (
  <div style={{ overflowX:'auto' }}>
<table style={{ borderCollapse:'collapse', fontSize:11, minWidth:800 }}>
<thead>
  <tr>
  <th style={{ background:'#1E293B', color:'#94A3B8', padding:'8px 12px',
             border:'1px solid #334155', textAlign:'left', minWidth:180, position:'sticky', left:0, zIndex:2 }}>
ASIN / Product
  </th>
{cells.map((day, i) => {
  const dateStr = day ? dStr(year, month, day) : null;
  const dow = day ? new Date(year,month,day).getDay() : null;
  const isToday = dateStr === todayStr;
  const isWeekend = dow === 0 || dow === 6;
  return (
    <th key={i} style={{
    background: isToday ? '#1E3A5F' : isWeekend ? '#1A2335' : '#1E293B',
    color: isToday ? '#60A5FA' : '#64748B',
    padding:'4px 2px', border:'1px solid #334155',
    textAlign:'center', minWidth:28, fontWeight: isToday ? 700 : 400
  }}>
           {day ? (
             <div>
           <div style={{ fontSize:9 }}>{day ? DOW[new Date(year,month,day).getDay()] : ''}</div>
<div>{day}</div>
           </div>
           ) : ''}
</th>
);
})}
</tr>
  </thead>
<tbody>
{filteredAsins.map(asin => (
  <tr key={asin.asin}>
  <td style={{ background:'#0F172A', color:'#CBD5E1', padding:'6px 12px',
             border:'1px solid #334155', position:'sticky', left:0, zIndex:1,
             fontSize:11, whiteSpace:'nowrap' }}>
                   <div style={{ fontWeight:500 }}>{asin.name}</div>
                   <div style={{ color:'#475569', fontSize:10 }}>{asin.asin}</div>
                   </td>
                   {cells.map((day, i) => {
  const dateStr = day ? dStr(year, month, day) : null;
  const cellPromos = day ? promosFor(asin.asin, dateStr) : [];
  const salesKey = day ? `${asin.asin}_${dateStr}` : null;
  const sale = salesKey ? sales[salesKey] : null;
  return (
    <td key={i}
  onClick={() => day && setPromoModal({ asin: asin.asin, date: dateStr })}
  style={{
    background: cellPromos.length > 0
    ? (cellPromos[0].type === 'DEAL'
       ? (cellPromos[0].confirmed ? TYPE_COLORS.DEAL.confirmed : TYPE_COLORS.DEAL.window)
       : cellPromos[0].type === 'COUPON' ? TYPE_COLORS.COUPON.confirmed
       : TYPE_COLORS.STRIKE.confirmed)
      : '#0F172A',
    border:'1px solid #1E293B',
    cursor: day ? 'pointer' : 'default',
    padding:'2px', textAlign:'center',
    position:'relative', minWidth:28, height:36,
    verticalAlign:'middle'
  }}>
                              {cellPromos.length > 0 && (
                                <div style={{ fontSize:9, color:'#fff', fontWeight:600, lineHeight:1.1 }}>
                              {cellPromos[0].discount}
</div>
)}
{sale && (
  <div style={{ fontSize:8, color:'#86EFAC', position:'absolute', bottom:1, right:1 }}>
${sale.revenue}
</div>
)}
</td>
);
})}
</tr>
))}
</tbody>
  </table>
  </div>
)}

{/* Legend */}
<div style={{ display:'flex', gap:16, marginTop:16, flexWrap:'wrap' }}>
{[
  { color:'#E8920A', label:'Deal (confirmed)' },
  { color:'#FDEFC3', label:'Deal (window TBD)', text:'#92400E' },
  { color:'#16A34A', label:'Coupon' },
  { color:'#64748B', label:'Strike Price' },
  ].map(l => (
    <div key={l.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
<div style={{ width:16, height:16, borderRadius:3, background:l.color }}/>
<span style={{ color:'#94A3B8', fontSize:12 }}>{l.label}</span>
  </div>
))}
</div>
  </div>
)}

{promoModal && (
  <PromoModal
 modal={promoModal}
 asins={asins}
 existingPromos={promos}
 onSave={addPromo}
 onDelete={deletePromo}
 onClose={() => setPromoModal(null)}
 />
   )}
{salesModal && (
  <SalesModal
 modal={salesModal}
 onSave={saveSales}
 onClose={() => setSalesModal(null)}
 />
   )}
</div>
);
}
