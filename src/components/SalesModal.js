import React, { useState } from 'react';

export default function SalesModal({ modal, onSave, existingSales, onClose }) {
  const [units,   setUnits]   = useState(existingSales?.units   || '');
  const [revenue, setRevenue] = useState(existingSales?.revenue || '');

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex',
                   alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
      <div style={{ background:'#1E293B', borderRadius:12, padding:28, width:'100%', maxWidth:380,
                     border:'1px solid #334155' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h3 style={{ color:'#F1F5F9', fontSize:16, fontWeight:600 }}>Log Sales</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#94A3B8',
                                              cursor:'pointer', fontSize:20 }}>×</button>
        </div>
        <div style={{ background:'#0F172A', borderRadius:8, padding:'10px 14px', marginBottom:20 }}>
          <div style={{ color:'#CBD5E1', fontSize:13, fontWeight:600 }}>{modal.asinData?.name}</div>
          <div style={{ color:'#475569', fontSize:11, fontFamily:'monospace', marginTop:2 }}>{modal.asin}</div>
          <div style={{ color:'#64748B', fontSize:12, marginTop:4 }}>{modal.date}</div>
        </div>
        <div style={{ display:'grid', gap:14 }}>
          <div>
            <label style={lbl}>Units Sold</label>
            <input type='number' min='0' value={units} onChange={e=>setUnits(e.target.value)}
                   placeholder='0' style={inp}/>
          </div>
          <div>
            <label style={lbl}>Revenue ($)</label>
            <input type='number' min='0' step='0.01' value={revenue}
                   onChange={e=>setRevenue(e.target.value)} placeholder='0.00' style={inp}/>
          </div>
          {units && revenue && (
            <div style={{ background:'#0F172A', borderRadius:8, padding:'8px 12px',
                           fontSize:12, color:'#94A3B8' }}>
              Avg price per unit: <strong style={{ color:'#22D3EE' }}>
                ${(Number(revenue)/Number(units)).toFixed(2)}
              </strong>
            </div>
          )}
          <button onClick={() => onSave(modal.asin, modal.date, units, revenue)}
                  style={{ background:'#22D3EE', border:'none', color:'#0F172A', borderRadius:8,
                            padding:'10px 0', cursor:'pointer', fontSize:14, fontWeight:700, marginTop:4 }}>
            Save Sales
          </button>
        </div>
      </div>
    </div>
  );
}

const lbl = { display:'block', color:'#94A3B8', fontSize:12, fontWeight:500, marginBottom:6 };
const inp = { width:'100%', background:'#0F172A', border:'1px solid #334155', color:'#F1F5F9',
              borderRadius:8, padding:'8px 12px', fontSize:14, outline:'none' };
