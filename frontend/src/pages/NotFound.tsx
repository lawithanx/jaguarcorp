import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-tech font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-primary mb-4">Page Not Found</h2>
          <p className="text-primary/70 mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default NotFound 