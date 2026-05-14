import React, { useState, useEffect } from 'react';
import AccountSelector from './components/AccountSelector';
import BrandSelector from './components/BrandSelector';
import CalendarView from './components/CalendarView';
import { ACCOUNTS } from './data/seedData';

export default function App() {
  const [account, setAccount] = useState(null);
  const [brand, setBrand] = useState(null);
  const [view, setView] = useState('accounts'); // accounts | brands | calendar

  const selectAccount = (acc) => {
    setAccount(acc);
    if (acc.brands.length === 1) {
      setBrand(acc.brands[0]);
      setView('calendar');
    } else {
      setView('brands');
    }
  };

  const selectBrand = (br) => {
    setBrand(br);
    setView('calendar');
  };

  const goHome = () => { setAccount(null); setBrand(null); setView('accounts'); };
  const goBack = () => { setBrand(null); setView('brands'); };

  return (
    <div style={{ minHeight:'100vh', background:'#0F172A', color:'#F1F5F9' }}>
      {/* Top bar */}
      <div style={{ background:'#1E293B', borderBottom:'1px solid #334155', padding:'12px 24px',
                    display:'flex', alignItems:'center', gap:16 }}>
        <div onClick={goHome} style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ background:'#3B82F6', borderRadius:8, padding:'6px 10px',
                        fontWeight:700, fontSize:14, letterSpacing:1 }}>P</div>
          <span style={{ fontWeight:600, fontSize:15, color:'#F1F5F9' }}>Promo Calendar</span>
        </div>
        {account && (
          <>
            <span style={{ color:'#475569' }}>›</span>
            <span onClick={account.brands.length > 1 ? () => setView('brands') : undefined}
                  style={{ color: account.brands.length > 1 ? '#94A3B8' : '#94A3B8',
                           cursor: account.brands.length > 1 ? 'pointer' : 'default',
                           fontSize:14 }}>
              {account.icon} {account.name}
            </span>
          </>
        )}
        {brand && view === 'calendar' && (
          <>
            <span style={{ color:'#475569' }}>›</span>
            <span style={{ color:'#CBD5E1', fontSize:14 }}>{brand.name}</span>
          </>
        )}
        <div style={{ marginLeft:'auto', fontSize:12, color:'#475569' }}>
          Agency Dashboard
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding:'32px 24px', maxWidth:1400, margin:'0 auto' }}>
        {view === 'accounts' && (
          <AccountSelector accounts={ACCOUNTS} onSelect={selectAccount} />
        )}
        {view === 'brands' && account && (
          <BrandSelector account={account} onSelect={selectBrand} onBack={goHome} />
        )}
        {view === 'calendar' && account && brand && (
          <CalendarView account={account} brand={brand} onBack={account.brands.length > 1 ? goBack : goHome} />
        )}
      </div>
    </div>
  );
}
