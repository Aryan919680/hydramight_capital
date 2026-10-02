import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Icon = ({name, size=24}) => {
  const p={
    chart:<><path d="M4 19V13M10 19V9M16 19V5M3 8l5-4 4 3 8-6"/><path d="M16 1h4v4"/></>,
    wallet:<><path d="M3 6h15a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2V6Z"/><path d="M3 8V5a2 2 0 0 1 2-2h11v5M15 12h7v4h-7a2 2 0 0 1 0-4Z"/></>,
    shield:<><path d="M12 2 20 6v6c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-4Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    home:<><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    brief:<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/></>,
    transfer:<><path d="M4 7h15m0 0-4-4m4 4-4 4M20 17H5m0 0 4 4m-4-4 4-4"/></>,
    card:<><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></>,
    heart:<><path d="M20.8 4.7a5.4 5.4 0 0 0-7.6 0L12 5.9l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21l8.8-8.7a5.4 5.4 0 0 0 0-7.6Z"/></>,
    car:<><path d="m5 11 1.5-5h11l1.5 5M3 12h18v6H3zM6 18v2M18 18v2"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/></>,
    building:<><path d="M4 21V4h10v17M14 9h6v12M7 8h4M7 12h4M7 16h4M17 13h1M17 17h1"/></>,
    file:<><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6"/></>,
    palm:<><path d="M12 22V9M12 9c-2-4-5-5-8-3 4 0 6 2 8 3Zm0 0c2-4 5-5 8-3-4 0-6 2-8 3Zm0 1c-4-1-6 1-7 4 3-2 5-2 7-4Zm0 0c4-1 6 1 7 4-3-2-5-2-7-4Z"/></>,
    grad:<><path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/></>,
    check:<><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></>,
    arrow:<><path d="M5 12h14M14 7l5 5-5 5"/></>,
    info:<><circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/></>,
    bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>
};

const DATA={
  invest:{label:'Investment & Wealth',bannerTitle:'Looking to grow your money?',banner:'Tell us your goal — we’ll show matching Mutual Funds, SIPs & PMS in 20 seconds.',groups:[
    {title:'Retail Investments',icon:'chart',items:['Mutual Funds','SIP / SWP / SIF','Demat Account','Bonds']},
    {title:'HNI & Institutional',icon:'shield',items:['Unlisted Shares','Portfolio Management Services (PMS)','Alternative Investment Funds (AIF)']},
    {title:'Trading & Technology',icon:'chart',items:['Trading Algo & Technology Software']}
  ]},
  loans:{label:'Loans & Credit',bannerTitle:'Need funds fast?',banner:'Select your amount & purpose — get personalized loan options instantly.',groups:[
    {title:'Business Financing',icon:'brief',items:['Business Loans','MSME Loans','Project Financing']},
    {title:'Personal Loans',icon:'home',items:['Home Loans','Personal Loans']},
    {title:'Loan Transfer & Refinancing',icon:'transfer',items:['Balance Transfer']},
    {title:'Credit & Salary Finance',icon:'card',items:['Credit Cards','Overdraft (OD) Against Salary']}
  ]},
  insurance:{label:'Insurance',bannerTitle:'Protect what matters most.',banner:'Choose what you want to insure and see the best plans for you in seconds.',groups:[
    {title:'Life & Health',icon:'heart',items:['Life Insurance','Health Insurance']},
    {title:'General & Motor',icon:'car',items:['Motor Insurance','General Insurance']},
    {title:'Business Insurance',icon:'building',items:['Business Insurance']}
  ]}
};

const investGoals=[
  ['Wealth Creation','Grow your wealth over time','chart'],['Tax Saving','Plan tax-efficient investments','file'],['Retirement Planning','Secure your future','palm'],["Child's Future",'Plan for education & dreams','grad'],['Financial Freedom','Build independence & flexibility','shield'],['Not sure yet','Help me choose','info']
];
const loanAmounts=[['Under ₹5 Lakh','wallet'],['₹5–15 Lakh','chart'],['₹15–50 Lakh','brief'],['Above ₹50 Lakh','shield']];
const loanPurposes=[['Personal','heart'],['Home','home'],['Business','building'],['Balance Transfer','transfer']];
const insuranceTypes=[['Life Insurance','Protect your family','shield'],['Health Insurance','Cover medical expenses','heart'],['Motor Insurance','Protect your vehicle','car'],['General Insurance','Protect what you own','shield'],['Business Insurance','Protect your enterprise','building']];

function Brand(){return <a className="brand" href="#"><span className="brand-mark"><i></i><i></i><i></i></span><span className="brand-copy"><b>Hydramight<span>capital</span></b><small>Simple access to financial products</small></span></a>}
function Choice({icon,title,sub,active,onClick,compact=false}){return <button className={`choice ${active?'active':''} ${compact?'compact':''}`} onClick={onClick}><span className="choice-icon"><Icon name={icon}/></span><span className="choice-text"><b>{title}</b>{sub&&<small>{sub}</small>}</span>{active?<span className="selected"><Icon name="check" size={22}/></span>:<span className="chev">›</span>}</button>}

function InvestPanel(){const [goal,setGoal]=useState('Wealth Creation');return <div className="question-card"><h1>What’s your main investment goal?</h1><p>This helps us show the right options.</p><div className="goal-list">{investGoals.map(([t,s,i])=><Choice key={t} title={t} sub={s} icon={i} active={goal===t} onClick={()=>setGoal(t)}/>)}</div><button className="cta">Get Personalized Options <Icon name="arrow"/></button><div className="security"><Icon name="shield" size={16}/> Personalized recommendations in <b>20 seconds</b></div></div>}
function LoanPanel(){const [amount,setAmount]=useState('Under ₹5 Lakh');const [purpose,setPurpose]=useState('Personal');return <div className="question-card loan-card"><h1>How much loan are you looking for?</h1><p>Select an amount range.</p><div className="amount-grid">{loanAmounts.map(([t,i])=><Choice key={t} title={t} icon={i} active={amount===t} onClick={()=>setAmount(t)} compact/>)}</div><hr/><h2>What is this loan for?</h2><p>Choose the best option that describes your need.</p><div className="purpose-grid">{loanPurposes.map(([t,i])=><Choice key={t} title={t} icon={i} active={purpose===t} onClick={()=>setPurpose(t)} compact/>)}</div><button className="cta">Check Loan Options <Icon name="arrow"/></button><div className="tip"><Icon name="info" size={19}/> Need funds? Select your amount & purpose — get <b>personalized loan options</b> instantly.</div></div>}
function InsurancePanel(){const [type,setType]=useState('Health Insurance');return <div className="question-card"><h1>What do you want to insure?</h1><p>Choose a category to see matching plans.</p><div className="goal-list insurance-list">{insuranceTypes.map(([t,s,i])=><Choice key={t} title={t} sub={s} icon={i} active={type===t} onClick={()=>setType(t)}/>)}</div><button className="cta">Get Insurance Options <Icon name="arrow"/></button><div className="security"><Icon name="shield" size={16}/> Secure, quick and personalized recommendations.</div></div>}

function SideCatalog({tab}){return <aside className="side-catalog">{DATA[tab].groups.map((g,idx)=><div className="side-group" key={g.title}><div className="side-icon"><Icon name={g.icon}/></div><div><h3>{g.title}</h3><p>{g.items.join(', ')}</p></div><i className="blue-dot"></i>{idx<DATA[tab].groups.length-1&&<span className="divider"/>}</div>)}</aside>}

function App(){const [tab,setTab]=useState('invest');const d=DATA[tab];return <div className="app">
  <header><div className="header-inner"><Brand/><nav className="desktop-nav"><a>Overview</a><a className={tab==='loans'?'active':''} onClick={()=>setTab('loans')}>Loans & Credit</a><a className={tab==='invest'?'active':''} onClick={()=>setTab('invest')}>Investments</a><a>Payments</a><a>Insights</a><a>Support</a></nav><div className="header-actions"><button className="profile">●</button><button className="login">Login</button><button className="bell"><Icon name="bell"/></button></div></div></header>
  <div className="mobile-tabs">{Object.entries(DATA).map(([k,v])=><button key={k} className={tab===k?'active':''} onClick={()=>setTab(k)}>{v.label}</button>)}</div>
  <main>
    <section className={`smart-banner ${tab}`}><span className="banner-icon"><Icon name={tab==='loans'?'wallet':tab==='insurance'?'shield':'chart'} size={27}/></span><div><b>{d.bannerTitle}</b><span>{d.banner}</span></div><span className="banner-arrow">›</span></section>
    <div className="content-grid"><SideCatalog tab={tab}/><section className="panel" key={tab}>{tab==='invest'?<InvestPanel/>:tab==='loans'?<LoanPanel/>:<InsurancePanel/>}</section></div>
  </main>
</div>}

createRoot(document.getElementById('root')).render(<App/>);
