import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { ROMANO_ASINS, ROMANO_PROMOS } from '../data/seedData';
import PromoModal from './PromoModal';
import SalesModal from './SalesModal';
import Dashboard from './Dashboard';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DOW = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const TYPE_COLORS = {
  'DEAL':   { confirmed:'#E8920A', window:'#FDEFC3', textC:'#FFFFFF', textW:'#92400E' },
  'COUPON': { confirmed:'#16A34A', textC:'#FFFFFF' },
  'STRIKE': { confirmed:'#64748B', textC:'#FFFFFF' },
};

function dStr(y,m,d){ return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
function today(){ const d=new Date(); return dStr(d.getFullYear(),d.getMonth(),d.getDate()); }

export default function CalendarView({ account, brand, onBack }) {
  const storeKey = `${account.id}_${brand.id}`;
  const isRomano = account.id === 'romano';

  const [asins,   setAsins]   = useState([]);
  const [promos,  setPromos]  = useState([]);
  const [sales,   setSales]   = useState({});
  const [year,    setYear]    = useState(2026);
  const [month,   setMonth]   = useState(4); // 0-indexed, 4 = May
  const [tab,     setTab]     = useState('calendar'); // calendar | dashboard
  const [promoModal, setPromoModal] = useState(null); // null | { asin, date } | { promo } (edit)
  const [salesModal, setSalesModal] = useState(null); // null | { asin, date }
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
          // Seed Romano data
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
        // Fallback to local seed if Firebase not configured
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
  const firstDow    = new Date(year, month, 1).getDay();
  const cells       = Array(firstDow).fill(null).concat(Array.from({length:daysInMonth},(_,i)=>i+1));
  while (cells.length % 7) cells.push(null);

  const todayStr = today();

  // Get promos for a given asin+date
  function promosFor(asinCode, dateStr) {
    return promos.filter(p => p.asin === asinCode && p.dateStart <= dateStr && p.dateEnd >= dateStr);
  }

  // Get all promos active on a date (any asin)
  function promosOnDate(dateStr) {
    return promos.filter(p => p.dateStart <= dateStr && p.dateEnd >= dateStr);
  }

  // Lines for filter
  const lines = ['ALL', ...Array.from(new Set(asins.map(a => a.line).filter(Boolean)))];
  const visibleAsins = filterLine === 'ALL' ? asins : asins.filter(a => a.line === filterLine);

  if (loading) return (
    <div style={{ textAlign:'center', padding:80, color:'#94A3B8' }}>Loading...</div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24, flexWrap:'wrap' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color:'#94A3B8',
                                          cursor:'pointer', fontSize:14, padding:0 }}>← Back</button>
        <h2 style={{ fontSize:20, fontWeight:700, color:'#F1F5F9', flex:1 }}>
          {brand.name} — {brand.marketplace}
        </h2>
        {/* Tabs */}
        <div style={{ display:'flex', background:'#1E293B', borderRadius:8, padding:3, gap:2 }}>
          {['calendar','dashboard'].map(t => (
            <button key={t} onClick={() => setTab(t)}
                    style={{ background: tab===t ? '#3B82F6' : 'none', border:'none',
                             color: tab===t ? '#fff' : '#94A3B8', borderRadius:6,
                             padding:'6px 16px', cursor:'pointer', fontSize:13, fontWeight:500,
                             textTransform:'capitalize' }}>
              {t === 'calendar' ? '📅 Calendar' : '📊 Dashboard'}
            </button>
          ))}
        </div>
        <button onClick={() => setPromoModal({ mode:'add' })}
                style={{ background:'#3B82F6', border:'none', color:'#fff', borderRadius:8,
                         padding:'8px 16px', cursor:'pointer', fontSize:13, fontWeight:600 }}>
          + Add Promo
        </button>
      </div>

      {tab === 'dashboard' ? (
        <Dashboard asins={asins} promos={promos} sales={sales} />
      ) : (
        <>
          {/* Month nav + filters */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16, flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <button onClick={() => { if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); }}
                      style={navBtn}>‹</button>
              <span style={{ color:'#F1F5F9', fontWeight:600, fontSize:16, minWidth:120, textAlign:'center' }}>
                {MONTHS[month]} {year}
              </span>
              <button onClick={() => { if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); }}
                      style={navBtn}>›</button>
            </div>
            {/* Line filter */}
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {lines.map(l => (
                <button key={l} onClick={() => setFilterLine(l)}
                        style={{ background: filterLine===l ? '#3B82F6' : '#1E293B',
                                 border:'1px solid', borderColor: filterLine===l ? '#3B82F6' : '#334155',
                                 color: filterLine===l ? '#fff' : '#94A3B8',
                                 borderRadius:6, padding:'4px 10px', cursor:'pointer', fontSize:12 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar grid */}
          <div style={{ overflowX:'auto' }}>
            <div style={{ minWidth: 900 }}>
              {/* DOW headers */}
              <div style={{ display:'grid', gridTemplateColumns:`200px 80px 80px repeat(${daysInMonth}, minmax(34px,1fr))`,
                            gap:1, marginBottom:1 }}>
                <div style={hdrCell}>Product / ASIN</div>
                <div style={hdrCell}>Price</div>
                <div style={hdrCell}>Line</div>
                {Array.from({length:daysInMonth},(_,i)=>{
                  const d = i+1;
                  const dow = new Date(year,month,d).getDay();
                  const ds  = dStr(year,month,d);
                  const isToday = ds === todayStr;
                  const isWknd  = dow===0||dow===6;
                  return (
                    <div key={d} style={{ ...hdrCell,
                      background: isToday ? '#EF4444' : isWknd ? '#1A2744' : '#1E293B',
                      color: isToday ? '#fff' : isWknd ? '#93C5FD' : '#94A3B8',
                      fontSize:10, lineHeight:1.3 }}>
                      {DOW[dow]}<br/>{d}
                    </div>
                  );
                })}
              </div>

              {/* ASIN rows */}
              {visibleAsins.map((asin, ai) => {
                const prevLine = ai > 0 ? visibleAsins[ai-1].line : null;
                const lineBreak = asin.line !== prevLine;
                return (
                  <React.Fragment key={asin.asin}>
                    {lineBreak && (
                      <div style={{ display:'grid',
                                    gridTemplateColumns:`200px 80px 80px repeat(${daysInMonth}, minmax(34px,1fr))`,
                                    gap:1, marginTop:2 }}>
                        <div style={{ gridColumn:`1 / -1`, background:'#0F172A',
                                      color:'#475569', fontSize:11, fontWeight:600,
                                      padding:'4px 8px', letterSpacing:1, textTransform:'uppercase' }}>
                          {asin.line}
                        </div>
                      </div>
                    )}
                    {/* 3 sub-rows: DEAL / COUPON / STRIKE PRICE */}
                    {['DEAL','COUPON','STRIKE PRICE'].map((rowType, ri) => (
                      <div key={rowType}
                           style={{ display:'grid',
                                    gridTemplateColumns:`200px 80px 80px repeat(${daysInMonth}, minmax(34px,1fr))`,
                                    gap:1, marginBottom: ri===2 ? 2 : 0 }}>
                        {/* Left info — only on DEAL row, merged visually */}
                        {ri === 0 ? (
                          <>
                            <div style={{ ...infoCell, background:'#1E293B', borderLeft:`3px solid #334155` }}>
                              <div style={{ fontWeight:600, fontSize:11, color:'#E2E8F0', marginBottom:2 }}>
                                {asin.name}
                              </div>
                              <div style={{ fontSize:10, color:'#475569', fontFamily:'monospace' }}>
                                {asin.asin}
                              </div>
                            </div>
                            <div style={{ ...infoCell, background:'#1E293B' }}>
                              <span style={{ fontSize:11, fontWeight:600, color:'#94A3B8' }}>
                                {asin.price ? `$${asin.price}` : '—'}
                              </span>
                            </div>
                            <div style={{ ...infoCell, background:'#1E293B' }}>
                              <span style={{ fontSize:10, color:'#64748B' }}>{asin.line}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ ...infoCell, background: ri===1 ? '#192035':'#141D2E',
                                          borderLeft:`3px solid transparent` }}/>
                            <div style={{ ...infoCell, background: ri===1 ? '#192035':'#141D2E' }}/>
                            <div style={{ ...infoCell, background: ri===1 ? '#192035':'#141D2E' }}/>
                          </>
                        )}

                        {/* Row label */}
                        {/* Day cells */}
                        {Array.from({length:daysInMonth},(_,i)=>{
                          const d   = i+1;
                          const ds  = dStr(year,month,d);
                          const dow = new Date(year,month,d).getDay();
                          const isWknd  = dow===0||dow===6;
                          const isToday = ds === todayStr;
                          const dayPromos = promosFor(asin.asin, ds).filter(p => {
                            if(rowType==='DEAL')         return p.type==='DEAL';
                            if(rowType==='COUPON')       return p.type==='COUPON';
                            if(rowType==='STRIKE PRICE') return p.type==='STRIKE';
                            return false;
                          });
                          const sp = asin.strikePrice && asin.strikeEnd >= ds && asin.strikeEnd ? asin.strikePrice : null;
                          const hasStrike = rowType==='STRIKE PRICE' && (dayPromos.length>0 || sp);

                          const baseBg = isToday ? '#1E3A1E' : isWknd
                            ? (ri===0?'#1A2336':ri===1?'#161E2E':'#121A28')
                            : (ri===0?'#1E2A3A':ri===1?'#192035':'#141D2E');

                          let cellBg = baseBg;
                          let cellText = '';
                          let textColor = '#fff';
                          let isWindow = false;

                          if(dayPromos.length > 0) {
                            const p = dayPromos[0];
                            if(rowType==='DEAL') {
                              isWindow = !p.confirmed;
                              cellBg   = isWindow ? '#FDEFC3' : '#E8920A';
                              textColor= isWindow ? '#92400E' : '#fff';
                              cellText = p.discount;
                            } else if(rowType==='COUPON') {
                              cellBg   = '#16A34A';
                              textColor= '#fff';
                              cellText = p.discount;
                            } else if(rowType==='STRIKE PRICE') {
                              cellBg   = '#334155';
                              textColor= '#CBD5E1';
                              cellText = p.discount;
                            }
                          } else if(hasStrike) {
                            cellBg   = '#334155';
                            textColor= '#CBD5E1';
                            cellText = `$${sp}`;
                          }

                          // Sales dot
                          const saleKey = `${asin.asin}_${ds}`;
                          const hasSales = sales[saleKey];

                          return (
                            <div key={d}
                                 onClick={() => {
                                   if(rowType==='DEAL'||rowType==='COUPON'||rowType==='STRIKE PRICE')
                                     setPromoModal({ mode:'add', asin:asin.asin, date:ds, rowType });
                                 }}
                                 onContextMenu={e => { e.preventDefault(); setSalesModal({ asin:asin.asin, date:ds, asinData:asin }); }}
                                 style={{ background:cellBg, minHeight:ri===0?26:22,
                                          display:'flex', alignItems:'center', justifyContent:'center',
                                          fontSize:10, fontWeight:700, color:textColor,
                                          cursor:'pointer', position:'relative',
                                          borderBottom: ri===2 ? '2px solid #0F172A' : '1px solid #0F172A',
                                          transition:'filter 0.1s' }}
                                 title={`${asin.name} · ${ds} · ${rowType}${dayPromos.length ? ' · '+dayPromos.map(p=>p.subtype).join(', ') : ''}\nLeft click: add/view promo\nRight click: log sales`}>
                              {cellText}
                              {hasSales && rowType==='DEAL' && (
                                <div style={{ position:'absolute', top:2, right:2, width:5, height:5,
                                              borderRadius:'50%', background:'#22D3EE' }} title={`${hasSales.units} units / $${hasSales.revenue}`}/>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display:'flex', gap:16, marginTop:20, flexWrap:'wrap', fontSize:12, color:'#94A3B8' }}>
            {[
              { color:'#E8920A', label:'Lightning Deal (confirmed)' },
              { color:'#FDEFC3', label:'Deal window TBD', text:'#92400E' },
              { color:'#16A34A', label:'Coupon active' },
              { color:'#334155', label:'Strike Price' },
              { color:'#22D3EE', label:'Sales logged', circle:true },
            ].map(l => (
              <div key={l.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width: l.circle?8:14, height:l.circle?8:14,
                              borderRadius: l.circle?'50%':4,
                              background:l.color, flexShrink:0 }}/>
                <span style={{ color: l.text||'#94A3B8' }}>{l.label}</span>
              </div>
            ))}
            <span style={{ color:'#475569', marginLeft:'auto' }}>
              Left click → add promo · Right click → log sales
            </span>
          </div>
        </>
      )}

      {promoModal && (
        <PromoModal modal={promoModal} asins={asins} onSave={addPromo}
                    onDelete={deletePromo} onClose={() => setPromoModal(null)}
                    existingPromos={promos} />
      )}
      {salesModal && (
        <SalesModal modal={salesModal} onSave={saveSales}
                    existingSales={sales[`${salesModal.asin}_${salesModal.date}`]}
                    onClose={() => setSalesModal(null)} />
      )}
    </div>
  );
}

const navBtn = { background:'#1E293B', border:'1px solid #334155', color:'#94A3B8',
                  borderRadius:6, padding:'4px 12px', cursor:'pointer', fontSize:16 };
const hdrCell = { background:'#1E293B', color:'#94A3B8', fontSize:11, fontWeight:600,
                   padding:'6px 4px', textAlign:'center', borderRadius:4 };
const infoCell = { padding:'4px 8px', display:'flex', flexDirection:'column',
                    justifyContent:'center', minHeight:26 };
