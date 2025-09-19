import { Navigate } from 'react-router-dom'
import { getUser } from '../lib/session'

/**
 * If the user is already logged in, send them to the dashboard.
 * Otherwise, allow them to see the public page (login/register).
 */
export default function PublicRoute({ children }) {
  const user = getUser();
  return user ? <Navigate to="/" replace /> : children;
}
