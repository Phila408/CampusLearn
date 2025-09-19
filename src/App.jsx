import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'   // <— add this
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import TopicCreate from './pages/TopicCreate'
import TutorThread from './pages/TutorThread'

export default function App(){
  return (
    <div>
      <Navbar />
      <Routes>
        {/* PRIVATE: Only after login */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/topics/new"
          element={
            <ProtectedRoute roles={['student','tutor']}>
              <TopicCreate/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/thread/:id"
          element={
            <ProtectedRoute>
              <TutorThread/>
            </ProtectedRoute>
          }
        />

        {/* PUBLIC: Only when logged out */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register/>
            </PublicRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  )
}
