import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Investments from './pages/Investments'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/3 via-transparent to-primary/2">
        <div className="text-center">
          <div className="text-4xl font-semibold text-primary mb-4">JCorp</div>
          <div className="w-12 h-12 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <div className="text-primary/60 mt-4">Loading secure environment...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark text-primary">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/investments" element={<Investments />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App 