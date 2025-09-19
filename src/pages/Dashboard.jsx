import { Link } from 'react-router-dom'
import { getUser } from '../lib/session'
import { useEffect, useMemo, useState } from 'react'

function timeAgo(iso) {
  const d = new Date(iso);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d2 = Math.floor(h / 24);
  return `${d2}d ago`;
}

export default function Dashboard(){
  const user = getUser();
  const firstName = useMemo(()=> (user?.fullName || '').split(' ')[0] || 'there', [user]);
  const [topics, setTopics] = useState([]);

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('campuslearn_topics')||'[]');
    setTopics(stored);
  },[]);

  // KPIs
  const topicsCount = topics.length;
  const responsesCount = topics.reduce((n,t)=> n + (t.messages?.length || 0), 0);

  // Demo “Academic Overview”
  const overallAvg = 83.7;
  const creditsDone = 85;

  // Demo tutors
  const tutors = [
    { initials:'PH', name:'Miss Phila Hanong', subj:'Business Intelligence', rating:4.9, on: true },
    { initials:'BM', name:'Dr. Brendan Mokole', subj:'Software Engineering', rating:4.8, on: false },
  ];

  // Demo progress report
  const report = [
    { name:'Business Intelligence', val:85, note:'Average' },
    { name:'Software Engineering', val:82.3, note:'Average' },
  ];

  return (
    <div className="container" style={{marginTop:'1rem'}}>
      {/* Greeting */}
      <div className="card">
        <div className="dash-header">
          <div>
            <h2 className="dash-title">Welcome back, {firstName}!</h2>
            <p className="muted">Ready to continue your learning journey?</p>
          </div>
          <Link to="/topics/new" className="btn">+ Create New Topic</Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <div className="card kpi">
          <div className="kpi-icon">📝</div>
          <div className="kpi-body">
            <div className="kpi-label muted small">Topics Created</div>
            <div className="kpi-num">{topicsCount}</div>
          </div>
        </div>
        <div className="card kpi">
          <div className="kpi-icon">💬</div>
          <div className="kpi-body">
            <div className="kpi-label muted small">Responses Received</div>
            <div className="kpi-num">{responsesCount}</div>
          </div>
        </div>
        <div className="card kpi">
          <div className="kpi-icon">🧠</div>
          <div className="kpi-body">
            <div className="kpi-label muted small">Overall Average</div>
            <div className="kpi-num">{overallAvg}%</div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="row row-2" style={{marginTop:'1rem'}}>
        {/* LEFT */}
        <div className="row" style={{gap:'1rem'}}>
          {/* Academic Overview */}
          <div className="card">
            <div className="section-head">
              <div className="section-title"><span>📘</span> Academic Overview</div>
              <div className="muted small">{overallAvg}%</div>
            </div>
            <p className="muted small">Your current academic performance across subjects.</p>

            <div className="muted small" style={{marginTop:'.6rem'}}>Credits Completed</div>
            <div className="progress" style={{marginTop:'.25rem'}}>
              <span style={{width:`${creditsDone/120*100}%`}} />
            </div>
            <div className="muted small" style={{marginTop:'.25rem'}}>{creditsDone}/120</div>
          </div>

          {/* Recent Topics */}
          <div className="card">
            <div className="section-head">
              <div className="section-title"><span>🗂️</span> Recent Topics</div>
              <div className="muted small">Your latest questions and their status</div>
            </div>

            <div className="list" style={{marginTop:'.8rem'}}>
              {topics.length===0 && <p className="muted">No topics yet.</p>}
              {topics.map(t=>(
                <Link to={`/thread/${t.id}`} key={t.id} className="list-item" style={{textDecoration:'none', color:'inherit'}}>
                  <div>
                    <div className="item-title">{t.title}</div>
                    <div className="muted small" style={{display:'flex', gap:'.75rem', alignItems:'center'}}>
                      <span>{timeAgo(t.createdAt)}</span>
                      <span>• {(t.messages?.length||0)} responses</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:'.5rem', alignItems:'center'}}>
                    {t.subject && <span className="badge">{t.subject}</span>}
                    <span className="badge badge-soft">pending</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="row" style={{gap:'1rem'}}>
          {/* Browse Tutors */}
          <div className="card">
            <div className="section-title"><span>🧑‍🏫</span> Browse Tutors</div>
            <p className="muted small">Find expert tutors in your subjects</p>
            <div className="list" style={{marginTop:'.8rem'}}>
              {tutors.map((t,i)=>(
                <div key={i} className="list-item">
                  <div style={{display:'flex', alignItems:'center', gap:'.8rem'}}>
                    <div className="avatar">{t.initials}</div>
                    <div>
                      <div className="item-title">{t.name}</div>
                      <div className="muted small">{t.subj}</div>
                    </div>
                  </div>
                  <div className="muted small" style={{display:'flex', alignItems:'center', gap:'.5rem'}}>
                    <span className={`dot ${t.on?'on':''}`}></span>
                    <span>⭐ {t.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Report */}
          <div className="card">
            <div className="section-title"><span>📈</span> Progress Report</div>
            <p className="muted small">View your marks and academic performance</p>
            <div className="list" style={{marginTop:'.8rem'}}>
              {report.map((r,i)=>(
                <div key={i} className="list-item">
                  <div>
                    <div className="item-title">{r.name}</div>
                    <div className="progress" style={{marginTop:'.3rem', width:240}}>
                      <span style={{width:`${r.val}%`}}/>
                    </div>
                  </div>
                  <div className="muted small" style={{textAlign:'right'}}>
                    <div style={{fontWeight:700}}>{r.val}%</div>
                    <div>{r.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
