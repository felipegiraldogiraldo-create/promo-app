import React, { useState } from 'react';

export default function SalesModal({ modal, onSave, onDelete, existingSales, onClose }) {
const [units, setUnits] = useState(existingSales?.units ?? '');
const [revenue, setRevenue] = useState(existingSales?.revenue ?? '');
const isEdit = existingSales && (existingSales.units > 0 || existingSales.revenue > 0);

const avgPrice = units && revenue && Number(units) > 0
? (Number(revenue) / Number(units)).toFixed(2)
: null;

return (
<div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex',
alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
<div style={{ background:'#1E293B', borderRadius:12, padding:28, width:'100%', maxWidth:400,
border:'1px solid #334155' }}>
{/* Header */}
<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
<h3 style={{ color:'#F1F5F9', fontSize:16, fontWeight:600, margin:0 }}>
{isEdit ? 'Edit Sales' : 'Log Sales'}
</h3>
<button onClick={onClose} style={{ background:'none', border:'none', color:'#94A3B8',
cursor:'pointer', fontSize:20, lineHeight:1 }}>×</button>
</div>

{/* Context card */}
<div style={{ background:'#0F172A', borderRadius:8, padding:'10px 14px', marginBottom:20,
border:'1px solid #1E293B' }}>
<div style={{ color:'#CBD5E1', fontSize:13, fontWeight:600 }}>{modal.asinData?.name}</div>
<div style={{ color:'#475569', fontSize:11, fontFamily:'monospace', marginTop:2 }}>{modal.asin}</div>
<div style={{ display:'flex', alignItems:'center', gap:8, marginTop:6 }}>
<span style={{ color:'#64748B', fontSize:12 }}>{modal.date}</span>
{isEdit && (
<span style={{ background:'rgba(34,211,238,0.15)', border:'1px solid rgba(34,211,238,0.3)',
color:'#22D3EE', fontSize:11, borderRadius:4, padding:'1px 6px' }}>
Already logged
</span>
)}
</div>
</div>

<div style={{ display:'grid', gap:14 }}>
<div>
<label style={lbl}>Units Sold</label>
<input
type='number' min='0' value={units}
onChange={e => setUnits(e.target.value)}
placeholder='0'
style={inp}
autoFocus/>
</div>

<div>
<label style={lbl}>Revenue ($)</label>
<input
type='number' min='0' step='0.01' value={revenue}
onChange={e => setRevenue(e.target.value)}
placeholder='0.00'
style={inp}/>
</div>

{avgPrice && (
<div style={{ background:'#0F172A', borderRadius:8, padding:'8px 12px',
fontSize:12, color:'#94A3B8', border:'1px solid #1E293B' }}>
Avg price / unit: <strong style={{ color:'#22D3EE' }}>${avgPrice}</strong>
</div>
)}

{/* Actions */}
<div style={{ display:'flex', gap:8, marginTop:4 }}>
{isEdit && onDelete && (
<button
onClick={() => onDelete(modal.asin, modal.date)}
style={{ background:'transparent', border:'1px solid #7F1D1D',
color:'#FCA5A5', borderRadius:8, padding:'10px 12px',
cursor:'pointer', fontSize:12, fontWeight:500 }}>
Clear
</button>
)}
<button
onClick={() => onSave(modal.asin, modal.date, units, revenue)}
style={{ flex:1, background:'#22D3EE', border:'none', color:'#0F172A',
borderRadius:8, padding:'10px 0', cursor:'pointer',
fontSize:14, fontWeight:700 }}>
{isEdit ? 'Update' : 'Save'}
</button>
</div>
</div>
</div>
</div>
);
}

const lbl = { display:'block', color:'#94A3B8', fontSize:12, fontWeight:500, marginBottom:6 };
const inp = {
width:'100%', background:'#0F172A', border:'1px solid #334155', color:'#F1F5F9',
borderRadius:8, padding:'8px 12px', fontSize:14, outline:'none', boxSizing:'border-box'
};
