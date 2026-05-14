import React, { useState } from 'react';

const SUBTYPES = ['Lightning Deal','Best Deal','Prime Day Deal','Promo %','BOGO','Sale/Clearance','Coupon','Strike Price'];

export default function PromoModal({ modal, asins, onSave, onDelete, onClose, existingPromos }) {
  const [asin,      setAsin]      = useState(modal.asin || '');
  const [subtype,   setSubtype]   = useState(modal.rowType==='COUPON' ? 'Coupon' : modal.rowType==='STRIKE PRICE' ? 'Strike Price' : 'Lightning Deal');
  const [discount,  setDiscount]  = useState('');
  const [dateStart, setDateStart] = useState(modal.date || '');
  const [dateEnd,   setDateEnd]   = useState(modal.date || '');
  const [confirmed, setConfirmed] = useState(true);
  const [note,      setNote]      = useState('');

  // Existing promos for this asin+date
  const existing = modal.asin && modal.date
    ? existingPromos.filter(p => p.asin===modal.asin && p.dateStart<=modal.date && p.dateEnd>=modal.date)
    : [];

  const type = subtype==='Coupon' ? 'COUPON' : subtype==='Strike Price' ? 'STRIKE' : 'DEAL';

  const handleSave = () => {
    if (!asin || !dateStart || !dateEnd || !discount) return;
    onSave({ asin, type, subtype, discount, dateStart, dateEnd, confirmed, note });
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex',
                   alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
      <div style={{ background:'#1E293B', borderRadius:12, padding:28, width:'100%', maxWidth:480,
                     border:'1px solid #334155', maxHeight:'90vh', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h3 style={{ color:'#F1F5F9', fontSize:16, fontWeight:600 }}>Add Promotion</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#94A3B8',
                                              cursor:'pointer', fontSize:20 }}>×</button>
        </div>

        {/* Existing promos for this day */}
        {existing.length > 0 && (
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:12, color:'#94A3B8', marginBottom:8, fontWeight:600 }}>
              Active promos on {modal.date}:
            </div>
            {existing.map(p => (
              <div key={p.id} style={{ background:'#0F172A', border:'1px solid #334155',
                                        borderRadius:8, padding:'8px 12px', marginBottom:6,
                                        display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div>
                  <span style={{ fontSize:12, color:'#CBD5E1', fontWeight:500 }}>{p.subtype}</span>
                  <span style={{ fontSize:12, color:'#64748B', marginLeft:8 }}>{p.discount}</span>
                  <span style={{ fontSize:11, color:'#475569', marginLeft:8 }}>
                    {p.dateStart} → {p.dateEnd}
                  </span>
                </div>
                <button onClick={() => onDelete(p.id)}
                        style={{ background:'#7F1D1D', border:'none', color:'#FCA5A5',
                                  borderRadius:6, padding:'3px 8px', cursor:'pointer', fontSize:11 }}>
                  Delete
                </button>
              </div>
            ))}
            <div style={{ borderTop:'1px solid #334155', marginTop:12, paddingTop:12 }}/>
          </div>
        )}

        <div style={{ display:'grid', gap:14 }}>
          <div>
            <label style={lbl}>ASIN / Product</label>
            <select value={asin} onChange={e=>setAsin(e.target.value)} style={input}>
              <option value=''>Select ASIN...</option>
              {asins.map(a => (
                <option key={a.asin} value={a.asin}>{a.name} — {a.asin}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={lbl}>Promotion Type</label>
            <select value={subtype} onChange={e=>setSubtype(e.target.value)} style={input}>
              {SUBTYPES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Discount / Value</label>
            <input value={discount} onChange={e=>setDiscount(e.target.value)}
                   placeholder="e.g. 15%  or  $2 off  or  $21.97"
                   style={input}/>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            <div>
              <label style={lbl}>Start Date</label>
              <input type='date' value={dateStart} onChange={e=>setDateStart(e.target.value)} style={input}/>
            </div>
            <div>
              <label style={lbl}>End Date</label>
              <input type='date' value={dateEnd} onChange={e=>setDateEnd(e.target.value)} style={input}/>
            </div>
          </div>
          {type === 'DEAL' && (
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <input type='checkbox' id='conf' checked={confirmed} onChange={e=>setConfirmed(e.target.checked)}
                     style={{ width:16, height:16, cursor:'pointer' }}/>
              <label htmlFor='conf' style={{ color:'#CBD5E1', fontSize:13, cursor:'pointer' }}>
                Date confirmed (uncheck if window TBD)
              </label>
            </div>
          )}
          <div>
            <label style={lbl}>Notes (optional)</label>
            <input value={note} onChange={e=>setNote(e.target.value)}
                   placeholder="e.g. 8:15 AM – 8:15 PM PDT" style={input}/>
          </div>
          <button onClick={handleSave}
                  style={{ background:'#3B82F6', border:'none', color:'#fff', borderRadius:8,
                            padding:'10px 0', cursor:'pointer', fontSize:14, fontWeight:600, marginTop:4 }}>
            Save Promotion
          </button>
        </div>
      </div>
    </div>
  );
}

const lbl   = { display:'block', color:'#94A3B8', fontSize:12, fontWeight:500, marginBottom:6 };
const input = { width:'100%', background:'#0F172A', border:'1px solid #334155', color:'#F1F5F9',
                borderRadius:8, padding:'8px 12px', fontSize:13, outline:'none' };
