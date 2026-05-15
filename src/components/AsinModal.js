import React, { useState, useEffect } from 'react';

export default function AsinModal({ existingLines, onSave, onClose, editData, onDelete }) {
const [asin, setAsin] = useState('');
const [name, setName] = useState('');
const [line, setLine] = useState(existingLines[0] || '');
const [newLine, setNewLine] = useState('');
const [price, setPrice] = useState('');
const [error, setError] = useState('');

const finalLine = line === '__new__' ? newLine.trim() : line;

useEffect(() => {
  if (editData) {
    setAsin(editData.asin || '');
    setName(editData.name || '');
    setLine(editData.line || existingLines[0] || '');
    setPrice(editData.price ? String(editData.price) : '');
  }
}, [editData]);

const handleSave = () => {
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
          cursor:'pointer', fontSize:20, lineHeight:1 }}>x</button>
      </div>

      {error && (
        <div style={{ background:'#450a0a', border:'1px solid #991b1b', borderRadius:8,
          padding:'8px 12px', marginBottom:16, fontSize:12 }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom:16 }}>
        <label style={lbl}>ASIN Code *</label>
        <input value={asin} onChange={e => setAsin(e.target.value)} placeholder="e.g. B0CXXX1234"
          disabled={!!editData}
          style={{...inp, opacity: editData ? 0.6 : 1}}/>
      </div>

      <div style={{ marginBottom:16 }}>
        <label style={lbl}>Product Name *</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. DMSO Cream 1x"
          style={inp}/>
      </div>

      <div style={{ marginBottom:16 }}>
        <label style={lbl}>Product Line *</label>
        <select value={line} onChange={e => setLine(e.target.value)} style={inp}>
          {existingLines.map(l => <option key={l} value={l}>{l}</option>)}
          <option value="__new__">+ New line...</option>
        </select>
        {line === '__new__' && (
          <input value={newLine} onChange={e => setNewLine(e.target.value)}
            placeholder="Enter new line name" style={{...inp, marginTop:8}}/>
        )}
      </div>

      <div style={{ marginBottom:16 }}>
        <label style={lbl}>Price (optional)</label>
        <input type='number' step='0.01' min='0' value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="e.g. 24.97"
          style={inp}/>
      </div>

      <div style={{ display:'flex', gap:10, marginTop:4 }}>
        {editData && onDelete && (
          <button onClick={() => onDelete(editData.asin)}
            style={{ background:'#EF4444', border:'none', color:'#fff', borderRadius:8,
              padding:'10px 16px', cursor:'pointer', fontSize:13, fontWeight:600, marginRight:'auto' }}>
            Delete ASIN
          </button>
        )}
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
);
}

const lbl = { display:'block', color:'#94A3B8', fontSize:12, fontWeight:500, marginBottom:6 };
const inp = {
  display:'block', width:'100%', background:'#0F172A', border:'1px solid #334155', color:'#F1F5F9',
  borderRadius:8, padding:'8px 12px', fontSize:13, outline:'none', boxSizing:'border-box'
};
