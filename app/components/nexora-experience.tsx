"use client";

import Image from "next/image";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import { IntelligenceField } from "./intelligence-field";

const chapters = [
  { id: "hero", label: "Awaken" },
  { id: "problem", label: "Reality" },
  { id: "dna", label: "Digital DNA" },
  { id: "journey", label: "Journey" },
  { id: "voice", label: "Voice" },
  { id: "predict", label: "Predict" },
  { id: "cloud", label: "Cloud" },
  { id: "security", label: "Trust" },
  { id: "demo", label: "Future" },
];

const modules = [
  { name: "LeadVault", image: "/images/lead-vault.jpg", color: "#dbb159", position: "top" },
  { name: "VoiceVault", image: "/images/voice-vault.jpg", color: "#e5bf78", position: "right" },
  { name: "Predict", image: "/images/predict.jpg", color: "#dca744", position: "bottom" },
  { name: "Insight", image: "/images/insight.jpg", color: "#c99f4c", position: "left" },
  { name: "WhatsFlow", image: "/images/whats-flow.jpg", color: "#76bc4a", position: "top-right" },
  { name: "SecureDocs", image: "/images/secure-docs.jpg", color: "#d3a955", position: "bottom-left" },
];

const waveform = [18, 28, 48, 74, 52, 34, 20, 32, 62, 88, 68, 38, 20, 28, 51, 76, 58, 31, 17, 28, 44, 67, 49, 29, 18];

function useScrollSignals(setActive: (id: string) => void) {
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("[data-chapter]")];
    let raf = 0;
    const update = () => {
      const viewport = window.innerHeight;
      let nearest = "hero";
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
        section.style.setProperty("--scene-progress", progress.toFixed(3));
        const distance = Math.abs(rect.top - viewport * 0.32);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = section.id;
        }
      }
      setActive(nearest);
      raf = 0;
    };
    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [setActive]);
}

