import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const catalog = {
  invest: {
    title: "Investment & Wealth",
    subtitle: "Mutual Funds, SIP, PMS, AIF, Bonds & more",
    groups: [
      ["Retail Investments", ["Mutual Funds", "SIP / SWP / SIF", "Demat Account", "Bonds"]],
      ["HNI & Institutional", ["Unlisted Shares", "Portfolio Management Services (PMS)", "Alternative Investment Funds (AIF)"]],
      ["Trading & Technology", ["Trading Algo & Technology Software"]],
    ],
  },
  loans: {
    title: "Loans & Credit",
    subtitle: "Business Loans, Home Loans, Personal Loans, Credit Cards & more",
    groups: [
      ["Business Financing", ["Business Loans", "MSME Loans", "Project Financing"]],
      ["Personal Loans", ["Home Loans", "Personal Loans"]],
      ["Loan Transfer & Refinancing", ["Balance Transfer"]],
      ["Credit & Salary Finance", ["Credit Cards", "Overdraft (OD) Against Salary"]],
    ],
  },
  insurance: {
    title: "Insurance",
    subtitle: "Life, Health, Motor, General & Business Insurance",
    groups: [
      ["Life & Health", ["Life Insurance", "Health Insurance"]],
      ["General & Motor", ["Motor Insurance", "General Insurance"]],
      ["Business Insurance", ["Business Insurance"]],
    ],
  },
};

const Option = ({ children, selected, onClick }) => (
  <button type="button" className={`option-btn ${selected ? "selected" : ""}`} onClick={onClick}>{children}</button>
);

function LeadCard({ tab }) {
  const [step, setStep] = useState(1);
  const [choice, setChoice] = useState("");
  const [secondary, setSecondary] = useState("");
  const [mobile, setMobile] = useState("");
  const [insuranceType, setInsuranceType] = useState("");

  const reset = () => { setStep(1); setChoice(""); setSecondary(""); setMobile(""); setInsuranceType(""); };

  if (step === 3) return (
    <div className="flow-card success">
      <div className="success-icon">✓</div>
      <h2>{tab === "insurance" ? "Quotes on the way!" : tab === "loans" ? "Options ready!" : "You’re all set!"}</h2>
      <p>{tab === "insurance" ? "We’ve sent the best matching plans to your WhatsApp." : tab === "loans" ? "We’ve sent matching loan options to your WhatsApp." : "We’ve sent personalized options to your WhatsApp."}</p>
      <button className="text-button" onClick={reset}>Start over</button>
    </div>
  );

  if (tab === "insurance") {
    if (step === 1) return (
      <div className="flow-card">
        <h2>What do you want to insure?</h2>
        <p>Choose a category to get started</p>
        <div className="option-stack">
          {["🚗 Motor Insurance","❤️ Health Insurance","🛡️ Life Insurance","🏢 Business Insurance"].map(x =>
            <Option key={x} selected={insuranceType===x} onClick={()=>setInsuranceType(x)}>{x}</Option>)}
        </div>
        <button className="primary-cta" disabled={!insuranceType} onClick={()=>setStep(2)}>Continue →</button>
      </div>
    );
    return (
      <div className="flow-card">
        <button className="back" onClick={()=>setStep(1)}>← Back</button>
        <h2>Get {insuranceType.replace(/[^\w\s]/g,"").trim()} Quotes</h2>
        <p>Enter your mobile number to see matching plans</p>
        <label className="field-label">Mobile Number</label>
        <div className="phone-field"><span>+91</span><input value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="98765 43210"/></div>
        <button className="primary-cta" disabled={mobile.length!==10} onClick={()=>setStep(3)}>Get Free Quotes →</button>
        <small className="helper">Best plans sent on WhatsApp</small>
      </div>
    );
  }

  if (step === 1 && tab === "invest") return (
    <div className="flow-card">
      <h2>What’s your main investment goal?</h2><p>This helps us show the right options</p>
      <div className="option-stack">
        {["Wealth Creation","Tax Saving","Retirement","High Returns (Aggressive)","Not sure yet"].map(x=><Option key={x} selected={choice===x} onClick={()=>setChoice(x)}>{x}</Option>)}
      </div>
      <button className="primary-cta" disabled={!choice} onClick={()=>setStep(2)}>Get Personalized Options →</button>
    </div>
  );

  if (step === 1) return (
    <div className="flow-card">
      <h2>How much loan are you looking for?</h2><p>Select an amount range</p>
      <div className="option-grid">
        {["Under ₹5 Lakh","₹5–15 Lakh","₹15–50 Lakh","Above ₹50 Lakh"].map(x=><Option key={x} selected={choice===x} onClick={()=>setChoice(x)}>{x}</Option>)}
      </div>
      <div className="mini-title">What is this loan for?</div>
      <div className="option-grid compact">
        {["Personal","Home","Business","Balance Transfer"].map(x=><Option key={x} selected={secondary===x} onClick={()=>setSecondary(x)}>{x}</Option>)}
      </div>
      <button className="primary-cta" disabled={!choice || !secondary} onClick={()=>setStep(2)}>Check Loan Options →</button>
    </div>
  );

  return (
    <div className="flow-card">
      <button className="back" onClick={()=>setStep(1)}>← Back</button>
      <h2>{tab==="loans" ? "Check your eligibility" : "Almost there!"}</h2>
      <p>{tab==="loans" ? "Enter mobile to see matching loan options" : "Enter your mobile to get personalized options"}</p>
      <label className="field-label">Mobile Number</label>
      <div className="phone-field"><span>+91</span><input value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="98765 43210"/></div>
      <div className="mini-title">{tab==="loans" ? "Monthly Income / Turnover (optional)" : "Investment Amount (optional)"}</div>
      <div className="option-grid compact">
        {(tab==="loans" ? ["Under ₹50k","₹50k–2L","₹2L–10L","Above ₹10L"] : ["₹10k–50k","₹50k–5L","₹5L+"]).map(x=><Option key={x} selected={secondary===x} onClick={()=>setSecondary(x)}>{x}</Option>)}
      </div>
      <button className="primary-cta" disabled={mobile.length!==10} onClick={()=>setStep(3)}>{tab==="loans" ? "Get Loan Options" : "Get My Options"}</button>
      <small className="helper">We’ll send options on WhatsApp. No spam.</small>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("invest");
  const data = catalog[tab];

  return <div className="app-shell">
    <header className="site-header">
      <div className="header-inner">
        <a className="logo" href="#"><span>Hydramight</span><b>capital</b></a>
        <div className="header-note">Simple access to financial products</div>
      </div>
    </header>

    <div className="tabs-bar">
      <nav className="tabs">
        {[
          ["invest","Investment & Wealth"],
          ["loans","Loans & Credit"],
          ["insurance","Insurance"],
        ].map(([id,label])=>
          <button key={id} className={tab===id ? "tab active" : "tab"} onClick={()=>setTab(id)}>{label}</button>
        )}
      </nav>
    </div>

    <main className="market-main">
      <section className="market-grid" key={tab}>
        <div className="catalog-side">
          <h1>{data.title}</h1>
          <p className="catalog-subtitle">{data.subtitle}</p>
          <div className="catalog-groups">
            {data.groups.map(([heading,items])=>
              <div className="catalog-group" key={heading}>
                <h3>{heading}</h3>
                <div className="product-list">
                  {items.map(item=><button key={item} className="product-row"><span className="dot"></span>{item}</button>)}
                </div>
              </div>
            )}
          </div>
        </div>
        <LeadCard tab={tab} />
      </section>
    </main>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
