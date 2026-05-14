import React from 'react';

export default function BrandSelector({ account, onSelect, onBack }) {
  return (
    <div>
      <button onClick={onBack} style={{ background:'none', border:'none', color:'#94A3B8',
                                         cursor:'pointer', fontSize:14, marginBottom:24,
                                         display:'flex', alignItems:'center', gap:6, padding:0 }}>
        ← Back
      </button>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:24, fontWeight:700, color:'#F1F5F9', marginBottom:6 }}>
          {account.icon} {account.name}
        </h1>
        <p style={{ color:'#94A3B8', fontSize:14 }}>Select a brand or marketplace</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:14 }}>
        {account.brands.map(brand => (
          <div key={brand.id} onClick={() => onSelect(brand)}
               style={{ background:'#1E293B', border:'1px solid #334155', borderRadius:10,
                        padding:20, cursor:'pointer', transition:'all 0.15s' }}
               onMouseEnter={e => e.currentTarget.style.background='#263548'}
               onMouseLeave={e => e.currentTarget.style.background='#1E293B'}>
            <div style={{ fontWeight:600, fontSize:16, color:'#F1F5F9', marginBottom:6 }}>
              {brand.name}
            </div>
            <div style={{ color:'#64748B', fontSize:12 }}>{brand.marketplace}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
