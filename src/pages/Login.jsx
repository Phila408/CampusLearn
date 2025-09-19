import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../lib/session'

const DEMO_USERS = [
  { id:'stu_1', email:'student@campus.ac.za', password:'student123', fullName:'Muhle Ashley Ntuli', role:'student' },
  { id:'tut_1', email:'tutor@campus.ac.za',   password:'tutor123',   fullName:'Phila Hanong',      role:'tutor' },
];

export default function Login(){
  const [email, setEmail] = useState('your.email@campus.ac.za')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('auto')
  const [remember, setRemember] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    await new Promise(r=>setTimeout(r,400));

    // 1) Try demo users
    const demo = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (demo){
      const finalRole = role === 'auto' ? demo.role : role;
      setUser({ id: demo.id, email: demo.email, fullName: demo.fullName, role: finalRole });
      if (remember) localStorage.setItem('campuslearn_remember','1');
      nav('/');             // <-- go to dashboard
      return;
    }

    // 2) If not a demo user, require registration first
    alert('Invalid credentials. Either register first, or use Demo Student / Demo Tutor buttons.');
    setLoading(false);
  }

  function quickDemo(which){
    const u = which === 'student' ? DEMO_USERS[0] : DEMO_USERS[1];
    // Log in immediately (no need to click Sign In)
    setUser({ id: u.id, email: u.email, fullName: u.fullName, role: u.role });
    nav('/');               // <-- go to dashboard
  }

  return (
    <div className="auth-wrap">
      {/* ... keep your existing pretty UI here ... */}
      <div className="card auth-card">
        <h2 className="auth-title">Sign In</h2>
        <p className="auth-sub">Enter your credentials to access your account</p>

        <form className="row" onSubmit={handleSubmit} style={{gap:'1rem'}}>
          {/* Email */}
          <div className="field">
            <div className="label">Email Address</div>
            <div className="input-group">
              <span className="icon">✉️</span>
              <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="your.email@campus.ac.za" required/>
            </div>
          </div>

          {/* Password */}
          <div className="field">
            <div className="label">Password</div>
            <div className="input-group">
              <span className="icon">🔒</span>
              <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type={showPw?'text':'password'} placeholder="Enter your password" required/>
              <button type="button" onClick={()=>setShowPw(v=>!v)} className="btn btn-light" style={{position:'absolute', right:6, top:6, padding:'.45rem .6rem'}}>👁️</button>
            </div>
          </div>

          {/* Optional role */}
          <div className="field">
            <div className="label">Login as (Optional)</div>
            <select className="select" value={role} onChange={e=>setRole(e.target.value)}>
              <option value="auto">Auto-detect</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <label style={{display:'flex', alignItems:'center', gap:'.5rem'}}>
              <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/>
              <span>Remember me</span>
            </label>
            <a className="muted small" href="#" onClick={(e)=>{e.preventDefault(); alert('Use the demo logins or register first.')}}>Forgot password?</a>
          </div>

          <button className="btn" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>

          <div className="divider"></div>

          <div style={{textAlign:'center'}} className="muted small">Quick Demo Access</div>
          <div className="pill-group">
            <button type="button" className="pill" onClick={()=>quickDemo('student')}>Demo Student</button>
            <button type="button" className="pill" onClick={()=>quickDemo('tutor')}>Demo Tutor</button>
          </div>

          <div style={{textAlign:'center', marginTop:'1rem'}} className="muted">
            New to CampusLearn? <Link to="/register">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
