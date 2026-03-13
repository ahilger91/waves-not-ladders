import { useState, useMemo, useEffect } from "react";
import EmailCapture from "./EmailCapture";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');`;

const LIKERT_OPTIONS = [
  { label: "Strongly Disagree", value: 0   },
  { label: "Disagree",          value: 2.5 },
  { label: "Neutral",           value: 5   },
  { label: "Agree",             value: 7.5 },
  { label: "Strongly Agree",    value: 10  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// CHOOSER SCREEN
// ═══════════════════════════════════════════════════════════════════════════════

const chooserCss = `
${FONT}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{margin:0;}
.chooser{font-family:'DM Sans',sans-serif;background:#0a1628;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 24px;position:relative;overflow:hidden;}
.ch-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 25% 60%,#f4a26110 0%,transparent 55%),radial-gradient(ellipse at 75% 30%,#00b4d80c 0%,transparent 50%);pointer-events:none;}
.ch-waves{position:absolute;bottom:0;left:0;width:100%;opacity:.08;pointer-events:none;}
.ch-inner{position:relative;z-index:1;width:100%;max-width:780px;}
.ch-eyebrow{font-size:10px;letter-spacing:5px;text-transform:uppercase;color:#00b4d8;text-align:center;margin-bottom:20px;font-weight:500;}
.ch-title{font-family:'Playfair Display',serif;font-size:clamp(38px,6vw,72px);line-height:1.05;text-align:center;margin-bottom:10px;color:#ffffff;}
.ch-title em{font-style:italic;color:#00b4d8;}
.ch-subtitle{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(13px,1.8vw,17px);color:#c0d8ee;text-align:center;margin-bottom:20px;}
.ch-desc{font-size:15px;color:#cce0f4;line-height:1.8;text-align:center;max-width:520px;margin:0 auto 56px;font-weight:300;}
.ch-cards{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:40px;}
@media(max-width:600px){.ch-cards{grid-template-columns:1fr;}}
.ch-card{border-radius:6px;padding:36px 32px 32px;border:1px solid #1a2d42;cursor:pointer;transition:all .25s;position:relative;overflow:hidden;background:#0e1e30;}
.ch-card::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity .25s;}
.ch-card:hover{transform:translateY(-4px);border-color:var(--card-color);}
.ch-card:hover::before{opacity:1;}
.ch-card-early{--card-color:#f4a261;}
.ch-card-early::before{background:linear-gradient(135deg,#f4a26108 0%,transparent 60%);}
.ch-card-mid{--card-color:#00b4d8;}
.ch-card-mid::before{background:linear-gradient(135deg,#00b4d808 0%,transparent 60%);}
.ch-card-tag{font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:500;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.ch-card-tag-dot{width:6px;height:6px;border-radius:50%;background:var(--card-color);flex-shrink:0;}
.ch-card-emoji{font-size:36px;margin-bottom:16px;display:block;}
.ch-card-title{font-family:'Playfair Display',serif;font-size:22px;line-height:1.2;margin-bottom:10px;color:#ffffff;}
.ch-card-desc{font-size:13px;color:#a8c4d8;line-height:1.75;margin-bottom:24px;}
.ch-card-who{font-size:12px;color:#9ab8cc;line-height:1.7;padding-top:16px;border-top:1px solid #1e3248;}
.ch-card-who strong{color:#b8d0e4;font-weight:500;display:block;margin-bottom:6px;font-size:10px;letter-spacing:2px;text-transform:uppercase;}
.ch-card-btn{display:flex;align-items:center;justify-content:space-between;margin-top:20px;padding-top:20px;border-top:1px solid #182840;}
.ch-card-btn-label{font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:500;color:var(--card-color);}
.ch-card-btn-arrow{font-size:18px;color:var(--card-color);transition:transform .2s;}
.ch-card:hover .ch-card-btn-arrow{transform:translateX(4px);}
.ch-footer{text-align:center;font-size:12px;color:#9ab8cc;line-height:1.7;}
.ch-footer em{font-style:italic;color:#b0cce0;}
`;

function ChooserScreen({ onSelect }) {
  return (
    <div className="chooser">
      <style>{chooserCss}</style>
      <div className="ch-bg"/>
      <svg className="ch-waves" viewBox="0 0 1440 220" fill="none">
        <path d="M0,100 C200,160 400,40 600,100 C800,160 1000,40 1200,100 C1320,140 1400,80 1440,100 L1440,220 L0,220Z" fill="#00b4d8"/>
        <path d="M0,140 C300,80 600,200 900,120 C1100,70 1300,160 1440,130 L1440,220 L0,220Z" fill="#0a1628" opacity=".6"/>
      </svg>
      <div className="ch-inner">
        <div className="ch-eyebrow">Career Assessment</div>
        <h1 className="ch-title">Waves<br/>Not <em>Ladders</em></h1>
        <div className="ch-subtitle">How to find your way forward in a world that keeps changing</div>
        <p className="ch-desc">Two versions of the same honest assessment — one for people just starting out, one for people already in the workforce. Pick the one that fits where you are.</p>

        <div className="ch-cards">
          {/* Early Career */}
          <div className="ch-card ch-card-early" onClick={() => onSelect("early")}>
            <div className="ch-card-tag" style={{color:"#f4a261"}}>
              <div className="ch-card-tag-dot"/>
              Early Career
            </div>
            <span className="ch-card-emoji">🌊</span>
            <div className="ch-card-title">Finding Your Footing</div>
            <div className="ch-card-desc">For people early in their journey, trying to figure out what they want to do or who they want to be in the world.</div>
            <div className="ch-card-who">
              <strong>This version is for you if…</strong>
              You're in college, recently graduated, or early in your career. You feel the weight of the "what do you want to do?" question. You're comparing yourself to peers who seem more certain. Or you're entering a labor market that doesn't look like the one you were promised.
            </div>
            <div className="ch-card-btn">
              <span className="ch-card-btn-label">Begin</span>
              <span className="ch-card-btn-arrow">→</span>
            </div>
          </div>

          {/* Mid Career */}
          <div className="ch-card ch-card-mid" onClick={() => onSelect("mid")}>
            <div className="ch-card-tag" style={{color:"#00b4d8"}}>
              <div className="ch-card-tag-dot"/>
              Mid Career
            </div>
            <span className="ch-card-emoji">🧗</span>
            <div className="ch-card-title">Reading the Terrain</div>
            <div className="ch-card-desc">For people already on a path — evaluating whether it still fits, and how exposed they really are to a world that keeps shifting.</div>
            <div className="ch-card-who">
              <strong>This version is for you if…</strong>
              You're established in your career but feeling some friction. Maybe you're wondering if you're on the right path, questioning whether your plan still makes sense, or sensing that the ground beneath you is less stable than it looks.
            </div>
            <div className="ch-card-btn">
              <span className="ch-card-btn-label">Begin</span>
              <span className="ch-card-btn-arrow">→</span>
            </div>
          </div>
        </div>

        <div className="ch-footer">
          <em>Not sure which one? If you're under 28 or haven't been in the workforce more than 3–4 years, go early career.</em>
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// MID-CAREER QUIZ
// ═══════════════════════════════════════════════════════════════════════════════

const MID_SECTIONS = [
  { id:"path",     label:"Career Path",                 subtitle:"Ladders or Waves",    color:"#e76f51", questions:[1,2,3,4]    },
  { id:"identity", label:"Identity & Social Comparison",subtitle:"What Grounds You?",   color:"#f4a261", questions:[5,6,7]      },
  { id:"values",   label:"Values & Purpose",            subtitle:"Alignment",           color:"#52b788", questions:[8,9,10]     },
  { id:"growth",   label:"Career Growth",               subtitle:"Mindset & Agency",    color:"#00b4d8", questions:[11,12,13,14]},
];
const MID_QUESTIONS = {
  1:  { text:"I know what I want to do with my career and feel confident in the path forward." },
  2:  { text:"My career is on track and on pace." },
  3:  { text:"My confidence in my career plan is equal to or better than my peers." },
  4:  { text:"My profession is stable. What I do today and aspire to do tomorrow will not be changed or replaced by AI in the near future — think 5 to 10 years." },
  5:  { text:"I relish the cocktail-party 'what do you do?' question. I proudly identify with my profession." },
  6:  { text:"I have been able to avoid the 'I'll-be-happy-when' thinking. I have not attached my happiness, self-worth, or esteem to things like title or pay." },
  7:  { text:"I love it when other people share their accomplishments and promotions. I'm genuinely happy for them, and their success doesn't inspire negative self-talk in me." },
  8:  { text:"I love what I do. I get out of bed excited to go to work most Mondays." },
  9:  { text:"I invest time to consider my values and purpose. It's always a work in progress, but I can make life decisions based on who I am and who I want to be." },
  10: { text:"My work matters. I'm making a difference, and the work is closely aligned with my values and purpose." },
  11: { text:"The organization I work for does an excellent job with career-pathing. Where I'm going and how I get there is crystal clear." },
  12: { text:"I work in a place where mistakes are viewed as learning opportunities, and I feel emboldened to take risks with my career." },
  13: { text:"I feel appreciated at work and believe my accomplishments have earned me a level of stability and loyalty from my employer." },
  14: { text:"I make career decisions based on the opportunity to learn and grow, even if they aren't the next logical step on the ladder." },
};
function midComputeScores(a) {
  const q = id => Number(a[id]);
  const waveNav = ((10-q(1))+(10-q(2))+(10-q(3))+(10-q(4))+(10-q(11))+q(12)+q(14))/7;
  const internalAnchor = ((10-q(5))+q(6)+q(7)+q(8)+q(9)+q(10)+(10-q(13)))/7;
  const compassScore = (q(9)+q(12)+q(14))/3;
  const purposeScore = (q(8)+q(9)+q(10))/3;
  const stabilityRisk = q(4);
  const growthAgility = (q(12)+q(14)+(10-q(11))+(10-q(13)))/4;
  return { waveNav, internalAnchor, compassScore, purposeScore, stabilityRisk, growthAgility };
}
function midGetArchetypeKey({ waveNav, internalAnchor }) {
  const isWaves = waveNav >= 5, isInternal = internalAnchor >= 5;
  if (isWaves && isInternal)   return "consciousSurfer";
  if (!isWaves && isInternal)  return "groundedClimber";
  if (!isWaves && !isInternal) return "exposedClimber";
  return "drifter";
}
function midBuildReport(key, s) {
  const hC = s.compassScore>=6, hP = s.purposeScore>=6, hSR = s.stabilityRisk>=7;
  const r = {
    consciousSurfer:()=>{
      const o=`You've internalized what most people only discover after a painful fall or a sudden layoff. You're not rigidly attached to a single path. Your identity isn't hostage to your job title. You make decisions based on growth and learning — not just the next logical rung.`;
      const m= hP&&hC ? `What you have — and what's genuinely rare — is purposeful exploration. You're not lost; you're ranging. You have an internal compass AND the confidence to follow your curiosity wherever it leads. That combination is the engine behind the most interesting careers.`
        : hP&&!hC ? `You have strong values and purpose — you know what you stand for. The opportunity ahead is building more confidence in your ability to figure things out as you go. The surfer's insight: you don't get your balance back by thinking about it. You get it by paddling out.`
        : !hP&&hC ? `You're agile and confident — you figure things out, you take risks, you don't need the perfect plan. What's worth investing in now is the deeper 'why.' Agility pointed at something that matters to you is a superpower. Without that, it can quietly become drift.`
        : `Agility alone isn't enough. Not knowing what you want and not having a strong sense of where your curiosity leads is less like surfing and more like floating. Purposeful exploration requires a compass. That's the work right now.`;
      const c=`The surfer's edge isn't that they avoid wipeouts — it's that they pop back up knowing another wave is coming. Keep reading conditions. Keep leaning in.`;
      return [o,m,c].join("\n\n");
    },
    groundedClimber:()=>{
      const o=`You have real clarity about your path AND a grounded inner life — a genuinely powerful combination. You're not chasing a title for its own sake. Your confidence comes from somewhere real.`;
      const m= !hSR&&hP ? `Your certainty looks earned. You have purpose alignment, a realistic read on your professional landscape, and an internal anchor that doesn't depend on the next promotion to hold. The key question isn't whether to get off the ladder. It's whether you're climbing it for the right reasons.`
        : hSR&&hP ? `Your internal grounding is real — that's a genuine asset. The place to look carefully is your confidence about stability. Five years ago, 'Prompt Engineer' didn't exist. Today it's a six-figure job. Five years from now it might be a button on your dishwasher.`
        : !hSR&&!hP ? `Your path looks clear and your stability assumptions seem realistic — but purpose alignment is showing up lower than the rest of your profile. Clarity about where you're going and meaning in why you're going there are different things.`
        : `A couple of things worth stress-testing: your confidence about how stable your profession really is, and whether the drive you feel is coming from genuine purpose or from the momentum of a plan set in motion a while ago.`;
      const c=`The best climbers know when to look up from the next rung and read the conditions. The waves are real. The ladder climbers who thrive are the ones willing to adapt when the moment calls for it.`;
      return [o,m,c].join("\n\n");
    },
    exposedClimber:()=>{
      const o=`You have drive and direction — and the results probably show it. But there are places in your answers that suggest your career is doing some heavy lifting for your identity. The 'what do you do?' question lands a little too hard. The comparisons sting more than they should.`;
      const m= hSR&&!hP ? `This is the double-exposure version of this profile. The plan may be shakier than it feels — and your identity is riding on it. That's not a character flaw. It's the playbook we were all handed. When both the external conditions and the internal foundation are fragile, the unexpected hits hardest.`
        : hSR&&hP ? `You have something important going for you: real purpose alignment. The place to focus is the stability assumption — your profession may be more exposed to change than it currently feels, and detaching some of your identity from the plan will make you much more resilient.`
        : `The bigger issue here isn't the ladder; it's what happens to you if the ladder wobbles. When identity is closely tied to title and trajectory, even routine setbacks land with disproportionate force.`;
      const c=`The biggest risk isn't that you won't reach the top of the ladder. It's that you might — and discover it was leaning against the wrong wall. You are not your job. Your profession is one room in a much bigger house.`;
      return [o,m,c].join("\n\n");
    },
    drifter:()=>{
      const o=`You look like a surfer from the outside — you're not rigidly attached to a single path, and you make agile moves. But without a strong internal anchor, agility becomes drift. The difference between a surfer and someone being pushed around by the waves isn't the water they're in. It's whether they have a board and know how to use it.`;
      const m= hC&&!hP ? `You have real confidence in your ability to figure things out. That's the compass. What's missing is the destination — a clear enough sense of your values and purpose to point that confidence at something that genuinely matters to you.`
        : !hC&&hP ? `You have more purpose clarity than your career navigation score suggests. The gap is confidence and agency. Purposeful exploration requires the willingness to act before you feel ready.`
        : hC&&hP ? `You have both purpose alignment and confidence to figure things out. The issue may be less about capability and more about commitment. Purposeful exploration isn't just about being open to new waves. It's about fully committing to the ones you catch.`
        : `The honest thing to say: the figuring out hasn't really started yet. And naming it clearly is the first move. The ones who find their way aren't the ones with the clearest plan. They're the ones who stayed curious and committed to the next wave in front of them.`;
      const c=`The good news: you already have the agility. Most people spend years trying to unlearn the rigidity of the ladder. You just need to aim that agility at something that actually matters to you — and then commit.`;
      return [o,m,c].join("\n\n");
    },
  };
  return r[key]?.() ?? "";
}
const MID_ARCHETYPE_META = {
  consciousSurfer:{ quad:"tr", name:"The Conscious Surfer",  emoji:"🏄", tagline:"Purposeful exploration. You're not lost — you're ranging.", color:"#00b4d8", bg:"linear-gradient(135deg,#00b4d812 0%,#0a1628 70%)",
    nextWave:(s)=>{ const t=["You're playing the right game. The next question: what's my next experiment?"]; if(s.purposeScore<6)t.push("Invest in the 'why.' Agility without purpose is a fast car with no destination."); else t.push("Find people earlier in the journey and share what you've figured out. Teaching it cements it."); if(s.compassScore<6)t.push("You don't need more clarity before you move. Act your way into a new way of thinking."); else t.push("Keep taking the assignments that scare you a little. That's where the learning is."); return t; }},
  groundedClimber:{ quad:"tl", name:"The Grounded Climber",  emoji:"🧗", tagline:"Clear direction. Strong core. One eye on the horizon.",   color:"#52b788", bg:"linear-gradient(135deg,#52b78812 0%,#0a1628 70%)",
    nextWave:(s)=>{ const t=[]; if(s.stabilityRisk>=7)t.push("Stress-test your stability assumptions before the market does it for you. Which parts of your profession are genuinely durable?"); else t.push("Your ladder may be the right one. Keep asking whether you're climbing it for the right reasons."); if(s.purposeScore<6)t.push("Clarity about where you're going and meaning in why you're going there are different things. Spend time on the second one."); else t.push("Your strong internal foundation is an asset. Use it to take bigger bets, not just safer ones."); t.push("Practice 'sense and respond' — hold your plan loosely and stay curious about what's shifting around you."); return t; }},
  exposedClimber: { quad:"bl", name:"The Exposed Climber",   emoji:"⚠️", tagline:"Ambitious. Capable. And more exposed than you realize.",  color:"#e63946", bg:"linear-gradient(135deg,#e6394612 0%,#0a1628 70%)",
    nextWave:(s)=>{ const t=["Notice the 'I'll-be-happy-when' thinking when it shows up. Name it out loud — it loses power when you can see it clearly."]; if(s.stabilityRisk>=7)t.push("Ask hard questions about how stable your profession really is. Don't let certainty about the plan become a reason not to look up."); t.push("Your identity is a house with many rooms. Spend intentional time in the ones that have nothing to do with your job title."); return t; }},
  drifter:        { quad:"br", name:"The Drifter",            emoji:"🌬️", tagline:"Agile on the outside. Looking for a compass on the inside.", color:"#f4a261", bg:"linear-gradient(135deg,#f4a26112 0%,#0a1628 70%)",
    nextWave:(s)=>{ const t=[]; if(s.purposeScore<6)t.push("Start with values, not goals. Who do you want to be? That question will outlast any five-year plan."); else t.push("You have more values clarity than your current trajectory reflects. Start acting from it."); if(s.compassScore<6)t.push("Don't wait for the perfect wave. Commit to the next interesting thing in front of you and go all in."); else t.push("Your ability to figure things out is real. Point it at something that genuinely matters to you."); t.push("Remember: the joy isn't in having it figured out. It's in the figuring out — but only if you're actually exploring toward something."); return t; }},
};
function midGetBlindSpots(answers) {
  const q=id=>Number(answers[id]); const s=[];
  if(q(4)>=7)  s.push({qId:4,  score:q(4),  note:"Five years ago, 'Prompt Engineer' didn't exist. Today it's a six-figure job. Five years from now, it might be a button on your dishwasher. Note: if your profession genuinely isn't exposed to these forces, your certainty here may be well-founded. But it's worth testing the assumption rather than just holding it."});
  if(q(13)>=7) s.push({qId:13, score:q(13), note:"Feeling appreciated is real and valid. But believing your past accomplishments have 'earned' loyalty is the Lachesis Trap in a corporate suit. Employer loyalty is rarer and more fragile than it feels from the inside."});
  if(q(5)>=8&&q(6)<=4) s.push({qId:5, score:q(5), note:"Strong professional identity paired with low happiness-independence is the most common fragile foundation we see. You are not your job. Your profession is one room in a much bigger house."});
  if(q(3)>=8&&q(4)>=7) s.push({qId:3, score:q(3), note:"Confidence benchmarked against peers can feel reassuring — but if everyone around you is climbing the same ladder, that's not validation. That's just a crowd."});
  return s;
}
function midNavInsight({waveNav,compassScore,purposeScore,stabilityRisk}) {
  const iW=waveNav>=5,hC=compassScore>=6,hP=purposeScore>=6,hS=stabilityRisk>=7;
  if(iW){ if(hP&&hC)return"Purposeful exploration — the healthy version. You have a compass and the confidence to follow it."; if(hP&&!hC)return"Values clarity is there. Build the confidence to act on it before everything feels perfectly aligned."; if(!hP&&hC)return"Agile and confident. The investment worth making: the deeper 'why.' Agility aimed at something meaningful is a superpower."; return"Open and unattached — the right starting point. The work now: building the tools to navigate."; }
  else { if(!hS&&hP)return"Your certainty looks considered. Keep asking whether you're climbing for the right reasons."; if(hS)return"Strong direction, but worth stress-testing the stability assumption honestly."; if(!hP)return"Clear direction, but purpose alignment is lower. Where you're going and why you're going there are different questions."; return"A clear plan is an asset — as long as you keep asking whether it fits who you're becoming."; }
}

const midCss = `
${FONT}
.app-mid{font-family:'DM Sans',sans-serif;background:#0a1628;min-height:100vh;color:#fff;}
.quiz-m{max-width:660px;margin:0 auto;padding:40px 24px 80px;min-height:100vh;}
.prog-wrap-m{margin-bottom:44px;}
.prog-meta-m{display:flex;justify-content:space-between;font-size:10px;color:#7a9ab0;margin-bottom:10px;letter-spacing:2px;text-transform:uppercase;}
.prog-bar-m{height:1px;background:#1e3248;}
.prog-fill-m{height:100%;background:#00b4d8;transition:width .5s ease;}
.sec-head-m{margin-bottom:40px;padding-bottom:26px;border-bottom:1px solid #1e3248;}
.sec-tag-m{font-size:10px;letter-spacing:4px;text-transform:uppercase;margin-bottom:8px;font-weight:500;}
.sec-title-lrg-m{font-family:'Playfair Display',serif;font-size:28px;line-height:1.2;color:#ffffff;}
.q-card-m{background:#101e30;border-radius:4px;padding:26px 26px 22px;margin-bottom:14px;border:1px solid #1e3248;transition:border-color .2s;}
.q-card-m:focus-within{border-color:#00b4d840;}
.q-num-m{font-size:10px;color:#7a9ab0;letter-spacing:3px;text-transform:uppercase;margin-bottom:11px;}
.q-text-m{font-size:15px;line-height:1.72;color:#d8eaf8;font-weight:300;margin-bottom:26px;}
.likert-m{display:flex;gap:6px;margin-top:6px;}
.likert-opt-m{flex:1;position:relative;}
.likert-opt-m input[type=radio]{position:absolute;opacity:0;pointer-events:none;width:0;height:0;}
.likert-opt-m label{display:block;padding:12px 4px 10px;border:1px solid #2a4060;border-radius:4px;cursor:pointer;font-size:11px;line-height:1.4;text-align:center;color:#8aaac0;background:#0c1828;transition:border-color .2s,background .2s,color .2s;user-select:none;}
.likert-opt-m input:checked+label{background:#003a50;border-color:#00b4d8;color:#ffffff;font-weight:500;}
.likert-opt-m label:hover{border-color:#00b4d870;color:#b0d0e4;background:#0f2038;}
.q-unanswered-m{border-color:#e6394650!important;}
.section-error-m{color:#e07878;font-size:12px;text-align:right;margin-top:8px;letter-spacing:.3px;}
@media(max-width:480px){.likert-opt-m label{font-size:9.5px;padding:10px 2px 8px;}}
.q-nav-m{display:flex;gap:10px;justify-content:flex-end;margin-top:40px;}
.btn-nav-m{padding:12px 30px;font-size:12px;font-family:'DM Sans',sans-serif;font-weight:500;border-radius:2px;cursor:pointer;transition:all .2s;letter-spacing:1.5px;text-transform:uppercase;}
.btn-back-m{background:transparent;color:#7a9ab0;border:1px solid #2a4060;}
.btn-back-m:hover{color:#8aaac0;border-color:#203040;}
.btn-fwd-m{background:#00b4d8;color:#0a1628;border:none;}
.btn-fwd-m:hover{background:#48cae4;transform:translateY(-1px);}
.results-m{max-width:740px;margin:0 auto;padding:48px 24px 80px;}
.r-eyebrow-m{font-size:10px;letter-spacing:5px;text-transform:uppercase;color:#00b4d8;text-align:center;margin-bottom:44px;}
.divider-m{height:1px;background:#1e3248;margin:48px 0;}
.sec-title-sm-m{font-family:'Playfair Display',serif;font-size:22px;margin-bottom:7px;color:#ffffff;}
.sec-sub-m{font-size:13px;color:#8aaac0;margin-bottom:24px;line-height:1.7;}
.arch-card-m{border-radius:6px;padding:40px;border:1px solid #1e3248;}
.arch-emoji-m{font-size:46px;margin-bottom:18px;display:block;}
.arch-name-m{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,46px);line-height:1.05;margin-bottom:7px;}
.arch-tagline-m{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;opacity:.8;margin-bottom:22px;}
.arch-desc-m{font-size:15px;line-height:1.9;color:#d0e6f8;font-weight:300;white-space:pre-line;}
.matrix-wrap-m{margin-top:36px;}
.matrix-label-top-m{text-align:center;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8fb4cc;margin-bottom:10px;}
.matrix-row-m{display:flex;align-items:stretch;}
.matrix-y-label-m{writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8fb4cc;padding:0 10px;white-space:nowrap;display:flex;align-items:center;}
.matrix-col-m{flex:1;display:flex;flex-direction:column;}
.matrix-grid-m{position:relative;width:100%;aspect-ratio:1;border:1px solid #2a4060;border-radius:4px;overflow:hidden;}
.quad-m{position:absolute;width:50%;height:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:opacity .4s;}
.quad-tl-m{top:0;left:0;border-right:1px solid #2a4a38;border-bottom:1px solid #2a4a38;background:#1a3828;}
.quad-tr-m{top:0;right:0;border-bottom:1px solid #1a4050;background:#0d2e40;}
.quad-bl-m{bottom:0;left:0;border-right:1px solid #4a1820;background:#2e1018;}
.quad-br-m{bottom:0;right:0;background:#2e1e08;}
.quad-emoji-m{font-size:clamp(16px,2.8vw,26px);}
.quad-name-m{font-size:clamp(8px,1.3vw,11px);letter-spacing:1px;text-transform:uppercase;text-align:center;padding:0 6px;font-weight:600;line-height:1.3;}
.quad-m.active-m{opacity:1;}
.quad-m.inactive-m{opacity:.45;}
.matrix-dot-m{position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;border:2.5px solid #0a1628;box-shadow:0 0 0 2.5px #fff,0 0 18px #fffa;transform:translate(-50%,-50%);transition:left .9s cubic-bezier(.34,1.56,.64,1),top .9s cubic-bezier(.34,1.56,.64,1);z-index:10;pointer-events:none;}
.matrix-axis-x-m{display:flex;justify-content:space-between;font-size:10px;color:#8fb4cc;letter-spacing:1.5px;text-transform:uppercase;margin-top:8px;}
.matrix-spacer-m{width:38px;}
.dim-grid-m{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
@media(max-width:520px){.dim-grid-m{grid-template-columns:1fr;}}
.dim-card-m{background:#101e30;border-radius:4px;padding:22px;border:1px solid #1e3248;}
.dim-name-m{font-size:10px;letter-spacing:3px;text-transform:uppercase;margin-bottom:3px;font-weight:500;}
.dim-sub-m{font-size:11px;color:#7a9ab0;margin-bottom:16px;}
.dim-bar-bg-m{height:2px;background:#1e3248;border-radius:2px;margin-bottom:9px;}
.dim-bar-fill-m{height:100%;border-radius:2px;}
.dim-score-m{font-family:'Playfair Display',serif;font-size:30px;font-weight:700;line-height:1;}
.dim-score-m span{font-size:12px;color:#7a9ab0;font-family:'DM Sans',sans-serif;font-weight:300;}
.dim-insight-m{font-size:12px;color:#8fb4cc;line-height:1.68;margin-top:9px;padding-top:9px;border-top:1px solid #1e3248;}
.bs-intro-m{font-size:14px;color:#8fb4cc;margin-bottom:18px;line-height:1.75;}
.bs-card-m{background:#1e0e18;border:1px solid #e6394650;border-radius:4px;padding:22px;margin-bottom:11px;}
.bs-label-m{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#e63946;margin-bottom:9px;}
.bs-q-m{font-size:13px;color:#c0d4e4;margin-bottom:9px;line-height:1.6;font-style:italic;}
.bs-note-m{font-size:12px;color:#c08890;line-height:1.65;}
.no-bs-m{background:#0b2018;border:1px solid #52b78850;border-radius:4px;padding:18px 22px;font-size:14px;color:#72d7a8;line-height:1.65;}
.nw-card-m{background:#101e30;border-radius:4px;padding:34px;border:1px solid #1e3248;}
.nw-intro-m{font-size:14px;color:#8fb4cc;line-height:1.78;margin-bottom:22px;}
.nw-item-m{display:flex;gap:14px;align-items:flex-start;margin-bottom:15px;}
.nw-dot-m{width:5px;height:5px;border-radius:50%;background:#00b4d8;margin-top:8px;flex-shrink:0;}
.nw-text-m{font-size:14px;color:#b8d0e4;line-height:1.72;}
.retake-m{display:block;margin:48px auto 0;background:transparent;color:#7a9ab0;border:1px solid #2a4060;padding:11px 34px;font-size:11px;font-family:'DM Sans',sans-serif;border-radius:2px;cursor:pointer;letter-spacing:2px;text-transform:uppercase;transition:all .2s;}
.retake-m:hover{color:#9ab8cc;border-color:#2e4a60;}
.back-link{display:flex;align-items:center;gap:8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7a9ab0;cursor:pointer;transition:color .2s;margin-bottom:32px;}
.back-link:hover{color:#9ab8cc;}
`;

function MidMatrix({ waveNav, internalAnchor, archetypeKey }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 120); return () => clearTimeout(t); }, []);
  const quads = [
    { cls:"quad-tl-m", key:"groundedClimber", emoji:"🧗", name:"Grounded\nClimber",  color:"#52b788" },
    { cls:"quad-tr-m", key:"consciousSurfer", emoji:"🏄", name:"Conscious\nSurfer",  color:"#00b4d8" },
    { cls:"quad-bl-m", key:"exposedClimber",  emoji:"⚠️", name:"Exposed\nClimber",   color:"#e63946" },
    { cls:"quad-br-m", key:"drifter",         emoji:"🌬️", name:"The\nDrifter",       color:"#f4a261" },
  ];
  return (
    <div className="matrix-wrap-m">
      <div className="matrix-label-top-m">↑ Internally Anchored</div>
      <div className="matrix-row-m">
        <div className="matrix-y-label-m">Externally Anchored ↓</div>
        <div className="matrix-col-m">
          <div className="matrix-grid-m">
            {quads.map(q => (
              <div key={q.key} className={`quad-m ${q.cls} ${archetypeKey===q.key?"active-m":"inactive-m"}`}>
                <div className="quad-emoji-m">{q.emoji}</div>
                <div className="quad-name-m" style={{color:q.color}}>{q.name}</div>
              </div>
            ))}
            {ready && <div className="matrix-dot-m" style={{left:`${(waveNav/10)*100}%`,top:`${((10-internalAnchor)/10)*100}%`}}/>}
          </div>
          <div className="matrix-axis-x-m"><span>← Ladder</span><span>Waves →</span></div>
        </div>
        <div className="matrix-spacer-m"/>
      </div>
    </div>
  );
}

function MidQuiz({ onBack }) {
  const [section, setSection] = useState(0);
  const [screen,  setScreen]  = useState("quiz");
  const [answers, setAnswers] = useState(Object.fromEntries(Object.keys(MID_QUESTIONS).map(k=>[k,null])));
  const [emailSkipped, setEmailSkipped] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const scores        = useMemo(()=>midComputeScores(answers),[answers]);
  const archetypeKey  = useMemo(()=>midGetArchetypeKey(scores),[scores]);
  const archetypeMeta = MID_ARCHETYPE_META[archetypeKey];
  const archetypeDesc = useMemo(()=>midBuildReport(archetypeKey,scores),[archetypeKey,scores]);
  const nextWaveTips  = useMemo(()=>archetypeMeta.nextWave(scores),[archetypeKey,scores]);
  const blindspots    = useMemo(()=>midGetBlindSpots(answers),[answers]);
  const setAnswer     = (id,v)=>setAnswers(p=>({...p,[id]:v}));
  const reset         = ()=>{ setSection(0); setScreen("quiz"); setEmailSkipped(false); setAttempted(false); setAnswers(Object.fromEntries(Object.keys(MID_QUESTIONS).map(k=>[k,null]))); };
  const dimData = [
    {id:"nav",    label:"Career Navigation", sub:"Ladder ← → Waves",              score:scores.waveNav,        color:"#00b4d8", insight:midNavInsight(scores)},
    {id:"anchor", label:"Identity Anchor",   sub:"External ← → Internal",         score:scores.internalAnchor, color:"#52b788", insight:scores.internalAnchor>=7?"Well-anchored — your sense of self doesn't depend on what's in your email signature.":scores.internalAnchor>=4?"Partially grounded. The 'what do you do?' question still has some power over you.":"Your identity feels closely tied to your profession — the most common and most fragile foundation."},
    {id:"purpose",label:"Values & Purpose",  sub:"Alignment & Meaning",            score:scores.purposeScore,   color:"#e76f51", insight:scores.purposeScore>=7?"Strong purpose alignment — this is what holds when the plan fails or the market shifts.":scores.purposeScore>=4?"Some alignment, but gaps worth exploring. The key question: not 'what do I want to do' but 'who do I want to be?'":"Purpose alignment is the most important signal on this assessment. This deserves real attention."},
    {id:"compass",label:"Compass Score",     sub:"Curiosity · Resilience · Agency",score:scores.compassScore,   color:"#f4a261", insight:scores.compassScore>=7?"Strong signal — values investment, risk-taking, growth-first decisions. The most durable career skill there is.":scores.compassScore>=4?"Moderate compass signal. The ingredients for purposeful exploration are present, but not all firing together yet.":"Low compass signal. This is the combination that separates purposeful exploration from aimless drift."},
  ];

  if (screen === "quiz") {
    const sec    = MID_SECTIONS[section];
    const isLast = section === MID_SECTIONS.length - 1;
    return (
      <div className="app-mid"><style>{midCss}</style>
        <div className="quiz-m">
          <div className="back-link" onClick={onBack}>← Retake Assessment</div>
          <div className="prog-wrap-m">
            <div className="prog-meta-m"><span>{sec.label}</span><span>Part {section+1} of {MID_SECTIONS.length}</span></div>
            <div className="prog-bar-m"><div className="prog-fill-m" style={{width:`${((section+1)/MID_SECTIONS.length)*100}%`}}/></div>
          </div>
          <div className="sec-head-m">
            <div className="sec-tag-m" style={{color:sec.color}}>{sec.subtitle}</div>
            <h2 className="sec-title-lrg-m">{sec.label}</h2>
          </div>
          {sec.questions.map(id=>(
            <div key={id} className={`q-card-m${attempted && answers[id]===null ? " q-unanswered-m" : ""}`}>
              <div className="q-num-m">Question {id}</div>
              <div className="q-text-m">{MID_QUESTIONS[id].text}</div>
              <div className="likert-m">
                {LIKERT_OPTIONS.map(opt=>(
                  <div key={opt.value} className="likert-opt-m">
                    <input type="radio" id={`m-q${id}-v${opt.value}`} name={`m-q${id}`} checked={answers[id]===opt.value} onChange={()=>setAnswer(id,opt.value)}/>
                    <label htmlFor={`m-q${id}-v${opt.value}`}>{opt.label}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {attempted && sec.questions.some(id=>answers[id]===null) && (
            <p className="section-error-m">Please answer all questions before continuing.</p>
          )}
          <div className="q-nav-m">
            {section>0&&<button className="btn-nav-m btn-back-m" onClick={()=>{setAttempted(false);setSection(s=>s-1);}}>← Back</button>}
            {!isLast
              ?<button className="btn-nav-m btn-fwd-m" onClick={()=>{if(sec.questions.some(id=>answers[id]===null)){setAttempted(true);return;}setAttempted(false);setSection(s=>s+1);}}>Continue →</button>
              :<button className="btn-nav-m btn-fwd-m" onClick={()=>{if(sec.questions.some(id=>answers[id]===null)){setAttempted(true);return;}setScreen("results");}}>See My Report →</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-mid"><style>{midCss}</style>
      <div className="results-m">
        <div className="back-link" onClick={onBack}>← Retake Assessment</div>
        <div className="r-eyebrow-m">Your Career Report</div>
        <div className="arch-card-m" style={{background:archetypeMeta.bg}}>
          <span className="arch-emoji-m">{archetypeMeta.emoji}</span>
          <h2 className="arch-name-m" style={{color:archetypeMeta.color}}>{archetypeMeta.name}</h2>
          <div className="arch-tagline-m" style={{color:archetypeMeta.color}}>{archetypeMeta.tagline}</div>
          <p className="arch-desc-m">{archetypeDesc}</p>
          <MidMatrix waveNav={scores.waveNav} internalAnchor={scores.internalAnchor} archetypeKey={archetypeKey}/>
        </div>
        <div className="divider-m"/>
        <div className="sec-title-sm-m">Your Four Dimensions</div>
        <div className="sec-sub-m">The same score can mean very different things depending on the combination.</div>
        <div className="dim-grid-m">
          {dimData.map(d=>(
            <div key={d.id} className="dim-card-m">
              <div className="dim-name-m" style={{color:d.color}}>{d.label}</div>
              <div className="dim-sub-m">{d.sub}</div>
              <div className="dim-bar-bg-m"><div className="dim-bar-fill-m" style={{width:`${(d.score/10)*100}%`,background:d.color}}/></div>
              <div className="dim-score-m" style={{color:d.color}}>{d.score.toFixed(1)}<span> / 10</span></div>
              <div className="dim-insight-m">{d.insight}</div>
            </div>
          ))}
        </div>
        <div className="divider-m"/>
        <div className="sec-title-sm-m">The Blind Spot Check</div>
        <div className="bs-intro-m">Some high scores here are good news. Others are the Lachesis Trap dressed up as confidence.</div>
        {blindspots.length===0?<div className="no-bs-m">✓ No major blind spots flagged. Your answers suggest a realistic, clear-eyed read on your situation.</div>
          :blindspots.map(({qId,score,note})=>(
            <div key={qId} className="bs-card-m">
              <div className="bs-label-m">You scored {score}/10 · Question {qId}</div>
              <div className="bs-q-m">"{MID_QUESTIONS[qId].text}"</div>
              <div className="bs-note-m">⚠ {note}</div>
            </div>
          ))}

        {!emailSkipped && (
          <EmailCapture
            archetype={archetypeMeta.name}
            onSkip={() => setEmailSkipped(true)}
          />
        )}

        <div className="divider-m"/>
        <div className="sec-title-sm-m">Your Next Wave</div>
        <div className="sec-sub-m">Not thinking exercises — doing exercises. Specific to your score combination.</div>
        <div className="nw-card-m">
          <div className="nw-intro-m">Three places worth putting your attention, based on where you actually landed.</div>
          {nextWaveTips.map((tip,i)=>(
            <div key={i} className="nw-item-m"><div className="nw-dot-m"/><div className="nw-text-m">{tip}</div></div>
          ))}
        </div>
        <button className="retake-m" onClick={reset}>Retake Assessment</button>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// EARLY-CAREER QUIZ
// ═══════════════════════════════════════════════════════════════════════════════

const EARLY_SECTIONS = [
  { id:"identity", label:"Identity & Social Comparison", subtitle:"What Grounds You?", color:"#f4a261", questions:[5,6,7]     },
  { id:"path",     label:"Career Path",                  subtitle:"Ladders or Waves",  color:"#e76f51", questions:[1,2,3,4]   },
  { id:"values",   label:"Values & Purpose",             subtitle:"Your Compass",      color:"#52b788", questions:[8,9,10]    },
  { id:"growth",   label:"Mindset & Agency",             subtitle:"How You Move",      color:"#00b4d8", questions:[11,12,13,14]},
];
const EARLY_QUESTIONS = {
  1:  { text:"I have a clear sense of what I want to do with my career and feel confident about the direction I'm heading." },
  2:  { text:"When I look at my peers, it seems like they have a clearer sense of direction than I do. I feel behind." },
  3:  { text:"I feel confident that the path and skills I'm pursuing won't be significantly disrupted by AI or technology in the next 5–10 years." },
  4:  { text:"When I make choices about my future — courses, internships, opportunities — I prioritize learning and curiosity over what looks best on a resume or makes others proud." },
  5:  { text:"When someone asks 'what's your major?' or 'what are you going to do with that?', I have a confident, comfortable answer. I don't dread the question." },
  6:  { text:"My career thinking is primarily driven by what genuinely excites me — not by what my parents, advisor, or peers expect of me." },
  7:  { text:"When friends announce internships, acceptances, or job offers, I'm genuinely happy for them. Their wins don't make me feel worse about where I am." },
  8:  { text:"I follow my curiosity. When something genuinely interests me, I pursue it — even when I can't immediately see where it leads professionally." },
  9:  { text:"I invest time thinking about my values — what I stand for, what kind of person I want to be. I may not have it all figured out, but I'm actively working on it." },
  10: { text:"I'm willing to take an internship, job, or opportunity that doesn't make obvious sense on paper — just to find out if it fits. I'd rather try and learn than stay safe and wonder." },
  11: { text:"I know what I'm passionate about and believe I can build a career around it." },
  12: { text:"I believe that being wrong about a direction — choosing a path and discovering it's not for me — is a useful outcome, not a failure." },
  13: { text:"I feel significant pressure — from family, school, or my own expectations — to have my career figured out by a specific age or stage." },
  14: { text:"I know what I'm good at — not just in terms of skills, but the kind of problems I like to solve and the environments where I do my best work." },
};
function earlyComputeScores(a) {
  const q=id=>Number(a[id]);
  const waveNav=((10-q(1))+q(4)+(10-q(5))*.5+q(8)+q(10)+q(12))/5.5;
  const internalAnchor=((10-q(2))+q(6)+q(7)+q(9)+(10-q(13)))/5;
  const compassScore=(q(8)+q(12)+q(4))/3;
  const purposeScore=(q(9)+q(14)+q(6))/3;
  const stabilityRisk=q(3);
  const passionClarity=q(11);
  return { waveNav, internalAnchor, compassScore, purposeScore, stabilityRisk, passionClarity };
}
function earlyGetArchetypeKey({waveNav,internalAnchor}) {
  const iW=waveNav>=5,iI=internalAnchor>=5;
  if(iW&&iI)   return"consciousSurfer";
  if(!iW&&iI)  return"groundedClimber";
  if(!iW&&!iI) return"exposedClimber";
  return"drifter";
}
function earlyBuildReport(key,s) {
  const hC=s.compassScore>=6,hP=s.purposeScore>=6,hSR=s.stabilityRisk>=7,hPas=s.passionClarity>=7;
  const pr={
    consciousSurfer:"First, take a breath. Whatever you were expecting this to say — you're not behind. You're not broken. And you don't owe anyone a five-year plan.",
    groundedClimber:"First, take a breath. Whatever pressure brought you here — to figure it out, to get it right, to not fall behind — you can set it down for a minute. This isn't a verdict. It's a starting point.",
    exposedClimber: "First, take a breath. If you're feeling the weight of everyone's expectations right now — your family's, your school's, your own — that's real, and it makes sense. You're not alone in that. This isn't here to add to that weight.",
    drifter:        "First, take a breath. Not knowing what you want is not the same as being lost. Most people who look like they have it figured out are just better at performing certainty. You're in good company — and you're asking the right questions by being here.",
  };
  const r={
    consciousSurfer:()=>{
      const o=pr.consciousSurfer;
      const m=hP&&hC?"What your answers show is something genuinely rare at this stage: purposeful exploration. You're not adrift — you're ranging. You have a real internal compass and the confidence to follow it before you can see where it leads. That combination is the engine behind the most interesting careers. Most people spend years trying to find it. You're already operating from it.\n\nThe world is going to keep telling you that you need a cleaner answer to 'what do you want to do.' You don't. Not yet. What you need is the next interesting wave — and the willingness to paddle toward it."
        :hP&&!hC?"You have something important: real values clarity. You know what you stand for, even if you can't always articulate what you want to do. What's worth building now is the confidence to act on it before conditions feel perfect.\n\nHere's what the research and real-world stories both say: you don't think your way into a new direction. You act your way in. The next experiment doesn't have to be the right one — it just has to be the next one."
        :!hP&&hC?"You're agile and willing — you follow curiosity, you'd rather try and learn than stay safe and wonder, and you don't treat wrong turns as failures. That's an enormous head start.\n\nThe investment worth making alongside that agility is the deeper 'why.' Not what you want to do — who you want to be. Agility pointed at something that genuinely matters to you is a superpower."
        :"You're open and unattached — not locked into a path that doesn't fit, not performing certainty you don't feel. That's actually the right starting point, even when it doesn't feel that way.\n\nThe next move is less about finding the right direction and more about building the tools to navigate — values work, curiosity-following, and the willingness to treat every experiment as information rather than judgment.";
      const c="The surfer's advantage isn't that they know which wave is coming. It's that they've learned to read conditions, stay on their board, and pop back up. You're learning that now. That's the whole game.";
      return[o,m,c].join("\n\n");
    },
    groundedClimber:()=>{
      const o=pr.groundedClimber;
      const m=!hSR&&hP&&hPas?"Your answers suggest something worth pausing on: the clarity you feel may be genuinely earned. You know what you want, you've done the values work, and you're not just performing certainty to satisfy someone else's timeline. Not everyone who 'has a plan' is in the Lachesis Trap. Some people actually know.\n\nThe question worth staying curious about: is this direction something you chose, or something that was chosen for you and you've made peace with? They can feel identical from the inside."
        :hSR?"You have direction and internal grounding — a solid foundation. The one place to look carefully: your confidence about how stable your chosen path is in a world being reshaped by AI. Some paths genuinely are durable. Others feel more stable than they are.\n\nThis isn't an argument to abandon the plan. It's an argument to hold it a little more loosely."
        :!hP?"You have clarity about direction, which is more than most people at this stage can honestly claim. The thing worth sitting with: clarity about where you're going and meaning in why you're going there are different things. The ladder can be real and still be leaning against the wrong wall."
        :"Direction and internal grounding together are a genuinely powerful combination at any stage — but especially this one. Most people your age are still trying to untangle their own expectations from everyone else's. You're further along than you might realize.";
      const c="The waves are real — that's not an argument against having a direction. It's an argument for staying awake while you move in it.";
      return[o,m,c].join("\n\n");
    },
    exposedClimber:()=>{
      const o=pr.exposedClimber;
      const m=hPas&&!hP?"Your answers show a lot of certainty about direction — and a real investment in that direction being the right one. That drive is not a problem. But when identity gets closely tied to a specific path at this stage — before you've had much data — the unexpected hits harder than it needs to. A rejection, a pivot, a market shift. These become existential rather than informational."
        :hSR?"You have a plan and you're committed to it — and some of that commitment may be well-founded. But your answers suggest high confidence that your chosen path won't be significantly disrupted by AI or technology. That's worth stress-testing, gently and honestly."
        :"What your answers show is a combination that's very common — and worth understanding. A clear plan. Identity riding on the plan. And some of that plan depending on external conditions staying stable.\n\nNone of that is a character flaw. It's the playbook an entire generation was handed. The problem is that playbook was written for a more stable world than the one you're entering.";
      const c="You are not your major. You are not your offer letter. Your profession is one room in a much bigger house — and you have time to furnish the whole thing.";
      return[o,m,c].join("\n\n");
    },
    drifter:()=>{
      const o=pr.drifter;
      const m=hC&&!hP?"Here's what your answers actually show: you're agile, you're willing to experiment, and you don't treat uncertainty as failure. Those are real strengths.\n\nWhat's worth building alongside that is a clearer sense of what you're exploring toward. Not a destination — a direction. Not a five-year plan — a set of values and curiosities that help you decide which waves are worth paddling toward."
        :!hC&&hP?"Your answers show more values clarity than your current trajectory might suggest. You know what matters to you — you just haven't fully acted from it yet. Maybe you're waiting for permission. Maybe you're waiting for conditions to be right.\n\nHere's the thing: that signal rarely arrives. Purposeful exploration starts before you feel ready."
        :hC&&hP?"This is an interesting profile — you have real purpose clarity and genuine confidence to figure things out, but something is keeping you from acting on it. Sometimes the issue isn't capability or direction. It's commitment."
        :"Here's the most honest thing this assessment can say to you: the figuring out hasn't really started yet — and that is completely okay. You're not behind. You're at the beginning.\n\nMost people who seem certain at your age are performing certainty they don't feel. The ones who find their way aren't the ones with the clearest plans. They're the ones who stayed curious, said yes to the next interesting thing, and were willing to be wrong about it.";
      const c="The good news — and this is real — is that you don't have to unlearn anything yet. You're at the start. The question isn't 'what should I do with my life.' It's 'what am I curious about right now, and what would happen if I followed it?'";
      return[o,m,c].join("\n\n");
    },
  };
  return r[key]?.()??""
}
const EARLY_ARCHETYPE_META = {
  consciousSurfer:{ quad:"tr", name:"The Conscious Surfer",    emoji:"🏄", tagline:"Not lost. Ranging.",                       color:"#00b4d8", bg:"linear-gradient(135deg,#00b4d812 0%,#0d1a2e 70%)",
    nextWave:(s)=>{ const t=[]; if(s.purposeScore<6)t.push("Spend real time on the 'who' question — not what you want to do, but what you value and how you want to move through the world. That's the compass."); else t.push("You have the compass. Now follow it somewhere specific. Pick one thing you're curious about and go further into it than feels comfortable."); if(s.compassScore<6)t.push("Act before you feel ready. You don't think your way into a new direction — you act your way in."); else t.push("Find one person doing something that genuinely interests you and ask them how they got there. Not for a roadmap — for permission to follow a stranger path."); t.push("When the 'what are you going to do with that?' question comes — try answering with 'I'm not sure yet, but I'm following what I find interesting.' Say it enough times and it stops feeling like a confession."); return t; }},
  groundedClimber:{ quad:"tl", name:"The Grounded Climber",    emoji:"🧗", tagline:"Clear direction. Strong core. Stay curious.",color:"#52b788", bg:"linear-gradient(135deg,#52b78812 0%,#0d1a2e 70%)",
    nextWave:(s)=>{ const t=[]; if(s.stabilityRisk>=7)t.push("Do an honest audit of your path's durability. What parts of what you're building are genuinely durable? What parts depend on conditions staying stable?"); else t.push("Your direction looks well-founded. Keep asking whether you're on this path because you chose it or because it chose you."); if(s.purposeScore<6)t.push("Spend some time on the 'why' underneath the 'what.' Clarity about where you're going and meaning in why you're going there are different things."); else t.push("You have both direction and grounding. Now take a bigger risk than feels necessary. The internal foundation you've built is exactly what makes that safe."); return t; }},
  exposedClimber: { quad:"bl", name:"The Exposed Climber",     emoji:"⚠️", tagline:"Driven. Capable. Worth a closer look.",    color:"#e63946", bg:"linear-gradient(135deg,#e6394612 0%,#0d1a2e 70%)",
    nextWave:(s)=>{ const t=["Notice what happens emotionally when someone asks about your plans and you don't have a clean answer. That reaction is data — it tells you where your identity is living right now."]; if(s.stabilityRisk>=7)t.push("Ask hard questions about how stable your path really is — not to create anxiety, but to make sure your plan is built on honest ground."); t.push("Start building the other rooms. Your identity is a house with many rooms, and right now you might be putting everything into one."); return t; }},
  drifter:        { quad:"br", name:"The Purposeful Explorer", emoji:"🌊", tagline:"At the beginning. That's a fine place to be.", color:"#f4a261", bg:"linear-gradient(135deg,#f4a26112 0%,#0d1a2e 70%)",
    nextWave:(s)=>{ const t=[]; if(s.purposeScore<6)t.push("Start with values, not career options. Write down three moments when you felt most like yourself. What do they have in common? That's your first data point."); else t.push("You have more direction than you're currently acting on. Pick one thing your values point toward and take one concrete step this week."); if(s.compassScore<6)t.push("Say yes to something that doesn't make obvious sense on paper. An internship, a project, a conversation. Treat it as an experiment, not a commitment."); else t.push("Your instincts are good — you just need to trust them enough to act. What's the most interesting thing in your world right now? Start there."); t.push("Remember: the joy isn't in having it figured out. It really is in the figuring out — but only if you're actually moving."); return t; }},
};
function earlyGetBlindSpots(answers,scores) {
  const q=id=>Number(answers[id]); const s=[];
  if(q(2)>=7)  s.push({qId:2,score:q(2),note:"Feeling behind your peers is one of the most common — and most distorting — experiences at this stage. Most of the certainty you're seeing in others is performed. The LinkedIn announcements, the confident answers at family dinners — almost none of that reflects how people actually feel on the inside. You are not behind. The race you think you're losing isn't real."});
  if(q(3)>=7)  s.push({qId:3,score:q(3),note:"Some paths genuinely are more durable than others — and if yours is one of them, this is a footnote. But confidence about stability is one of the most common blind spots at this stage. It's worth testing the assumption rather than just holding it."});
  if(q(13)>=7) s.push({qId:13,score:q(13),note:"The pressure to have it figured out by a certain age or stage is real — but the deadline is largely invented. There is no universal schedule. The most interesting careers are rarely the ones that looked most linear at 22."});
  if(q(11)>=8&&scores.compassScore<5) s.push({qId:11,score:q(11),note:"Knowing your passion is genuinely valuable — when it's paired with curiosity, resilience, and self-knowledge. When it isn't, high passion clarity can narrow your aperture before you've had enough data. 'Follow your passion' is good advice for someone who's done a lot of exploring. It's risky advice for someone who hasn't yet."});
  return s;
}
function earlyNavInsight({waveNav,compassScore,purposeScore,stabilityRisk}) {
  const iW=waveNav>=5,hC=compassScore>=6,hP=purposeScore>=6,hS=stabilityRisk>=7;
  if(iW){ if(hP&&hC)return"Purposeful exploration — the healthy version of not having it all mapped out. You have a compass and the confidence to follow it. That's not the same as being lost. That's ranging."; if(hP&&!hC)return"Values clarity is there — you know what you stand for. Build the confidence to act on it before everything feels perfectly aligned."; if(!hP&&hC)return"Agile and willing to experiment — a real head start. The investment worth making: the deeper 'why.' Curiosity aimed at something that matters is a superpower."; return"Open and unattached — the right starting point. The work now: building the tools to navigate."; }
  else { if(!hS&&hP)return"Your certainty looks considered — you have purpose alignment and a realistic read on your path. Keep asking: is this direction something you chose, or something that was chosen for you?"; if(hS)return"Strong direction, but worth stress-testing the stability assumption honestly. Some paths are genuinely durable. Others feel more stable than they are."; if(!hP)return"Clear direction, but purpose alignment is lower. Where you're going and why you're going there are different questions."; return"A clear plan at an early stage is an asset — as long as you keep asking whether it fits who you're becoming."; }
}

const earlyCss = `
${FONT}
.app-early{font-family:'DM Sans',sans-serif;background:#0d1a2e;min-height:100vh;color:#fff;}
.quiz-e{max-width:660px;margin:0 auto;padding:40px 24px 80px;min-height:100vh;}
.prog-wrap-e{margin-bottom:44px;}
.prog-meta-e{display:flex;justify-content:space-between;font-size:10px;color:#8aaac0;margin-bottom:10px;letter-spacing:2px;text-transform:uppercase;}
.prog-bar-e{height:1px;background:#1e3050;}
.prog-fill-e{height:100%;background:#f4a261;transition:width .5s ease;}
.sec-head-e{margin-bottom:40px;padding-bottom:26px;border-bottom:1px solid #1e3050;}
.sec-tag-e{font-size:10px;letter-spacing:4px;text-transform:uppercase;margin-bottom:8px;font-weight:500;}
.sec-title-lrg-e{font-family:'Playfair Display',serif;font-size:28px;line-height:1.2;color:#ffffff;}
.q-card-e{background:#111c2c;border-radius:4px;padding:26px 26px 22px;margin-bottom:14px;border:1px solid #1e3050;transition:border-color .2s;}
.q-card-e:focus-within{border-color:#f4a26140;}
.q-num-e{font-size:10px;color:#7a9ab0;letter-spacing:3px;text-transform:uppercase;margin-bottom:11px;}
.q-text-e{font-size:15px;line-height:1.75;color:#d8eaf8;font-weight:300;margin-bottom:26px;}
.likert-e{display:flex;gap:6px;margin-top:6px;}
.likert-opt-e{flex:1;position:relative;}
.likert-opt-e input[type=radio]{position:absolute;opacity:0;pointer-events:none;width:0;height:0;}
.likert-opt-e label{display:block;padding:12px 4px 10px;border:1px solid #2a4060;border-radius:4px;cursor:pointer;font-size:11px;line-height:1.4;text-align:center;color:#8aaac0;background:#0c1e2e;transition:border-color .2s,background .2s,color .2s;user-select:none;}
.likert-opt-e input:checked+label{background:#3d2000;border-color:#f4a261;color:#ffffff;font-weight:500;}
.likert-opt-e label:hover{border-color:#f4a26170;color:#c8a888;background:#101e2e;}
.q-unanswered-e{border-color:#e6394650!important;}
.section-error-e{color:#e07878;font-size:12px;text-align:right;margin-top:8px;letter-spacing:.3px;}
@media(max-width:480px){.likert-opt-e label{font-size:9.5px;padding:10px 2px 8px;}}
.q-nav-e{display:flex;gap:10px;justify-content:flex-end;margin-top:40px;}
.btn-nav-e{padding:12px 30px;font-size:12px;font-family:'DM Sans',sans-serif;font-weight:500;border-radius:2px;cursor:pointer;transition:all .2s;letter-spacing:1.5px;text-transform:uppercase;}
.btn-back-e{background:transparent;color:#7a9ab0;border:1px solid #2a4060;}
.btn-back-e:hover{color:#8aaac0;border-color:#203040;}
.btn-fwd-e{background:#f4a261;color:#0d1a2e;border:none;}
.btn-fwd-e:hover{background:#f4b880;transform:translateY(-1px);}
.results-e{max-width:740px;margin:0 auto;padding:48px 24px 80px;}
.r-eyebrow-e{font-size:10px;letter-spacing:5px;text-transform:uppercase;color:#f4a261;text-align:center;margin-bottom:44px;}
.divider-e{height:1px;background:#1e3050;margin:48px 0;}
.sec-title-sm-e{font-family:'Playfair Display',serif;font-size:22px;margin-bottom:7px;color:#ffffff;}
.sec-sub-e{font-size:13px;color:#8aaac0;margin-bottom:24px;line-height:1.75;}
.arch-card-e{border-radius:6px;padding:40px;border:1px solid #1e3050;}
.arch-emoji-e{font-size:46px;margin-bottom:18px;display:block;}
.arch-name-e{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,46px);line-height:1.05;margin-bottom:7px;}
.arch-tagline-e{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;opacity:.8;margin-bottom:22px;}
.arch-desc-e{font-size:15px;line-height:1.92;color:#d0e6f8;font-weight:300;white-space:pre-line;}
.matrix-wrap-e{margin-top:36px;}
.matrix-label-top-e{text-align:center;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8fb4cc;margin-bottom:10px;}
.matrix-row-e{display:flex;align-items:stretch;}
.matrix-y-label-e{writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8fb4cc;padding:0 10px;white-space:nowrap;display:flex;align-items:center;}
.matrix-col-e{flex:1;display:flex;flex-direction:column;}
.matrix-grid-e{position:relative;width:100%;aspect-ratio:1;border:1px solid #2a4060;border-radius:4px;overflow:hidden;}
.quad-e{position:absolute;width:50%;height:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:opacity .4s;}
.quad-tl-e{top:0;left:0;border-right:1px solid #2a4a38;border-bottom:1px solid #2a4a38;background:#1a3828;}
.quad-tr-e{top:0;right:0;border-bottom:1px solid #1a4050;background:#0d2e40;}
.quad-bl-e{bottom:0;left:0;border-right:1px solid #4a1820;background:#2e1018;}
.quad-br-e{bottom:0;right:0;background:#2e1e08;}
.quad-emoji-e{font-size:clamp(16px,2.8vw,26px);}
.quad-name-e{font-size:clamp(8px,1.3vw,11px);letter-spacing:1px;text-transform:uppercase;text-align:center;padding:0 6px;font-weight:600;line-height:1.3;}
.quad-e.active-e{opacity:1;}
.quad-e.inactive-e{opacity:.45;}
.matrix-dot-e{position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;border:2.5px solid #0d1a2e;box-shadow:0 0 0 2.5px #fff,0 0 18px #fff9;transform:translate(-50%,-50%);transition:left .9s cubic-bezier(.34,1.56,.64,1),top .9s cubic-bezier(.34,1.56,.64,1);z-index:10;pointer-events:none;}
.matrix-axis-x-e{display:flex;justify-content:space-between;font-size:10px;color:#8fb4cc;letter-spacing:1.5px;text-transform:uppercase;margin-top:8px;}
.matrix-spacer-e{width:38px;}
.dim-grid-e{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
@media(max-width:520px){.dim-grid-e{grid-template-columns:1fr;}}
.dim-card-e{background:#111c2c;border-radius:4px;padding:22px;border:1px solid #1e3050;}
.dim-name-e{font-size:10px;letter-spacing:3px;text-transform:uppercase;margin-bottom:3px;font-weight:500;}
.dim-sub-e{font-size:11px;color:#8aaac0;margin-bottom:16px;}
.dim-bar-bg-e{height:2px;background:#1e3050;border-radius:2px;margin-bottom:9px;}
.dim-bar-fill-e{height:100%;border-radius:2px;}
.dim-score-e{font-family:'Playfair Display',serif;font-size:30px;font-weight:700;line-height:1;}
.dim-score-e span{font-size:12px;color:#8aaac0;font-family:'DM Sans',sans-serif;font-weight:300;}
.dim-insight-e{font-size:12px;color:#8aaac0;line-height:1.7;margin-top:9px;padding-top:9px;border-top:1px solid #1e3050;}
.bs-intro-e{font-size:14px;color:#8aaac0;margin-bottom:18px;line-height:1.78;}
.bs-card-e{background:#1e0e18;border:1px solid #e6394650;border-radius:4px;padding:22px;margin-bottom:11px;}
.bs-label-e{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#e63946;margin-bottom:9px;}
.bs-q-e{font-size:13px;color:#c0d4e4;margin-bottom:9px;line-height:1.6;font-style:italic;}
.bs-note-e{font-size:12px;color:#c08890;line-height:1.68;}
.no-bs-e{background:#0c2018;border:1px solid #52b78850;border-radius:4px;padding:18px 22px;font-size:14px;color:#72d7a8;line-height:1.68;}
.nw-card-e{background:#111c2c;border-radius:4px;padding:34px;border:1px solid #1e3050;}
.nw-intro-e{font-size:14px;color:#8aaac0;line-height:1.8;margin-bottom:22px;}
.nw-item-e{display:flex;gap:14px;align-items:flex-start;margin-bottom:15px;}
.nw-dot-e{width:5px;height:5px;border-radius:50%;background:#f4a261;margin-top:8px;flex-shrink:0;}
.nw-text-e{font-size:14px;color:#cce0f2;line-height:1.75;}
.retake-e{display:block;margin:48px auto 0;background:transparent;color:#8aaac0;border:1px solid #2a4060;padding:11px 34px;font-size:11px;font-family:'DM Sans',sans-serif;border-radius:2px;cursor:pointer;letter-spacing:2px;text-transform:uppercase;transition:all .2s;}
.retake-e:hover{color:#c0d8e8;border-color:#2e4a60;}
.back-link-e{display:flex;align-items:center;gap:8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8aaac0;cursor:pointer;transition:color .2s;margin-bottom:32px;}
.back-link-e:hover{color:#c0d8e8;}
`;

function EarlyMatrix({ waveNav, internalAnchor, archetypeKey }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 120); return () => clearTimeout(t); }, []);
  const quads = [
    { cls:"quad-tl-e", key:"groundedClimber", emoji:"🧗", name:"Grounded\nClimber",    color:"#52b788" },
    { cls:"quad-tr-e", key:"consciousSurfer", emoji:"🏄", name:"Conscious\nSurfer",    color:"#00b4d8" },
    { cls:"quad-bl-e", key:"exposedClimber",  emoji:"⚠️", name:"Exposed\nClimber",     color:"#e63946" },
    { cls:"quad-br-e", key:"drifter",         emoji:"🌊", name:"Purposeful\nExplorer", color:"#f4a261" },
  ];
  return (
    <div className="matrix-wrap-e">
      <div className="matrix-label-top-e">↑ Internally Anchored</div>
      <div className="matrix-row-e">
        <div className="matrix-y-label-e">Externally Anchored ↓</div>
        <div className="matrix-col-e">
          <div className="matrix-grid-e">
            {quads.map(q=>(
              <div key={q.key} className={`quad-e ${q.cls} ${archetypeKey===q.key?"active-e":"inactive-e"}`}>
                <div className="quad-emoji-e">{q.emoji}</div>
                <div className="quad-name-e" style={{color:q.color}}>{q.name}</div>
              </div>
            ))}
            {ready&&<div className="matrix-dot-e" style={{left:`${(waveNav/10)*100}%`,top:`${((10-internalAnchor)/10)*100}%`}}/>}
          </div>
          <div className="matrix-axis-x-e"><span>← Ladder</span><span>Waves →</span></div>
        </div>
        <div className="matrix-spacer-e"/>
      </div>
    </div>
  );
}

function EarlyQuiz({ onBack }) {
  const [section, setSection] = useState(0);
  const [screen,  setScreen]  = useState("quiz");
  const [answers, setAnswers] = useState(Object.fromEntries(Object.keys(EARLY_QUESTIONS).map(k=>[k,null])));
  const [emailSkipped, setEmailSkipped] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const scores        = useMemo(()=>earlyComputeScores(answers),[answers]);
  const archetypeKey  = useMemo(()=>earlyGetArchetypeKey(scores),[scores]);
  const archetypeMeta = EARLY_ARCHETYPE_META[archetypeKey];
  const archetypeDesc = useMemo(()=>earlyBuildReport(archetypeKey,scores),[archetypeKey,scores]);
  const nextWaveTips  = useMemo(()=>archetypeMeta.nextWave(scores),[archetypeKey,scores]);
  const blindspots    = useMemo(()=>earlyGetBlindSpots(answers,scores),[answers,scores]);
  const setAnswer     = (id,v)=>setAnswers(p=>({...p,[id]:v}));
  const reset         = ()=>{ setSection(0); setScreen("quiz"); setEmailSkipped(false); setAttempted(false); setAnswers(Object.fromEntries(Object.keys(EARLY_QUESTIONS).map(k=>[k,null]))); };
  const dimData = [
    {id:"nav",    label:"Career Navigation", sub:"Ladder ← → Waves",               score:scores.waveNav,        color:"#00b4d8", insight:earlyNavInsight(scores)},
    {id:"anchor", label:"Identity Anchor",   sub:"External ← → Internal",          score:scores.internalAnchor, color:"#52b788", insight:scores.internalAnchor>=7?"Well-anchored — your sense of self isn't riding on having the right answer to 'what do you want to do.' That's more unusual than it sounds.":scores.internalAnchor>=4?"Partially grounded. Some of your direction is driven by what others expect, and some by what genuinely excites you. Worth understanding which is which.":"Your direction appears heavily influenced by external expectations. That's very common. It's also worth looking at honestly."},
    {id:"compass",label:"Compass Score",     sub:"Curiosity · Resilience · Agency", score:scores.compassScore,   color:"#f4a261", insight:scores.compassScore>=7?"Strong compass signal — you follow curiosity, treat setbacks as information, and make growth-first decisions. The most durable career skill there is.":scores.compassScore>=4?"Partial compass signal. Some of the ingredients for purposeful exploration are present, but not all firing together yet.":"Low compass signal. This is the combination that separates purposeful exploration from drift — and it's worth building."},
    {id:"purpose",label:"Values & Purpose",  sub:"Clarity & Self-Knowledge",        score:scores.purposeScore,   color:"#e76f51", insight:scores.purposeScore>=7?"Strong values and self-knowledge signal — you know what you stand for and you're building self-awareness about how you work best.":scores.purposeScore>=4?"Some values clarity, but still developing. That's normal at this stage — keep investing in it rather than defaulting to external signals.":"Values and self-knowledge are showing up low. Decisions are probably being made from external signals rather than internal ones. This is the most important area to invest in."},
  ];

  if (screen === "quiz") {
    const sec    = EARLY_SECTIONS[section];
    const isLast = section === EARLY_SECTIONS.length - 1;
    return (
      <div className="app-early"><style>{earlyCss}</style>
        <div className="quiz-e">
          <div className="back-link-e" onClick={onBack}>← Retake Assessment</div>
          <div className="prog-wrap-e">
            <div className="prog-meta-e"><span>{sec.label}</span><span>Part {section+1} of {EARLY_SECTIONS.length}</span></div>
            <div className="prog-bar-e"><div className="prog-fill-e" style={{width:`${((section+1)/EARLY_SECTIONS.length)*100}%`}}/></div>
          </div>
          <div className="sec-head-e">
            <div className="sec-tag-e" style={{color:sec.color}}>{sec.subtitle}</div>
            <h2 className="sec-title-lrg-e">{sec.label}</h2>
          </div>
          {sec.questions.map(id=>(
            <div key={id} className={`q-card-e${attempted && answers[id]===null ? " q-unanswered-e" : ""}`}>
              <div className="q-num-e">Question {id}</div>
              <div className="q-text-e">{EARLY_QUESTIONS[id].text}</div>
              <div className="likert-e">
                {LIKERT_OPTIONS.map(opt=>(
                  <div key={opt.value} className="likert-opt-e">
                    <input type="radio" id={`e-q${id}-v${opt.value}`} name={`e-q${id}`} checked={answers[id]===opt.value} onChange={()=>setAnswer(id,opt.value)}/>
                    <label htmlFor={`e-q${id}-v${opt.value}`}>{opt.label}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {attempted && sec.questions.some(id=>answers[id]===null) && (
            <p className="section-error-e">Please answer all questions before continuing.</p>
          )}
          <div className="q-nav-e">
            {section>0&&<button className="btn-nav-e btn-back-e" onClick={()=>{setAttempted(false);setSection(s=>s-1);}}>← Back</button>}
            {!isLast
              ?<button className="btn-nav-e btn-fwd-e" onClick={()=>{if(sec.questions.some(id=>answers[id]===null)){setAttempted(true);return;}setAttempted(false);setSection(s=>s+1);}}>Continue →</button>
              :<button className="btn-nav-e btn-fwd-e" onClick={()=>{if(sec.questions.some(id=>answers[id]===null)){setAttempted(true);return;}setScreen("results");}}>See My Report →</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-early"><style>{earlyCss}</style>
      <div className="results-e">
        <div className="back-link-e" onClick={onBack}>← Retake Assessment</div>
        <div className="r-eyebrow-e">Your Career Report</div>
        <div className="arch-card-e" style={{background:archetypeMeta.bg}}>
          <span className="arch-emoji-e">{archetypeMeta.emoji}</span>
          <h2 className="arch-name-e" style={{color:archetypeMeta.color}}>{archetypeMeta.name}</h2>
          <div className="arch-tagline-e" style={{color:archetypeMeta.color}}>{archetypeMeta.tagline}</div>
          <p className="arch-desc-e">{archetypeDesc}</p>
          <EarlyMatrix waveNav={scores.waveNav} internalAnchor={scores.internalAnchor} archetypeKey={archetypeKey}/>
        </div>
        <div className="divider-e"/>
        <div className="sec-title-sm-e">Your Four Dimensions</div>
        <div className="sec-sub-e">The same score can mean very different things depending on the combination. Read these together, not in isolation.</div>
        <div className="dim-grid-e">
          {dimData.map(d=>(
            <div key={d.id} className="dim-card-e">
              <div className="dim-name-e" style={{color:d.color}}>{d.label}</div>
              <div className="dim-sub-e">{d.sub}</div>
              <div className="dim-bar-bg-e"><div className="dim-bar-fill-e" style={{width:`${(d.score/10)*100}%`,background:d.color}}/></div>
              <div className="dim-score-e" style={{color:d.color}}>{d.score.toFixed(1)}<span> / 10</span></div>
              <div className="dim-insight-e">{d.insight}</div>
            </div>
          ))}
        </div>
        <div className="divider-e"/>
        <div className="sec-title-sm-e">The Honest Check</div>
        <div className="bs-intro-e">A few places worth a second look — not to add to the pressure, but because seeing them clearly is the first step to moving through them.</div>
        {blindspots.length===0?<div className="no-bs-e">✓ No major blind spots flagged. Your answers suggest a grounded, honest read on where you are. That's a real foundation to build from.</div>
          :blindspots.map(({qId,score,note})=>(
            <div key={qId} className="bs-card-e">
              <div className="bs-label-e">You scored {score}/10 · Question {qId}</div>
              <div className="bs-q-e">"{EARLY_QUESTIONS[qId].text}"</div>
              <div className="bs-note-e">⚠ {note}</div>
            </div>
          ))}

        {!emailSkipped && (
          <EmailCapture
            archetype={archetypeMeta.name}
            onSkip={() => setEmailSkipped(true)}
          />
        )}

        <div className="divider-e"/>
        <div className="sec-title-sm-e">Your Next Wave</div>
        <div className="sec-sub-e">Not things to think about — things to do. Pick one and actually do it.</div>
        <div className="nw-card-e">
          <div className="nw-intro-e">Three starting points, based on your score combination.</div>
          {nextWaveTips.map((tip,i)=>(
            <div key={i} className="nw-item-e"><div className="nw-dot-e"/><div className="nw-text-e">{tip}</div></div>
          ))}
        </div>
        <button className="retake-e" onClick={reset}>Retake Assessment</button>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// ROOT — WIRES IT ALL TOGETHER
// ═══════════════════════════════════════════════════════════════════════════════

export default function WavesNotLadders() {
  const [version, setVersion] = useState(null); // null | "early" | "mid"

  if (!version)            return <ChooserScreen onSelect={setVersion} />;
  if (version === "mid")   return <MidQuiz   onBack={() => setVersion(null)} />;
  if (version === "early") return <EarlyQuiz onBack={() => setVersion(null)} />;
}
