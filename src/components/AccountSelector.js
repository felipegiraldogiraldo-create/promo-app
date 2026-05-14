import React from 'react';

export default function AccountSelector({ accounts, onSelect }) {
  return (
    <div>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:28, fontWeight:700, color:'#F1F5F9', marginBottom:8 }}>
          Agency Dashboard
        </h1>
        <p style={{ color:'#94A3B8', fontSize:15 }}>
          Select an account to manage promotions and track sales
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:16 }}>
        {accounts.map(acc => (
          <div key={acc.id} onClick={() => onSelect(acc)}
               style={{ background:'#1E293B', border:`1px solid #334155`, borderRadius:12,
                        padding:24, cursor:'pointer', transition:'all 0.15s',
                        borderLeft:`4px solid ${acc.color}` }}
               onMouseEnter={e => e.currentTarget.style.background='#263548'}
               onMouseLeave={e => e.currentTarget.style.background='#1E293B'}>
            <div style={{ fontSize:32, marginBottom:12 }}>{acc.icon}</div>
            <div style={{ fontWeight:600, fontSize:17, color:'#F1F5F9', marginBottom:6 }}>
              {acc.name}
            </div>
            <div style={{ color:'#64748B', fontSize:13 }}>
              {acc.brands.length} brand{acc.brands.length > 1 ? 's' : ''} ·{' '}
              {acc.brands.map(b => b.marketplace).filter((v,i,a) => a.indexOf(v)===i).join(', ')}
            </div>
            <div style={{ marginTop:16, display:'flex', flexWrap:'wrap', gap:6 }}>
              {acc.brands.map(b => (
                <span key={b.id} style={{ background:'#0F172A', border:'1px solid #334155',
                                          borderRadius:6, padding:'2px 8px', fontSize:11,
                                          color:'#94A3B8' }}>
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