function Wordmark() {
  return (
    <span className="wordmark" aria-label="NEXORA AI">
      <span className="wordmark-n">N</span>EXORA <i>AI</i>
    </span>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={diagonal ? "arrow diagonal" : "arrow"} aria-hidden="true">↗</span>;
}

export function NexoraExperience() {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState("hero");
  const [selectedModule, setSelectedModule] = useState(modules[0].name);
  const [compared, setCompared] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  useScrollSignals(setActive);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1450);
    const moveCursor = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const magnetize = (event: PointerEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const x = (event.clientX - (bounds.left + bounds.width / 2)) * 0.16;
    const y = (event.clientY - (bounds.top + bounds.height / 2)) * 0.16;
    target.style.setProperty("--magnet-x", `${x}px`);
    target.style.setProperty("--magnet-y", `${y}px`);
  };
  const demagnetize = (event: PointerEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--magnet-x", "0px");
    event.currentTarget.style.setProperty("--magnet-y", "0px");
  };

  return (
    <main className={loaded ? "site is-loaded" : "site"}>
      <div className="cursor" ref={cursorRef} aria-hidden="true"><span /></div>
      <div className="loader" aria-live="polite" aria-label="NEXORA AI is loading">
        <div className="loader-core"><span /></div>
        <Wordmark />
        <p>Intelligence awakens</p>
      </div>
      <IntelligenceField />

      <header className="site-header">
        <a href="#hero" className="brand-link" aria-label="NEXORA AI — return to the beginning"><Wordmark /></a>
        <div className="header-status"><span /> Enterprise intelligence cloud</div>
        <a className="nav-demo magnetic" href="#demo" onPointerMove={magnetize} onPointerLeave={demagnetize}>Request a demo <Arrow /></a>
      </header>

      <nav className="route-rail" aria-label="Story chapters">
        {chapters.map((chapter, index) => (
          <a key={chapter.id} href={`#${chapter.id}`} className={active === chapter.id ? "is-active" : ""} aria-label={chapter.label} aria-current={active === chapter.id ? "step" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span><i />
          </a>
        ))}
      </nav>

      <section id="hero" data-chapter className="hero chapter">
        <div className="hero-architecture" aria-hidden="true">
          <div className="horizon" />
          <div className="gold-orb orb-a" />
          <div className="gold-orb orb-b" />
          <div className="city city-one" /><div className="city city-two" /><div className="city city-three" />
          <div className="neural-ring ring-one" /><div className="neural-ring ring-two" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow"><span>NEXORA AI</span> / Operating system for intelligent real estate</p>
          <h1><span>Secure</span> every lead.<br /><span>Predict</span> every opportunity.<br /><span>Transform</span> every transaction.</h1>
          <div className="hero-actions">
            <a className="button button-primary magnetic" href="#demo" onPointerMove={magnetize} onPointerLeave={demagnetize}>Request enterprise demo <Arrow /></a>
            <a className="text-link" href="#journey">Enter the experience <Arrow /></a>
          </div>
        </div>
        <aside className="hero-sphere" aria-label="NEXORA intelligence signal">
          <div className="sphere-glow" />
          <div className="sphere-lines" />
          <span className="sphere-center">N</span>
          <p>Digital<br />intelligence</p>
        </aside>
        <div className="scroll-cue"><span /> Scroll to enter</div>
        <div className="hero-index"><span>01</span><i /> <small>Intelligence awakens</small></div>
      </section>

      <section id="problem" data-chapter className="problem chapter">
        <div className="problem-grid" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="problem-copy reveal-copy">
          <p className="eyebrow">The industry has changed. The tools have not.</p>
          <h2><small>₹</small>10,000<span>Cr</span></h2>
          <p className="statement">Annual opportunity lost to leakage, duplication, slow follow-up, and systems that only record what already happened.</p>
          <div className="failure-list" aria-label="Legacy system failures">
            {['Lead theft', 'Data leakage', 'Builder bypass', 'CRM fatigue'].map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>)}
          </div>
        </div>
        <p className="chapter-number">02 / The cost of legacy</p>
      </section>

      <section id="dna" data-chapter className="dna chapter">
        <div className="dna-radial" aria-hidden="true"><div className="fingerprint"><i /><i /><i /><i /><i /><i /></div></div>
        <div className="dna-copy reveal-copy">
          <p className="eyebrow"><span>Proprietary technology</span> / Digital Lead DNA™</p>
          <h2>A lead is not<br />a record.</h2>
          <p className="lede">It is a living intelligence identity—traceable from first touch, protected through every handoff, and proven at every moment.</p>
          <div className="dna-pills">
            {['Identity', 'Context', 'Ownership', 'Behaviour'].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
          </div>
        </div>
        <div className="dna-claim"><span>Immutable</span><i /> <span>Verifiable</span><i /> <span>Protected</span></div>
      </section>

      <section id="journey" data-chapter className="journey chapter">
        <div className="journey-copy reveal-copy">
          <p className="eyebrow">One continuous intelligence loop</p>
          <h2>From first signal<br />to final signature.</h2>
          <p className="lede">NEXORA quietly coordinates every stage. The result is not more activity. It is a more certain outcome.</p>
        </div>
        <div className="journey-track" role="list" aria-label="NEXORA intelligence journey">
          {[
            ['01', 'Capture', 'Every source'], ['02', 'Understand', 'Digital Lead DNA™'], ['03', 'Engage', 'Voice + WhatsApp AI'], ['04', 'Verify', 'Secure ownership'], ['05', 'Predict', 'Next best action'], ['06', 'Close', 'Revenue intelligence'],
          ].map(([number, title, body], index) => (
            <article className="journey-step" role="listitem" key={title} style={{ "--step": index } as React.CSSProperties}>
              <b>{number}</b><i /><h3>{title}</h3><p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="voice" data-chapter className="voice chapter">
        <div className="voice-glow" aria-hidden="true" />
        <div className="voice-visual">
          <div className="voice-dial"><div className="voice-mic"><i /><i /><i /></div></div>
          <div className="waveform" aria-hidden="true">{waveform.map((height, index) => <i key={index} style={{ height: `${height}px`, animationDelay: `${index * -0.08}s` }} />)}</div>
          <p className="signal-label">LIVE INTELLIGENCE<br /><span>Conversation signal</span></p>
        </div>
        <div className="voice-copy reveal-copy">
          <p className="eyebrow"><span>Voice AI concierge</span> / first conversations, reimagined</p>
          <h2>Every lead<br />hears intelligence.</h2>
          <p className="lede">Natural, multilingual conversations understand intent, budget, location and timelines—then verify the lead, update the CRM, and schedule the next moment.</p>
          <div className="voice-meta"><span>English</span><span>Hindi</span><span>Hinglish</span><span>Regional languages</span></div>
          <button className="button button-quiet magnetic" type="button" onPointerMove={magnetize} onPointerLeave={demagnetize} onClick={(event) => event.currentTarget.classList.toggle("is-playing")}>Hear the concierge <span className="play">▶</span></button>
        </div>
        <p className="chapter-number">05 / An intelligent first hello</p>
      </section>

      <section id="predict" data-chapter className="predict chapter">
        <div className="predict-copy reveal-copy">
          <p className="eyebrow">Predictive sales intelligence</p>
          <h2>Know the next<br />winning move.</h2>
          <p className="lede">NEXORA makes patterns visible before they become missed opportunities—so your best judgement scales across every team and territory.</p>
          <a href="#cloud" className="text-link">See the intelligence layer <Arrow /></a>
        </div>
        <div className="prediction-console" aria-label="Example predictive lead intelligence">
          <div className="console-head"><span>Live opportunity / 88421</span><i>● AI confidence 98.4%</i></div>
          <div className="score-disc"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" /><circle className="progress" cx="50" cy="50" r="40" /></svg><b>97</b><small>Lead score</small></div>
          <dl className="prediction-stats"><div><dt>Buying probability</dt><dd>94%</dd></div><div><dt>Investment capacity</dt><dd>₹3.8 Cr</dd></div><div><dt>Expected closing</dt><dd>09 days</dd></div></dl>
          <div className="next-action"><span>Next best action</span><strong>Schedule site visit <Arrow diagonal /></strong></div>
          <div className="data-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </div>
      </section>

      <section id="cloud" data-chapter className="cloud chapter">
        <div className="cloud-copy reveal-copy">
          <p className="eyebrow"><span>Enterprise intelligence cloud</span> / one platform, infinite possibilities</p>
          <h2>Everything<br />orbits one truth.</h2>
          <p className="lede">Every function speaks the same intelligence language: secure, self-learning, accountable and always in motion.</p>
        </div>
        <div className="module-orbit" role="group" aria-label="NEXORA platform modules">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <button className="core-module" type="button" onClick={() => setSelectedModule("NEXORA Core")} aria-label="View NEXORA Core">N<span>Core</span></button>
          {modules.map((module, index) => (
            <button key={module.name} type="button" className={`orbit-module module-${index} ${selectedModule === module.name ? "is-selected" : ""}`} style={{ "--module-color": module.color } as React.CSSProperties} onClick={() => setSelectedModule(module.name)} aria-pressed={selectedModule === module.name}>
              <Image src={module.image} alt="" width={1100} height={1100} sizes="140px" />
              <span>{module.name}</span>
            </button>
          ))}
          <div className="module-caption" aria-live="polite"><b>{selectedModule}</b><span>{selectedModule === "NEXORA Core" ? "The self-learning intelligence layer." : "Connected to the enterprise intelligence layer."}</span></div>
        </div>
      </section>

      <section id="comparison" data-chapter className={`comparison chapter ${compared ? "is-compared" : ""}`}>
        <header className="comparison-heading reveal-copy"><p className="eyebrow">The choice is not a software category</p><h2>Static data<br /><em>or</em> living intelligence.</h2></header>
        <div className="comparison-stages">
          <article className="legacy-stage"><p>Traditional CRM</p><h3>It records<br />what happened.</h3><ul><li>Static database</li><li>Manual calls</li><li>Reactive operations</li><li>Data leakage risk</li></ul></article>
          <button type="button" className="comparison-toggle magnetic" aria-pressed={compared} onClick={() => setCompared(!compared)} onPointerMove={magnetize} onPointerLeave={demagnetize}><span>{compared ? "NEXORA" : "VS"}</span><i /></button>
          <article className="nexora-stage"><p>NEXORA AI</p><h3>It shapes<br />what happens next.</h3><ul><li>Self-learning intelligence</li><li>Voice automation</li><li>Predictive decisions</li><li>Digital Lead DNA™</li></ul><b>10× <span>smarter / safer / faster</span></b></article>
        </div>
      </section>

      <section id="security" data-chapter className="security chapter">
        <div className="security-art">
          <div className="security-shield"><span>⌁</span><i /></div>
          <div className="security-rings" aria-hidden="true"><i /><i /><i /></div>
          <Image src="/images/secure-docs.jpg" alt="SecureDocs AI module" width={1100} height={1100} sizes="(max-width: 760px) 80vw, 34vw" />
        </div>
        <div className="security-copy reveal-copy">
          <p className="eyebrow"><span>Zero trust security</span> / every action verified</p>
          <h2>Trust is not<br />a setting.</h2>
          <p className="lede">Identity, access, device signals and document intelligence form one continuous verification fabric. Ownership is not claimed. It is cryptographically proven.</p>
          <div className="security-points"><span>Encrypted intelligence</span><span>Immutable audit trail</span><span>Behaviour detection</span><span>Verifiable authenticity</span></div>
        </div>
      </section>

      <section id="demo" data-chapter className="final-cta chapter">
        <div className="final-sun" aria-hidden="true" /><div className="final-grid" aria-hidden="true" />
        <div className="final-copy">
          <p className="eyebrow">The real estate intelligence cloud</p>
          <h2>The future does not<br />need another CRM.<br /><span>It needs intelligence.</span></h2>
          <p>Bring security, sales intelligence, and autonomous operations into one enterprise-grade system.</p>
          <a className="button button-primary magnetic" href="mailto:hello@nexora.ai?subject=Enterprise%20demo%20request" onPointerMove={magnetize} onPointerLeave={demagnetize}>Request enterprise demo <Arrow /></a>
        </div>
        <footer className="site-footer"><Wordmark /><span>© {new Date().getFullYear()} NEXORA AI</span><a href="mailto:hello@nexora.ai">hello@nexora.ai</a></footer>
      </section>

      <noscript>
        <section className="noscript-content">
          <h1>NEXORA AI — The Operating System for Intelligent Real Estate</h1>
          <p>Secure every lead. Predict every opportunity. Transform every transaction.</p>
          <h2>Digital Lead DNA™</h2><p>Permanent, verifiable identity for every real estate opportunity.</p>
          <h2>Enterprise Intelligence Cloud</h2><p>One intelligence layer for lead security, voice AI, predictive sales intelligence, document protection, automation, and executive dashboards.</p>
          <a href="mailto:hello@nexora.ai?subject=Enterprise%20demo%20request">Request an enterprise demo</a>
        </section>
      </noscript>
    </main>
  );
}
