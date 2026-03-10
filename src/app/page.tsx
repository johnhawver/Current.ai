"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("instagram");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = pct + "%";
      if (navRef.current)
        navRef.current.classList.toggle("scrolled", scrollTop > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fadeEls = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rings: { born: number }[] = [];
    let lastSpawn = 0;
    const spawnInterval = 3500;
    let animId: number;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("resize", resize);
    resize();

    function drawRadar(time: number) {
      const rect = canvas!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const maxR = Math.max(w, h) * 0.5;

      ctx!.clearRect(0, 0, w, h);

      if (time - lastSpawn > spawnInterval || rings.length === 0) {
        rings.push({ born: time });
        lastSpawn = time;
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        const age = time - ring.born;
        const progress = age / 7000;

        if (progress > 1) {
          rings.splice(i, 1);
          continue;
        }

        const r = progress * maxR;
        const opacity = 0.1 * (1 - progress);

        ctx!.beginPath();
        ctx!.arc(cx, cy, r, 0, Math.PI * 2);
        ctx!.strokeStyle = "rgba(49, 98, 99, " + opacity + ")";
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      ctx!.beginPath();
      ctx!.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(49, 98, 99, 0.2)";
      ctx!.fill();

      animId = requestAnimationFrame(drawRadar);
    }

    animId = requestAnimationFrame(drawRadar);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  function closeMobile() {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }

  function toggleMobile() {
    setMobileOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }

  function handleCtaSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCtaSubmitted(true);
  }

  const tickerText =
    "🌧 Rain forecast → Push outerwear \u00A0·\u00A0 🏈 Game day tomorrow → Student promo \u00A0·\u00A0 ❄️ First freeze → Knitwear campaign \u00A0·\u00A0 🎓 Move-in week → Essentials push \u00A0·\u00A0 🌡 Heat wave → Summer sale trigger \u00A0·\u00A0 📅 Finals week → Study gear promo \u00A0·\u00A0";

  return (
    <>
      <div id="scroll-progress" ref={progressRef}></div>

      <nav id="navbar" ref={navRef}>
        <Link href="/" className="nav-wordmark">
          CURRENT
        </Link>
        <ul className="nav-links">
          <li>
            <a href="#how-it-works">How it works</a>
          </li>
          <li>
            <a href="#signals">Signals</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#problem">About</a>
          </li>
        </ul>
        <Link href="/waitlist" className="nav-cta">
          Get Early Access
        </Link>
        <button
          className={`hamburger${mobileOpen ? " active" : ""}`}
          aria-label="Menu"
          onClick={toggleMobile}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        <a href="#how-it-works" className="mobile-nav-link" onClick={closeMobile}>
          How it works
        </a>
        <a href="#signals" className="mobile-nav-link" onClick={closeMobile}>
          Signals
        </a>
        <a href="#pricing" className="mobile-nav-link" onClick={closeMobile}>
          Pricing
        </a>
        <a href="#problem" className="mobile-nav-link" onClick={closeMobile}>
          About
        </a>
        <Link href="/waitlist" className="mobile-nav-link" onClick={closeMobile}>
          Get Early Access
        </Link>
      </div>

      <header id="hero">
        <canvas id="hero-canvas" ref={canvasRef}></canvas>
        <div className="hero-content">
          <div className="hero-badge fade-in">
            <span className="pulse-dot"></span>
            Signal-Driven Retail Intelligence
          </div>
          <h1 className="hero-headline fade-in delay-1">
            Local Signals.
            <br />
            Automated Sales.
            <br />
            <span className="line-accent">Current AI.</span>
          </h1>
          <p className="hero-sub fade-in delay-2">
            Current monitors your city&apos;s real-time signals — weather, game
            days, campus events — and turns them into revenue-driving campaigns
            for your store. Automatically.
          </p>
          <div className="hero-cta-row fade-in delay-3">
            <Link href="/signup" className="btn-primary">
              Start Free Trial
            </Link>
            <a href="#how-it-works" className="hero-link">
              See how it works →
            </a>
          </div>
        </div>
      </header>

      <div className="ticker-wrap">
        <div className="ticker-track">
          <span className="ticker-item">{tickerText}</span>
          <span className="ticker-item">{tickerText}</span>
          <span className="ticker-item">{tickerText}</span>
        </div>
      </div>

      <section id="problem">
        <div className="problem-left">
          <div className="section-label fade-in">THE PROBLEM</div>
          <h2 className="section-headline fade-in delay-1">
            Your revenue follows the city.
            <br />
            Your marketing doesn&apos;t.
          </h2>
          <p className="problem-body fade-in delay-2">
            Independent retailers in college towns sit on top of the most
            predictable demand cycles in retail. Game days, weather shifts,
            campus events — they drive foot traffic surges every week. But most
            store owners market on gut instinct and memory, not data. The result:
            missed moments, flat campaigns, and revenue left on the table.
          </p>
        </div>
        <div className="pain-cards">
          <article className="pain-card fade-in delay-1">
            <span className="pain-icon">◎</span>
            <div className="pain-title">You post when you remember</div>
            <p className="pain-text">
              Not when opportunity is highest. Social content goes out on Tuesday
              afternoon when the real moment was Saturday morning before kickoff.
            </p>
          </article>
          <article className="pain-card fade-in delay-2">
            <span className="pain-icon">◉</span>
            <div className="pain-title">You guess the timing</div>
            <p className="pain-text">
              Game days, weather events, campus milestones — they all drive
              demand, but none of them make it into your marketing calendar. You
              react. You don&apos;t anticipate.
            </p>
          </article>
          <article className="pain-card fade-in delay-3">
            <span className="pain-icon">◌</span>
            <div className="pain-title">You see the spike after</div>
            <p className="pain-text">
              The POS data tells the story a week later. A rain-driven run on
              umbrellas. A game-day surge in branded gear. By then, the moment is
              gone.
            </p>
          </article>
        </div>
      </section>

      <section id="how-it-works">
        <div className="signal-label fade-in">SIGNAL → INSIGHT → ACTION</div>
        <h2
          className="section-headline fade-in delay-1"
          style={{ fontSize: "clamp(36px,5vw,64px)" }}
        >
          Four layers. One revenue moment.
        </h2>
        <div className="steps-grid">
          <div className="step fade-in delay-1">
            <div className="step-number">01</div>
            <div className="step-label">DETECT</div>
            <h3 className="step-title">Signal Intelligence</h3>
            <p className="step-body">
              Current monitors weather, sports calendars, campus events, and
              seasonal cycles — 24/7 — for your exact location.
            </p>
          </div>
          <div className="step fade-in delay-2">
            <div className="step-number">02</div>
            <div className="step-label">PREDICT</div>
            <h3 className="step-title">Opportunity Scoring</h3>
            <p className="step-body">
              Each signal is mapped to retail opportunity. High-urgency moments
              surface first. Low-noise signals are filtered out.
            </p>
          </div>
          <div className="step fade-in delay-3">
            <div className="step-number">03</div>
            <div className="step-label">GENERATE</div>
            <h3 className="step-title">AI Campaign Draft</h3>
            <p className="step-body">
              Current writes your Instagram caption, Reel script, email copy, and
              SMS promo — anchored to why right now matters.
            </p>
          </div>
          <div className="step fade-in delay-4">
            <div className="step-number">04</div>
            <div className="step-label">TRACK</div>
            <h3 className="step-title">Performance Loop</h3>
            <p className="step-body">
              Connect your POS. Current learns which signals drive foot traffic
              for your specific store and optimizes automatically.
            </p>
          </div>
        </div>
      </section>

      <section id="signals">
        <div className="showcase-header">
          <h2 className="section-headline fade-in">
            The city is talking. Current listens.
          </h2>
          <p className="showcase-sub fade-in delay-1">
            8 signal categories. Infinite local moments.
          </p>
        </div>
        <div className="signal-grid">
          <div className="signal-card fade-in delay-1">
            <span className="signal-card-icon">🌤</span>
            <div className="signal-card-title">Weather</div>
            <p className="signal-card-desc">
              Temperature thresholds, precipitation, heatwaves
            </p>
            <p className="signal-card-example">
              → &quot;92°F Saturday — push linen &amp; iced drinks&quot;
            </p>
          </div>
          <div className="signal-card fade-in delay-2">
            <span className="signal-card-icon">🏈</span>
            <div className="signal-card-title">Game Days</div>
            <p className="signal-card-desc">
              University sports schedules, rivalry weeks
            </p>
            <p className="signal-card-example">
              → &quot;Home game vs. MSU — gameday promo by Thursday&quot;
            </p>
          </div>
          <div className="signal-card fade-in delay-3">
            <span className="signal-card-icon">🎓</span>
            <div className="signal-card-title">Campus Cycles</div>
            <p className="signal-card-desc">
              Move-in, finals, graduation, orientation
            </p>
            <p className="signal-card-example">
              → &quot;Orientation Mon — welcome week essentials&quot;
            </p>
          </div>
          <div className="signal-card fade-in delay-4">
            <span className="signal-card-icon">📅</span>
            <div className="signal-card-title">Local Events</div>
            <p className="signal-card-desc">
              Festivals, downtown activations, market days
            </p>
            <p className="signal-card-example">
              → &quot;Art Fair Fri–Sun — foot traffic surge incoming&quot;
            </p>
          </div>
          <div className="signal-card fade-in delay-1">
            <span className="signal-card-icon">❄️</span>
            <div className="signal-card-title">Seasonal Shifts</div>
            <p className="signal-card-desc">
              First frost, first heat, holiday proximity
            </p>
            <p className="signal-card-example">
              → &quot;First frost Weds — cozy collection drop&quot;
            </p>
          </div>
          <div className="signal-card fade-in delay-2">
            <span className="signal-card-icon">🌧</span>
            <div className="signal-card-title">Rain Events</div>
            <p className="signal-card-desc">
              Foot traffic redirection moments
            </p>
            <p className="signal-card-example">
              → &quot;3-day rain — push rain gear + in-store events&quot;
            </p>
          </div>
          <div className="signal-card fade-in delay-3">
            <span className="signal-card-icon">📦</span>
            <div className="signal-card-title">Move-in Week</div>
            <p className="signal-card-desc">Dorm supply demand spikes</p>
            <p className="signal-card-example">
              → &quot;Move-in Sat — dorm essentials, parent upsell&quot;
            </p>
          </div>
          <div className="signal-card fade-in delay-4">
            <span className="signal-card-icon">🎉</span>
            <div className="signal-card-title">Holidays</div>
            <p className="signal-card-desc">2-week proximity triggers</p>
            <p className="signal-card-example">
              → &quot;Valentine&apos;s in 12 days — gift guide campaign&quot;
            </p>
          </div>
        </div>
      </section>

      <section id="demo">
        <div className="section-label fade-in">LIVE PREVIEW</div>
        <h2 className="section-headline fade-in delay-1">
          From signal to campaign in seconds.
        </h2>
        <div className="demo-grid fade-in delay-2">
          <div className="demo-signal">
            <div className="demo-label accent">SIGNAL DETECTED</div>
            <span className="demo-event-icon">🏈</span>
            <div className="demo-event-title">
              Michigan vs Ohio State — Saturday 12:00 PM
            </div>
            <div className="signal-meter">
              <div className="signal-meter-fill"></div>
            </div>
            <span className="signal-meter-label">HIGH OPPORTUNITY</span>
            <div className="demo-tags">
              <span className="demo-tag">Game Day</span>
              <span className="demo-tag">Weekend</span>
              <span className="demo-tag">Student Traffic</span>
              <span className="demo-tag">High Urgency</span>
            </div>
          </div>
          <div className="demo-output">
            <div className="demo-label dim">CURRENT GENERATED</div>
            <div className="demo-tabs">
              <button
                className={`demo-tab${activeTab === "instagram" ? " active" : ""}`}
                onClick={() => setActiveTab("instagram")}
              >
                Instagram
              </button>
              <button
                className={`demo-tab${activeTab === "email" ? " active" : ""}`}
                onClick={() => setActiveTab("email")}
              >
                Email
              </button>
              <button
                className={`demo-tab${activeTab === "sms" ? " active" : ""}`}
                onClick={() => setActiveTab("sms")}
              >
                SMS
              </button>
            </div>
            <div
              className={`demo-content${activeTab === "instagram" ? " active" : ""}`}
            >
              🏈 Game day means one thing: looking good while we watch the
              Wolverines dominate. Stop in before kickoff — all game day fits 20%
              off until noon Saturday.
              <br />
              <br />
              Go Blue. 💙
              <br />
              <br />
              📍 [Tag location]
              <br />
              #AnnArbor #GoBlue #GameDay #ShopLocal
            </div>
            <div
              className={`demo-content${activeTab === "email" ? " active" : ""}`}
            >
              <strong>Subject: Game Day Starts Here</strong>
              <br />
              <br />
              The Big Game is Saturday at noon. Before you head to the Big House,
              head to us.
              <br />
              <br />
              We&apos;re running 20% off all game day styles — maize, blue, and
              everything in between — from open until kickoff.
              <br />
              <br />
              Walk-ins welcome. Limited sizes on best sellers.
              <br />
              <br />→ See what&apos;s in stock
              <br />
              <br />— The team at [Store Name]
            </div>
            <div
              className={`demo-content${activeTab === "sms" ? " active" : ""}`}
            >
              🏈 GAME DAY DEAL: 20% off all game day fits before kickoff
              Saturday. Stop by before noon — first come, first styled. [Store
              Name] | Reply STOP to unsubscribe
            </div>
          </div>
        </div>
        <p className="demo-disclaimer fade-in delay-3">
          Example output. Tone and style are configurable per store.
        </p>
      </section>

      <section id="pricing">
        <h2 className="section-headline fade-in">
          Simple pricing. No surprises.
        </h2>
        <div className="pricing-grid">
          <div className="pricing-card fade-in delay-1">
            <span className="pricing-pill">FOR SOLO RETAILERS</span>
            <div className="pricing-name">Starter</div>
            <div className="pricing-price">
              $49<span>/mo</span>
            </div>
            <ul className="pricing-features">
              <li>
                <span className="check">✓</span> 1 store location
              </li>
              <li>
                <span className="check">✓</span> 3 active signal sources
              </li>
              <li>
                <span className="check">✓</span> AI caption &amp; email
                generation
              </li>
              <li>
                <span className="check">✓</span> Weekly campaign
                recommendations
              </li>
              <li>
                <span className="check">✓</span> Instagram &amp; SMS ready copy
              </li>
            </ul>
            <Link href="/signup?plan=starter" className="btn-outline">
              Start Free
            </Link>
          </div>
          <div className="pricing-card featured fade-in delay-2">
            <span className="pricing-pill">MOST POPULAR</span>
            <div className="pricing-name">Growth</div>
            <div className="pricing-price">
              $99<span>/mo</span>
            </div>
            <ul className="pricing-features">
              <li>
                <span className="check">✓</span> Everything in Starter
              </li>
              <li>
                <span className="check">✓</span> Unlimited signal sources
              </li>
              <li>
                <span className="check">✓</span> AI video &amp; Reel scripts
              </li>
              <li>
                <span className="check">✓</span> POS integration (Shopify,
                Square)
              </li>
              <li>
                <span className="check">✓</span> Advanced trigger customization
              </li>
              <li>
                <span className="check">✓</span> Performance analytics
              </li>
              <li>
                <span className="check">✓</span> Priority support
              </li>
            </ul>
            <Link href="/signup?plan=growth" className="btn-filled">
              Start Free
            </Link>
          </div>
        </div>
        <p className="pricing-note fade-in delay-3">
          No credit card required. 14-day free trial. Cancel anytime.
        </p>
      </section>

      <section id="traction">
        <div className="traction-row">
          <div className="traction-stat fade-in delay-1">
            <div className="traction-number">8</div>
            <div className="traction-label">Signal Sources Monitored</div>
          </div>
          <div className="traction-stat fade-in delay-2">
            <div className="traction-number">A²</div>
            <div className="traction-label">Ann Arbor, MI — Pilot City</div>
          </div>
          <div className="traction-stat fade-in delay-3">
            <div className="traction-number">$1.2T</div>
            <div className="traction-label">Independent Retail Market</div>
          </div>
        </div>
      </section>

      <section id="cta">
        <div className="cta-label fade-in">EARLY ACCESS NOW OPEN</div>
        <h2 className="cta-headline fade-in delay-1">
          Your city&apos;s next revenue moment
          <br />
          is 48 hours away.
        </h2>
        <p className="cta-sub fade-in delay-2">
          Join the waitlist. We&apos;re onboarding Ann Arbor retailers first.
        </p>
        {!ctaSubmitted ? (
          <form className="cta-form fade-in delay-3" onSubmit={handleCtaSubmit}>
            <input
              type="email"
              className="cta-input"
              placeholder="your@store.com"
              required
              aria-label="Email address"
            />
            <button type="submit" className="cta-submit">
              Get Early Access
            </button>
          </form>
        ) : (
          <p
            className="cta-confirmation show"
            style={{ display: "block" }}
          >
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        )}
      </section>

      <footer>
        <div className="footer-left">
          <span className="footer-wordmark">CURRENT</span>
          <span className="footer-copy">
            © 2025 Current Technologies, Inc.
          </span>
        </div>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-right">Made in Ann Arbor, MI</div>
      </footer>
    </>
  );
}
