import React, {useMemo, useState} from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Icon = ({name, size=22}) => {
  const icons = {
    chart: <><path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-8"/><path d="M22 19H2"/></>,
    shield: <><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></>,
    child: <><circle cx="12" cy="8" r="3"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/></>,
    home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></>,
    coin: <><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/></>,
    heart: <path d="M20.8 4.6a5.4 5.4 0 00-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 10-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 000-7.6z"/>,
    arrow: <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
    menu: <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
    close: <><path d="M6 6l12 12"/><path d="M18 6L6 18"/></>,
    phone: <><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7a2 2 0 011.7 2z"/></>,
    mail: <><path d="M3 5h18v14H3z"/><path d="M3 7l9 6 9-6"/></>,
    check: <path d="M20 6L9 17l-5-5"/>,
    star: <path d="M12 2l3 6 7 .9-5 4.8 1.3 6.8L12 17l-6.3 3.5L7 13.7 2 9l7-.9z"/>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>
}

const services = [
  ['Mutual Funds','Build a diversified portfolio aligned with your goals.','chart'],
  ['Tax Saving','Plan investments with tax-efficient options.','shield'],
  ['Child Future','Create a disciplined fund for education and milestones.','child'],
  ['Retirement','Plan a dependable retirement corpus with regular investing.','coin'],
  ['Fixed Deposits','Choose stable fixed-income options for predictable returns.','shield'],
  ['Insurance','Protect your family, health and financial commitments.','heart'],
  ['Bonds','Explore fixed-income opportunities across risk profiles.','coin'],
  ['Home Loans','Get guidance on home finance options and eligibility.','home']
]

const blogs = [
  ['Financial Planning','7 habits that can strengthen your long-term wealth plan','A practical framework for building consistent investing behaviour.'],
  ['Mutual Funds','How to choose a SIP amount that fits your cash flow','Use goals, timelines and affordability to find a sustainable starting point.'],
  ['Retirement','Why starting five years earlier can make a big difference','Compounding rewards time more than perfect timing.']
]

function App(){
  const [open,setOpen]=useState(false);
  const [monthly,setMonthly]=useState(15000);
  const [years,setYears]=useState(10);
  const [rate,setRate]=useState(12);
  const [form,setForm]=useState({name:'',phone:'',email:''});
  const result=useMemo(()=>{
    const r=rate/1200, n=years*12;
    const value=r===0? monthly*n : monthly*((Math.pow(1+r,n)-1)/r)*(1+r);
    return Math.round(value);
  },[monthly,years,rate]);
  const invested=monthly*years*12;
  const fmt=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
  const submit=e=>{e.preventDefault(); alert(`Thanks ${form.name || ''}! We'll contact you soon.`)};

  return <div>
    <div className="topbar"><div className="container topbar-inner"><div><span><Icon name="phone" size={15}/> +91 98765 43210</span><span><Icon name="mail" size={15}/> hello@wealthwise.in</span></div><div className="toplinks"><a href="#contact">Client Login</a><a href="#contact">Partner Login</a></div></div></div>
    <header><div className="container nav"><a className="brand" href="#"><span className="brandmark">W</span><span>Wealth<span>Wise</span></span></a><nav className={open?'open':''}><a href="#services" onClick={()=>setOpen(false)}>Services</a><a href="#about" onClick={()=>setOpen(false)}>About</a><a href="#calculator" onClick={()=>setOpen(false)}>Calculators</a><a href="#insights" onClick={()=>setOpen(false)}>Insights</a><a href="#contact" onClick={()=>setOpen(false)}>Contact</a><a className="navbtn" href="#contact" onClick={()=>setOpen(false)}>Start Investing</a></nav><button className="menu" onClick={()=>setOpen(!open)}><Icon name={open?'close':'menu'}/></button></div></header>

    <main>
      <section className="hero"><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow">SMARTER FINANCIAL PLANNING</div><h1>Build wealth with <em>clarity</em>, not complexity.</h1><p>Goal-based investing, protection and financial guidance designed around your life — all in one trusted place.</p><div className="hero-actions"><a className="btn primary" href="#contact">Start Investing <Icon name="arrow" size={18}/></a><a className="btn ghost" href="#calculator">Try SIP Calculator</a></div><div className="trust-row"><div><b>15+</b><span>Years experience</span></div><div><b>2,500+</b><span>Happy investors</span></div><div><b>₹75Cr+</b><span>Assets guided</span></div></div></div>
      <div className="hero-visual"><div className="blob"></div><div className="dashboard-card"><div className="dash-head"><span>Portfolio snapshot</span><span className="pill">+12.8%</span></div><div className="portfolio">₹24,86,450</div><div className="muted">Current portfolio value</div><div className="bars">{[45,70,55,85,74,95,80].map((h,i)=><i key={i} style={{height:h+'%'}}></i>)}</div><div className="dash-foot"><span>Jan</span><span>Jul</span></div></div><div className="mini-card c1"><span className="mini-icon"><Icon name="shield"/></span><div><b>Goal protected</b><small>On track</small></div></div><div className="mini-card c2"><span className="mini-icon"><Icon name="chart"/></span><div><b>Monthly SIP</b><small>₹15,000</small></div></div></div></div></section>

      <section id="services" className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">WHAT WE OFFER</span><h2>One place for your financial needs</h2></div><p>From your first SIP to retirement planning, access solutions for every important milestone.</p></div><div className="service-grid">{services.map(([t,d,i])=><article className="service-card" key={t}><span className="service-icon"><Icon name={i}/></span><h3>{t}</h3><p>{d}</p><a href="#contact">Explore <Icon name="arrow" size={16}/></a></article>)}</div></div></section>

      <section id="about" className="about section"><div className="container about-grid"><div className="about-visual"><div className="rings"></div><div className="about-card"><div className="check"><Icon name="check"/></div><b>Financial confidence starts with a clear plan.</b><p>Structured. Transparent. Goal focused.</p></div><div className="floating-stat"><strong>94%</strong><span>clients stay invested<br/>for 3+ years</span></div></div><div className="about-copy"><span className="eyebrow">ABOUT WEALTHWISE</span><h2>A thoughtful partner for every stage of your financial journey.</h2><p>Markets change. Your goals remain personal. We help you understand your options, choose suitable solutions, and stay disciplined through market cycles.</p><div className="features"><div><span><Icon name="check" size={16}/></span><p><b>Goal-first approach</b><small>Every recommendation starts with your priorities.</small></p></div><div><span><Icon name="check" size={16}/></span><p><b>Transparent conversations</b><small>Understand risk, costs and trade-offs before you invest.</small></p></div><div><span><Icon name="check" size={16}/></span><p><b>Ongoing review</b><small>Track progress and adjust when life or markets change.</small></p></div></div><a className="text-link" href="#contact">Know more about us <Icon name="arrow" size={17}/></a></div></div></section>

      <section id="calculator" className="calculator section"><div className="container calc-grid"><div><span className="eyebrow light">POWER OF SIP</span><h2>See what consistency can create.</h2><p>Adjust your monthly investment, timeline and expected return to estimate the future value of a SIP.</p><div className="calc-note">Illustration only. Actual market returns are not guaranteed.</div></div><div className="calc-card"><label><span>Monthly investment <b>{fmt(monthly)}</b></span><input type="range" min="1000" max="100000" step="1000" value={monthly} onChange={e=>setMonthly(+e.target.value)}/></label><div className="row2"><label><span>Time period <b>{years} years</b></span><input type="range" min="1" max="30" value={years} onChange={e=>setYears(+e.target.value)}/></label><label><span>Expected return <b>{rate}% p.a.</b></span><input type="range" min="1" max="20" value={rate} onChange={e=>setRate(+e.target.value)}/></label></div><div className="calc-result"><div><span>Invested amount</span><b>{fmt(invested)}</b></div><div><span>Estimated gains</span><b>{fmt(result-invested)}</b></div><div className="total"><span>Estimated future value</span><strong>{fmt(result)}</strong></div></div></div></div></section>

      <section className="section testimonials"><div className="container"><div className="center-head"><span className="eyebrow">CLIENT STORIES</span><h2>Trusted through the journey</h2><p>What our clients value most is clarity, accessibility and consistent support.</p></div><div className="testimonial-grid">{[
        ['Amit Mehra','Business Owner','The team made investing easy to understand. I finally have a plan instead of disconnected products.'],
        ['Neha Kapoor','IT Professional','Their goal-based approach helped us organize education, emergency and retirement investments clearly.'],
        ['Rohit Jain','Entrepreneur','Responsive service and transparent discussions. I always understand why a particular action is being suggested.']
      ].map(([n,r,q])=><article className="quote" key={n}><div className="stars">★★★★★</div><p>“{q}”</p><div className="person"><span>{n.split(' ').map(x=>x[0]).join('')}</span><div><b>{n}</b><small>{r}</small></div></div></article>)}</div></div></section>

      <section id="insights" className="section insights"><div className="container"><div className="section-head"><div><span className="eyebrow">LATEST INSIGHTS</span><h2>Simple ideas for better financial decisions</h2></div><a className="text-link" href="#">View all insights <Icon name="arrow" size={17}/></a></div><div className="blog-grid">{blogs.map(([cat,title,desc],i)=><article className="blog-card" key={title}><div className={'blog-art art'+(i+1)}><span>{['01','02','03'][i]}</span></div><div className="blog-body"><small>{cat} · 6 min read</small><h3>{title}</h3><p>{desc}</p><a href="#">Read article <Icon name="arrow" size={16}/></a></div></article>)}</div></div></section>

      <section id="contact" className="cta"><div className="container cta-grid"><div><span className="eyebrow light">READY TO BEGIN?</span><h2>Start building your financial future today.</h2><p>Share your details and our team will get in touch for an introductory conversation.</p></div><form onSubmit={submit}><div className="form-row"><input required placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input required placeholder="Mobile number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div><input type="email" required placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><button className="btn primary lightbtn" type="submit">Request a call <Icon name="arrow" size={18}/></button></form></div></section>
    </main>

    <footer><div className="container footer-grid"><div><a className="brand footbrand" href="#"><span className="brandmark">W</span><span>Wealth<span>Wise</span></span></a><p>Goal-based financial planning and distribution support for individuals and families.</p></div><div><h4>Quick Links</h4><a href="#about">About us</a><a href="#services">Services</a><a href="#calculator">Calculators</a><a href="#insights">Insights</a></div><div><h4>Services</h4><a href="#services">Mutual Funds</a><a href="#services">Tax Saving</a><a href="#services">Insurance</a><a href="#services">Retirement Planning</a></div><div><h4>Get in touch</h4><p>+91 98765 43210<br/>hello@wealthwise.in<br/>Mumbai, India</p></div></div><div className="container risk"><b>Risk disclosure:</b> Mutual fund investments are subject to market risks. Read all scheme related documents carefully. Past performance does not guarantee future returns. This website is a design/demo implementation and uses placeholder company information.</div><div className="container copyright"><span>© 2026 WealthWise. All rights reserved.</span><span>Privacy · Disclaimer · Disclosure</span></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
