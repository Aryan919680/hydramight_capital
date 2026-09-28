import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Icon = ({ name, size = 20 }) => {
  const icons = {
    search: <><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></>,
    diamond: <><path d="m12 3 8 9-8 9-8-9 8-9Z"/><path d="m12 7 4 5-4 5-4-5 4-5Z"/></>,
    sip: <><path d="M6 18 18 6"/><path d="M10 6h8v8"/></>,
    demat: <><rect x="5" y="5" width="14" height="14" rx="1"/><path d="M8 8h8v8H8z"/></>,
    shares: <><path d="M5 19V9"/><path d="M10 19V5"/><path d="M15 19v-7"/><path d="M20 19V3"/></>,
    bonds: <><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 10h8M8 14h5"/></>,
    algo: <><path d="M5 16 9 12l3 3 7-8"/><path d="M14 7h5v5"/></>,
    portfolio: <><path d="M4 19V8h16v11H4Z"/><path d="M8 8V5h8v3"/><path d="M4 13h16"/></>,
    fund: <><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8"/></>,
    heart: <path d="M20.8 5.4a5.5 5.5 0 0 0-7.8 0L12 6.5l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.8a5.5 5.5 0 0 0 0-7.8Z"/>,
    rupee: <><path d="M7 5h10M7 9h10M7 5c5 0 6 7 0 7l8 7"/></>,
    home: <><path d="m4 11 8-7 8 7"/><path d="M6 10v10h12V10"/></>,
    card: <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></>,
    transfer: <><path d="M5 8h14l-3-3"/><path d="m19 16H5l3 3"/></>,
    salary: <><rect x="4" y="6" width="16" height="13" rx="2"/><path d="M8 10h8M8 14h5"/></>,
    project: <><path d="M5 20V8h14v12"/><path d="M8 8V4h8v4M9 12h2M13 12h2M9 16h2M13 16h2"/></>,
    docs: <><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v5h5M10 12h6M10 16h6"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1.2.9-1.2 1.8M12 17h.01"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></>,
    spark: <><path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Z"/></>,
    arrow: <><path d="M5 12h14"/><path d="m15 8 4 4-4 4"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
};

const investments = [
  ['Mutual Funds', 'Explore funds by category, horizon and risk profile.', 'diamond'],
  ['SIP / SWP / SIF', 'Plan recurring or systematic investments around a goal.', 'sip'],
  ['Demat Account', 'Compare account features and onboarding requirements.', 'demat'],
  ['Unlisted Shares', 'Explore opportunities in privately held companies.', 'shares'],
  ['Bonds', 'Browse fixed-income opportunities and key terms.', 'bonds'],
  ['Trading Algo & Tech Softwares', 'Discover technology and tools for modern trading.', 'algo'],
  ['Portfolio Management Services', 'Explore professionally managed portfolio solutions.', 'portfolio'],
  ['Alternative Investment Fund', 'Explore alternative investment opportunities and strategies.', 'fund'],
  ['All Types of Insurance', 'Explore protection products for different needs.', 'heart'],
];

const loans = [
  ['Business Loans', 'Financing options for working capital and business needs.', 'rupee'],
  ['MSME Loans', 'Explore financing based on business profile and requirement.', 'project'],
  ['Home Loan', 'Estimate EMI and compare indicative product features.', 'home'],
  ['Balance Transfer', 'Explore options to transfer an existing loan balance.', 'transfer'],
  ['Personal Loan', 'Compare personal finance options for individual needs.', 'rupee'],
  ['Credit Cards', 'Explore cards, features, benefits and eligibility.', 'card'],
  ['OD Against Salary', 'Explore overdraft facilities linked to salary eligibility.', 'salary'],
  ['Project Financing', 'Financing solutions for eligible business projects.', 'project'],
];

const support = [
  ['Document Centre', 'Keep application documents and disclosures organised.', 'docs', 'Open'],
  ['Help Desk', 'Track questions and application support requests.', 'help', 'Get help'],
  ['Application Status', 'See your active applications and their current stage.', 'check', 'Track'],
];

function ProductCard({ item }) {
  const [title, description, icon] = item;
  return <article className="product-card">
    <span className="product-icon"><Icon name={icon} /></span>
    <h3>{title}</h3>
    <p>{description}</p>
    <button className="card-link">{title === 'Home Loan' ? 'Check eligibility' : 'Explore'} <Icon name="arrow" size={14}/></button>
  </article>;
}

function App() {
  const [mainTab, setMainTab] = useState('fin');
  const [finTab, setFinTab] = useState('investment');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  const products = finTab === 'investment' ? investments : loans;
  const filtered = useMemo(() => products.filter(([name, desc]) => `${name} ${desc}`.toLowerCase().includes(search.toLowerCase())), [products, search]);

  const goFin = (tab) => {
    setMainTab('fin');
    setFinTab(tab);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <div className="app-shell">
    <div className="utility-bar"><div className="page-width"><span>Simple access to financial products</span><div><button>Help</button><span>|</span><button>Contact</button></div></div></div>

    <header className="site-header">
      <div className="page-width header-inner">
        <button className="logo" onClick={() => goFin('investment')} aria-label="Hydramight Capital home"><span>Hydramight</span><b>capital</b></button>
        <nav className={mobileOpen ? 'main-nav open' : 'main-nav'}>
          <div className="fin-nav-wrap">
            <button className={mainTab === 'fin' ? 'nav-item active' : 'nav-item'} onClick={() => { setMainTab('fin'); setMobileOpen(false); }}>Fin Products</button>
            {mainTab === 'fin' && <div className="subnav">
              <button className={finTab === 'investment' ? 'active' : ''} onClick={() => goFin('investment')}>Investment</button>
              <button className={finTab === 'loans' ? 'active' : ''} onClick={() => goFin('loans')}>Loans</button>
            </div>}
          </div>
          <button className={mainTab === 'legal' ? 'nav-item active' : 'nav-item'} onClick={() => { setMainTab('legal'); setMobileOpen(false); }}>Legal</button>
          <button className={mainTab === 'shopping' ? 'nav-item active' : 'nav-item'} onClick={() => { setMainTab('shopping'); setMobileOpen(false); }}>Shopping <span>(Soon)</span></button>
        </nav>
        <div className="header-actions">
          <label className="search"><Icon name="search" size={15}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products" /></label>
          <button className="sign-in">Sign in</button>
          <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)}><Icon name={mobileOpen ? 'close' : 'menu'}/></button>
        </div>
      </div>
    </header>

    {mainTab === 'fin' && <main>
      <section className="hero-section">
        <div className="page-width hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">FINANCIAL PRODUCTS, MADE EASIER</div>
            <h1>Find the right financial product for your need.</h1>
            <p>Explore investments, loans and protection products. Compare key features, check preliminary eligibility and continue with an assisted application.</p>
            <div className="hero-buttons"><button className="primary-btn" onClick={() => document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}>Explore financial products</button><button className="secondary-btn"><Icon name="spark" size={17}/> Ask AI to compare</button></div>
          </div>
          <div className="need-card">
            <h2>What are you looking for?</h2>
            <div className="need-grid">
              <button onClick={() => goFin('investment')}><b>Grow my money</b><span>Mutual funds, SIP, bonds</span></button>
              <button onClick={() => goFin('loans')}><b>Need financing</b><span>Business, home, MSME & more</span></button>
              <button onClick={() => goFin('investment')}><b>Protect my family</b><span>Insurance products</span></button>
              <button><b>Check eligibility</b><span>Answer a few questions</span></button>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="page-width">
          <div className="section-title-row"><div><h2>Financial products</h2><p>Start with a category, then compare only what matters.</p></div><button className="view-all" onClick={() => setSearch('')}>View all</button></div>
          <div className="category-tabs"><button className={finTab === 'investment' ? 'active' : ''} onClick={() => setFinTab('investment')}>Investment</button><button className={finTab === 'loans' ? 'active' : ''} onClick={() => setFinTab('loans')}>Loans</button></div>
          <div className="product-grid">{filtered.map(item => <ProductCard key={item[0]} item={item}/>)}</div>
          {!filtered.length && <div className="empty-state">No products match “{search}”.</div>}
        </div>
      </section>

      <section className="tools-section">
        <div className="page-width">
          <h2>Tools that help you decide</h2><p className="section-subtitle">Use structured information before starting an application.</p>
          <div className="tool-grid">
            <article className="tool-card ai"><span>AI COPILOT</span><h3>Ask AI to understand & compare</h3><p>Ask questions in plain language. The assistant uses the platform’s product information to explain terms and compare selected products.</p><button className="primary-btn">Try the AI assistant</button></article>
            <article className="tool-card"><span>ELIGIBILITY</span><h3>Check preliminary eligibility</h3><p>Answer a few product-specific questions and see which products may match your profile.</p><button className="secondary-btn">Start check</button></article>
          </div>
        </div>
      </section>

      <section className="support-section"><div className="page-width"><h2>Legal & support</h2><p className="section-subtitle">Documents, application help and service information.</p><div className="support-grid">{support.map(([title,desc,icon,action]) => <article className="product-card support-card" key={title}><span className="product-icon"><Icon name={icon}/></span><h3>{title}</h3><p>{desc}</p><button className="card-link">{action} <Icon name="arrow" size={14}/></button></article>)}</div></div></section>
    </main>}

    {mainTab === 'legal' && <main className="simple-page"><div className="page-width"><div className="eyebrow">LEGAL & SUPPORT</div><h1>Legal information</h1><p>Access product disclosures, terms, privacy information and application support documents.</p><div className="support-grid">{support.map(([title,desc,icon,action]) => <article className="product-card support-card" key={title}><span className="product-icon"><Icon name={icon}/></span><h3>{title}</h3><p>{desc}</p><button className="card-link">{action} <Icon name="arrow" size={14}/></button></article>)}</div></div></main>}

    {mainTab === 'shopping' && <main className="simple-page"><div className="page-width coming-soon"><div className="eyebrow">HYDRAMIGHT SHOPPING</div><h1>Shopping is coming soon.</h1><p>We’re preparing a simple shopping experience alongside Hydramight Capital’s financial services.</p></div></main>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
