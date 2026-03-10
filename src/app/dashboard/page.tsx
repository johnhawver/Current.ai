"use client";

import { useState } from "react";
import Link from "next/link";
import "../globals.css";

export default function DashboardPage() {
  const [showCampaign, setShowCampaign] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <Link href="/" className="nav-wordmark">
          CURRENT
        </Link>
        <Link href="/" className="hero-link">
          ← Home
        </Link>
      </div>
      <main className="dashboard-main">
        <h1 className="dashboard-title">Upcoming Revenue Signals</h1>

        <div className="signal-card-dash">
          <div className="signal-card-dash-header">
            <div className="signal-card-dash-info">
              <h3>🏈 Michigan vs Ohio State — Saturday 12:00 PM</h3>
              <p>Opportunity Score: High</p>
            </div>
            <button
              className="generate-btn"
              onClick={() => setShowCampaign(true)}
            >
              Generate Campaign
            </button>
          </div>

          {showCampaign && (
            <div className="campaign-output">
              <span className="campaign-output-label">
                Generated Campaign — Instagram
              </span>
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
              <br />
              <br />
              <span className="campaign-output-label">Email Subject</span>
              Game Day Starts Here — 20% Off All Game Day Styles
              <br />
              <br />
              <span className="campaign-output-label">SMS</span>
              🏈 GAME DAY DEAL: 20% off all game day fits before kickoff
              Saturday. Stop by before noon — first come, first styled.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
