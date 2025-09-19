import { NavLink, Link, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../lib/session'

export default function Navbar() {
  const user = getUser();
  const nav = useNavigate();

  const onLogout = () => { logout(); nav('/login'); };

  return (
    <div className="nav">
      <div className="inner">
        <Link to="/" className="brand" style={{textDecoration:'none'}}>
          <span className="brand-mark">📘</span>
          <span>CampusLearn</span>
        </Link>

        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
          {user && <NavLink to="/" end>Dashboard</NavLink>}
          {user && <NavLink to="/topics/new">Ask Question</NavLink>}
          {!user && <NavLink to="/login">Login</NavLink>}
          {!user && <NavLink to="/register">Register</NavLink>}
          {user && (
            <>
              <span className="muted small">Hi, {user.fullName} ({user.role})</span>
              <button className="btn btn-light" onClick={onLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
