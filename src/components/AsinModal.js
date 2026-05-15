import React, { useState, useEffect } from 'react';

export default function AsinModal({ existingLines, onSave, onClose, editData, onDelete }) {
const [asin, setAsin] = useState('');
const [name, setName] = useState('');
const [line, setLine] = useState(existingLines[0] || '');
const [newLine, setNewLine] = useState('');
const [price, setPrice] = useState('');
const [error, setError] = useState('');

const finalLine = line === '__new__' ? newLine.trim() : line;

useEffect(() => { if (editData) { setAsin(editData.asin||''); setName(editData.name||''); setLine(editData.line||existingLines[0]||''); setPrice(editData.price ? String(editData.price) : ''); } }, [editData]);
if (!asin.trim()) { setError('ASIN code is required'); return; }
if (!name.trim()) { setError('Product name is required'); return; }
if (!finalLine) { setError('Product line is required'); return; }
onSave({
asin: asin.trim().toUpperCase(),
name: name.trim(),
line: finalLine,
price: price ? Number(price) : null
});
};

return (
<div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex',
alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
<div style={{ background:'#1E293B', borderRadius:12, padding:28, width:'100%', maxWidth:440,
border:'1px solid #334155', maxHeight:'90vh', overflowY:'auto' }}>
<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
<h3 style={{ color:'#F1F5F9', fontSize:16, fontWeight:600, margin:0 }}>{editData ? 'Edit ASIN' : 'Add New ASIN'}</h3>
<button onClick={onClose} style={{ background:'none', border:'none', color:'#94A3B8',
cursor:'pointer', fontSize:20, lineHeight:1 }}>×</button>
</div>

{error && (
<div style={{ background:'#7F1D1D', border:'1px solid #991B1B', color:'#FCA5A5',
borderRadius:8, padding:'8px 12px', marginBottom:16, fontSize:12 }}>
{error}
</div>
)}

<div style={{ display:'grid', gap:14 }}>
<div>
<label style={lbl}>ASIN Code *</label>
<input value={asin} onChange={e => setAsin(e.target.value.toUpperCase())}
placeholder="e.g. B0CMN243FQ"
style={inp}/>
<div style={{ color:'#475569', fontSize:11, marginTop:4 }}>
Amazon Standard Identification Number (10 chars)
</div>
</div>

<div>
<label style={lbl}>Product Name *</label>
<input value={name} onChange={e => setName(e.target.value)}
placeholder="e.g. DMSO Cream 1x"
style={inp}/>
</div>

<div>
<label style={lbl}>Product Line *</label>
<select value={line} onChange={e => setLine(e.target.value)} style={inp}>
{existingLines.map(l => <option key={l} value={l}>{l}</option>)}
<option value="__new__">+ New line...</option>
</select>
</div>

{line === '__new__' && (
<div>
<label style={lbl}>New Line Name *</label>
<input value={newLine} onChange={e => setNewLine(e.target.value)}
placeholder="e.g. Vitamins"
style={inp}/>
</div>
)}

<div>
<label style={lbl}>Price (optional)</label>
<input type='number' step='0.01' min='0' value={price}
onChange={e => setPrice(e.target.value)}
placeholder="e.g. 24.97"
style={inp}/>
</div>

<div style={{ display:'flex', gap:10, marginTop:4 }}>{editData && onDelete && <button onClick={() => onDelete(editData.asin)} style={{ background:'#EF4444', border:'none', color:'#fff', borderRadius:8, padding:'10px 0', cursor:'pointer', fontSize:13, fontWeight:600, marginRight:'auto', paddingLeft:16, paddingRight:16 }}>Delete ASIN</button>}
<button onClick={onClose}
style={{ flex:1, background:'transparent', border:'1px solid #334155',
color:'#94A3B8', borderRadius:8, padding:'10px 0',
cursor:'pointer', fontSize:13, fontWeight:500 }}>
Cancel
</button>
<button onClick={handleSave}
style={{ flex:2, background:'#3B82F6', border:'none', color:'#fff',
borderRadius:8, padding:'10px 0', cursor:'pointer',
fontSize:14, fontWeight:600 }}>
{editData ? 'Update ASIN' : 'Add ASIN'}
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
borderRadius:8, padding:'8px 12px', fontSize:13, outline:'none', boxSizing:'border-box'
};
