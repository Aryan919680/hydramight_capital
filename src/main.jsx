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

function PhoneInput({value,onChange}){return <div className="phone-input"><span>+91</span><input type="tel" maxLength="10" value={value} onChange={e=>onChange(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="98765 43210"/></div>}
function Field({label,children}){return <label className="field"><span>{label}</span>{children}</label>}
function Success({title,text,detail,onReset}){return <div className="success-view"><div className="success-icon"><Icon name="check" size={34}/></div><h1>{title}</h1><p>{text}</p><small>{detail}</small><button className="secondary-btn" onClick={onReset}>Start over</button></div>}

function InvestPanel(){
 const [step,setStep]=useState(1),[goal,setGoal]=useState('Wealth Creation'),[mobile,setMobile]=useState(''),[amount,setAmount]=useState('');
 if(step===3)return <div className="question-card"><Success title="You’re all set!" text="Your personalized investment request has been captured." detail={amount==='₹5L+'?'High-value request — priority callback can be arranged.':'An expert can help you compare the shortlisted options.'} onReset={()=>{setStep(1);setMobile('');setAmount('')}}/></div>;
 return <div className="question-card">
  {step===1?<><div className="step-kicker">STEP 1 OF 2 · INVESTMENT PROFILE</div><h1>What’s your main investment goal?</h1><p>This helps us show the right options.</p><div className="goal-list">{investGoals.map(([t,sub,i])=><Choice key={t} title={t} sub={sub} icon={i} active={goal===t} onClick={()=>setGoal(t)}/>)}</div><button className="cta" onClick={()=>setStep(2)}>Get Personalized Options <Icon name="arrow"/></button><div className="security"><Icon name="shield" size={16}/> Personalized recommendations in <b>20 seconds</b></div></>:
  <><button className="back-btn" onClick={()=>setStep(1)}>← Back</button><div className="step-kicker">STEP 2 OF 2 · CONTACT DETAILS</div><h1>Almost there!</h1><p>Enter your mobile number and investment range to receive matching options.</p><div className="form-grid"><Field label="Mobile Number"><PhoneInput value={mobile} onChange={setMobile}/></Field><Field label="Investment Amount (optional)"><div className="select-grid three">{['₹10k–50k','₹50k–5L','₹5L+'].map(x=><button className={amount===x?'mini-option active':'mini-option'} onClick={()=>setAmount(x)} key={x}>{x}</button>)}</div></Field></div><div className="summary-box"><b>Your preference</b><span>{goal}{amount?` · ${amount}`:''}</span></div><button className="cta" disabled={mobile.length!==10} onClick={()=>setStep(3)}>Get My Options <Icon name="arrow"/></button><div className="security"><Icon name="shield" size={16}/> Your details are secure. No spam.</div></>}
 </div>
}

function LoanPanel(){
 const [step,setStep]=useState(1),[amount,setAmount]=useState('Under ₹5 Lakh'),[purpose,setPurpose]=useState('Personal'),[mobile,setMobile]=useState(''),[income,setIncome]=useState('');
 if(step===3)return <div className="question-card"><Success title="Loan options ready!" text="Your loan requirement has been captured successfully." detail={(amount==='Above ₹50 Lakh'||purpose==='Business')?'High-value request — specialist assistance can be prioritised.':'Matching loan options can now be shared with you.'} onReset={()=>{setStep(1);setMobile('');setIncome('')}}/></div>;
 return <div className="question-card loan-card">
 {step===1?<><div className="step-kicker">STEP 1 OF 2 · LOAN REQUIREMENT</div><h1>How much loan are you looking for?</h1><p>Select an amount range.</p><div className="amount-grid">{loanAmounts.map(([t,i])=><Choice key={t} title={t} icon={i} active={amount===t} onClick={()=>setAmount(t)} compact/>)}</div><hr/><h2>What is this loan for?</h2><p>Choose the best option that describes your need.</p><div className="purpose-grid">{loanPurposes.map(([t,i])=><Choice key={t} title={t} icon={i} active={purpose===t} onClick={()=>setPurpose(t)} compact/>)}</div><button className="cta" onClick={()=>setStep(2)}>Check Loan Options <Icon name="arrow"/></button><div className="tip"><Icon name="info" size={19}/> Select your amount & purpose to get <b>personalized loan options</b>.</div></>:
 <><button className="back-btn" onClick={()=>setStep(1)}>← Back</button><div className="step-kicker">STEP 2 OF 2 · ELIGIBILITY</div><h1>Check your eligibility</h1><p>Enter your mobile and approximate monthly income / turnover.</p><div className="form-grid"><Field label="Mobile Number"><PhoneInput value={mobile} onChange={setMobile}/></Field><Field label="Monthly Income / Turnover (optional)"><div className="select-grid two">{['Under ₹50k','₹50k–2L','₹2L–10L','Above ₹10L'].map(x=><button className={income===x?'mini-option active':'mini-option'} onClick={()=>setIncome(x)} key={x}>{x}</button>)}</div></Field></div><div className="summary-box"><b>Loan request</b><span>{amount} · {purpose}{income?` · ${income}`:''}</span></div><button className="cta" disabled={mobile.length!==10} onClick={()=>setStep(3)}>Get Loan Options <Icon name="arrow"/></button><div className="security"><Icon name="shield" size={16}/> Instant options. No obligation.</div></>}
 </div>
}

function InsurancePanel(){
 const [type,setType]=useState(''),[mobile,setMobile]=useState(''),[vehicle,setVehicle]=useState(''),[detail,setDetail]=useState(''),[done,setDone]=useState(false);
 const options=type==='Health Insurance'?['Myself','Family','Parents','All of the above']:type==='Life Insurance'?['Term Cover (Pure Protection)','Savings + Cover','Not sure yet']:type==='Business Insurance'?['Shop / Office','Fire & Burglary','Liability','Not sure']:type==='General Insurance'?['Home / Property','Travel','Personal Accident','Other']:[];
 const reset=()=>{setType('');setMobile('');setVehicle('');setDetail('');setDone(false)};
 if(done)return <div className="question-card"><Success title="Quotes on the way!" text="Your insurance requirement has been captured." detail="An advisor can help you compare suitable cover and benefits." onReset={reset}/></div>;
 return <div className="question-card">
 {!type?<><div className="step-kicker">INSURANCE · GET STARTED</div><h1>What do you want to insure?</h1><p>Choose a category to get started.</p><div className="goal-list insurance-list">{insuranceTypes.map(([t,sub,i])=><Choice key={t} title={t} sub={sub} icon={i} active={false} onClick={()=>setType(t)}/>)}</div><div className="security"><Icon name="shield" size={16}/> Secure, quick and personalized recommendations.</div></>:
 <><button className="back-btn" onClick={()=>{setType('');setDetail('')}}>← Back</button><div className="step-kicker">{type.toUpperCase()}</div><h1>{type==='Motor Insurance'?'Get Motor Insurance Quotes':type==='Health Insurance'?'Who do you want to cover?':type==='Life Insurance'?'What is your main need?':type==='Business Insurance'?'What type of business cover?':'Tell us what you want to protect'}</h1><p>{type==='Motor Insurance'?'Enter vehicle number for relevant quotes.':'Select the closest match and enter your mobile number.'}</p>
 <div className="form-grid">{type==='Motor Insurance'?<Field label="Vehicle Registration Number"><input className="text-input uppercase" value={vehicle} onChange={e=>setVehicle(e.target.value.toUpperCase())} placeholder="e.g. MH12AB1234"/></Field>:<Field label="Select an option"><div className="select-grid two">{options.map(x=><button className={detail===x?'mini-option active':'mini-option'} onClick={()=>setDetail(x)} key={x}>{x}</button>)}</div></Field>}<Field label="Mobile Number"><PhoneInput value={mobile} onChange={setMobile}/></Field></div>
 <div className="summary-box"><b>Selected cover</b><span>{type}{detail?` · ${detail}`:''}{vehicle?` · ${vehicle}`:''}</span></div><button className="cta" disabled={mobile.length!==10||(type==='Motor Insurance'&&!vehicle)} onClick={()=>setDone(true)}>Get Free Quotes <Icon name="arrow"/></button><div className="security"><Icon name="shield" size={16}/> Best matching plans, with expert assistance when needed.</div></>}
 </div>
}

function SideCatalog({tab}){return <aside className="side-catalog">{DATA[tab].groups.map((g,idx)=><div className="side-group" key={g.title}><div className="side-icon"><Icon name={g.icon}/></div><div><h3>{g.title}</h3><p>{g.items.join(', ')}</p></div><i className="blue-dot"></i>{idx<DATA[tab].groups.length-1&&<span className="divider"/>}</div>)}</aside>}

const TAB_META={invest:{eyebrow:'BUILD · GROW · INVEST',hero:'Build wealth with clarity, not complexity.',copy:'Explore investment solutions for every stage — from SIPs and bonds to PMS, AIFs and technology-led trading.'},loans:{eyebrow:'BORROW · BUILD · MOVE FORWARD',hero:'Credit solutions designed around your next move.',copy:'From personal and home loans to MSME funding, project finance and balance transfers — discover the right route without the clutter.'},insurance:{eyebrow:'PROTECT · PREPARE · PROGRESS',hero:'Protection that keeps up with your life.',copy:'Explore life, health, motor, general and business insurance through one simple guided experience.'}};
function App(){const[tab,setTab]=useState('invest');const d=DATA[tab],m=TAB_META[tab];const go=()=>document.getElementById('guided-form')?.scrollIntoView({behavior:'smooth'});return <div className="app">
<header><div className="header-inner"><Brand/><nav className="desktop-nav">{Object.entries(DATA).map(([k,v])=><a key={k} className={tab===k?'active':''} onClick={()=>setTab(k)}>{v.label}</a>)}<a href="#why">Why Hydramight</a><a href="#how">How it works</a></nav><div className="header-actions"><button className="login">Login</button><button className="header-cta" onClick={go}>Get Started</button><button className="bell"><Icon name="bell"/></button></div></div></header>
<div className="mobile-tabs">{Object.entries(DATA).map(([k,v])=><button key={k} className={tab===k?'active':''} onClick={()=>setTab(k)}>{v.label}</button>)}</div>
<main><section className="premium-hero"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">{m.eyebrow}</span><h1>{m.hero}</h1><p>{m.copy}</p><div className="hero-actions"><button className="hero-primary" onClick={go}>Explore my options <Icon name="arrow" size={18}/></button><span><Icon name="shield" size={18}/> Secure & confidential</span></div><div className="hero-stats"><div><b>20 sec</b><span>Quick discovery</span></div><div><b>3</b><span>Financial categories</span></div><div><b>1 place</b><span>Simple access</span></div></div></div><div className="hero-art"><div className="glow"/><div className="finance-card card-one"><span className="fc-icon"><Icon name={tab==='invest'?'chart':tab==='loans'?'wallet':'shield'}/></span><small>{d.label}</small><b>{d.bannerTitle}</b><p>{d.banner}</p></div><div className="finance-card card-two"><span className="verified"><Icon name="check" size={15}/> Guided experience</span><b>Simple. Clear. Personal.</b><small>Tell us what you need and we’ll guide you to the right next step.</small></div></div></div></section>
<section className="trust-strip"><div><b>One financial marketplace</b><span>Investments, credit and protection together</span></div><div><b>Guided discovery</b><span>Focused questions to narrow your options</span></div><div><b>Human assistance</b><span>Expert support for complex requirements</span></div><div><b>Privacy first</b><span>Secure and confidential by design</span></div></section>
<section className="experience" id="guided-form"><div className="section-heading"><span>EXPLORE YOUR OPTIONS</span><h2>Start with what you need today</h2><p>Choose a category and complete the guided form to find the most relevant next step.</p></div><div className="category-switch">{Object.entries(DATA).map(([k,v])=><button key={k} className={tab===k?'active':''} onClick={()=>setTab(k)}><span className="switch-icon"><Icon name={k==='invest'?'chart':k==='loans'?'wallet':'shield'}/></span><span><b>{v.label}</b><small>{k==='invest'?'Grow and manage wealth':k==='loans'?'Finance personal & business goals':'Protect life, health & assets'}</small></span></button>)}</div><section className={`smart-banner ${tab}`}><span className="banner-icon"><Icon name={tab==='loans'?'wallet':tab==='insurance'?'shield':'chart'} size={27}/></span><div><b>{d.bannerTitle}</b><span>{d.banner}</span></div><span className="banner-arrow">›</span></section><div className="content-grid"><SideCatalog tab={tab}/><section className="panel" key={tab}>{tab==='invest'?<InvestPanel/>:tab==='loans'?<LoanPanel/>:<InsurancePanel/>}</section></div></section>
<section className="why-section" id="why"><div className="section-heading light"><span>WHY HYDRAMIGHT CAPITAL</span><h2>Financial decisions should feel easier.</h2><p>Discovery, guidance and multiple financial needs in one modern experience.</p></div><div className="benefit-grid">{[['chart','Broad financial access','Retail investments, HNI solutions, credit and insurance in one experience.'],['info','Clarity before complexity','Start with your goal and focus only on choices that matter.'],['shield','Secure by design','Focused data capture and privacy-led interactions throughout.'],['brief','Support for bigger needs','Specialist assistance for high-value and business requirements.']].map(([i,t,x])=><article key={t}><span><Icon name={i}/></span><h3>{t}</h3><p>{x}</p></article>)}</div></section>
<section className="how-section" id="how"><div className="how-copy"><span className="eyebrow">HOW IT WORKS</span><h2>From requirement to relevant options in three simple steps.</h2><p>Choose a category, answer a few focused questions, and leave your contact details when you’re ready.</p><div className="assurance"><Icon name="shield"/><div><b>Your privacy matters</b><span>We only ask for details needed to progress your enquiry.</span></div></div></div><div className="steps">{[['01','Choose your category','Investment & Wealth, Loans & Credit, or Insurance.'],['02','Tell us what you need','Select your goal, amount, purpose or cover requirement.'],['03','Receive the next step','Get relevant options and expert assistance where appropriate.']].map(([n,t,x])=><div className="step-card" key={n}><b>{n}</b><h3>{t}</h3><p>{x}</p></div>)}</div></section>
<section className="final-cta"><div><span>READY WHEN YOU ARE</span><h2>Make your next financial decision with more clarity.</h2><p>Discover the right direction for investing, borrowing or protecting what matters.</p></div><button onClick={go}>Explore your options <Icon name="arrow"/></button></section></main>
<footer><div className="footer-main"><Brand/><p>Simple access to financial products for individuals, families, professionals and businesses.</p><div className="footer-links"><a href="#guided-form">Products</a><a href="#why">Why Hydramight</a><a href="#how">How it works</a><a>Privacy</a><a>Contact</a></div></div><div className="footer-bottom"><span>© 2026 Hydramight Capital. All rights reserved.</span><span>Investments · Loans · Insurance</span></div></footer></div>}
createRoot(document.getElementById('root')).render(<App/>);
