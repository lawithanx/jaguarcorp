import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'
import { 
  Download, 
  FileText, 
  Shield, 
  Clock, 
  CheckCircle, 
  Eye, 
  Settings,
  Package,
  Award,
  TrendingUp,
  Calendar,
  Bell,
  Lock,
  User
} from 'lucide-react'

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [notifications, setNotifications] = useState(3)

  // Mock data for dashboard items
  const dashboardItems = [
    {
      id: 1,
      title: 'Security Assessment Report - Q4 2024',
      type: 'document',
      status: 'completed',
      downloadUrl: '#',
      lastAccessed: '2024-01-15',
      expiresAt: '2024-12-31',
      description: 'Comprehensive cybersecurity assessment including vulnerability analysis and compliance review.'
    },
    {
      id: 2,
      title: 'Custom Web Application',
      type: 'project',
      status: 'in_progress',
      progress: 75,
      nextMilestone: 'Beta Testing Phase',
      estimatedCompletion: '2024-02-28',
      description: 'HIPAA-compliant patient portal with secure messaging and appointment scheduling.'
    },
    {
      id: 3,
      title: 'Brand Identity Package',
      type: 'deliverable',
      status: 'completed',
      downloadUrl: '#',
      lastAccessed: '2024-01-10',
      description: 'Complete brand guidelines, logo system, and digital asset library.'
    },
    {
      id: 4,
      title: 'Monthly Security Monitoring',
      type: 'service',
      status: 'active',
      nextReview: '2024-02-01',
      description: 'Ongoing security monitoring and threat detection service.'
    }
  ]

  const recentActivity = [
    { date: '2024-01-15', action: 'Downloaded Security Assessment Report', type: 'download' },
    { date: '2024-01-14', action: 'Project milestone completed: Database Design', type: 'milestone' },
    { date: '2024-01-12', action: 'New security alert resolved', type: 'security' },
    { date: '2024-01-10', action: 'Brand assets accessed', type: 'access' }
  ]

  const stats = [
    { label: 'Active Projects', value: '3', icon: Package, trend: '+1' },
    { label: 'Completed Deliverables', value: '12', icon: CheckCircle, trend: '+2' },
    { label: 'Security Score', value: '98%', icon: Shield, trend: '+2%' },
    { label: 'Uptime', value: '99.9%', icon: TrendingUp, trend: '100%' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'in_progress': return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
      case 'active': return 'text-primary bg-primary/20 border-primary/30'
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      default: return 'text-primary/60 bg-primary/10 border-primary/20'
    }
  }

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText
      case 'project': return Package
      case 'deliverable': return Award
      case 'service': return Shield
      default: return FileText
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'projects', name: 'Projects', icon: Package },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'services', name: 'Services', icon: Shield },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/2 via-transparent to-primary/1">
        {/* Header */}
        <div className="bg-dark-950/50 border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl font-semibold text-primary">Welcome back, {user?.firstName || 'Professional'}</h1>
                <p className="text-primary/60 mt-1">Your secure client vault and project dashboard</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="relative">
                  <Bell size={20} className="text-primary/60 hover:text-primary cursor-pointer" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </div>
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-professional"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary/60 text-sm">{stat.label}</p>
                    <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                    <p className="text-green-400 text-sm">+{stat.trend} from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon size={24} className="text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8 bg-dark-950/30 p-2 rounded-lg border border-primary/10"
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-dark font-medium'
                    : 'text-primary/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                <tab.icon size={16} />
                {tab.name}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="card-professional">
                    <h2 className="text-xl font-semibold text-primary mb-6">Recent Projects & Deliverables</h2>
                    <div className="space-y-4">
                      {dashboardItems.slice(0, 3).map((item, index) => {
                        const ItemIcon = getItemIcon(item.type)
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10 hover:border-primary/20 transition-all"
                          >
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <ItemIcon size={18} className="text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-primary">{item.title}</h3>
                              <p className="text-primary/60 text-sm mt-1">{item.description}</p>
                              <div className="flex items-center gap-4 mt-3">
                                <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(item.status)}`}>
                                  {item.status.replace('_', ' ').toUpperCase()}
                                </span>
                                {item.downloadUrl && (
                                  <button className="text-primary/60 hover:text-primary text-sm flex items-center gap-1">
                                    <Download size={14} />
                                    Download
                                  </button>
                                )}
                                {item.type === 'project' && item.progress && (
                                  <div className="flex items-center gap-2">
                                    <div className="w-20 h-2 bg-primary/20 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-primary transition-all"
                                        style={{ width: `${item.progress}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-primary/60">{item.progress}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {(activeTab === 'projects' || activeTab === 'documents' || activeTab === 'services') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="card-professional"
                >
                  <h2 className="text-xl font-semibold text-primary mb-6 capitalize">{activeTab}</h2>
                  <div className="space-y-4">
                    {dashboardItems
                      .filter(item => 
                        activeTab === 'projects' ? item.type === 'project' :
                        activeTab === 'documents' ? ['document', 'deliverable'].includes(item.type) :
                        activeTab === 'services' ? item.type === 'service' : true
                      )
                      .map((item, index) => {
                        const ItemIcon = getItemIcon(item.type)
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 bg-primary/5 rounded-lg border border-primary/10 hover:border-primary/20 transition-all hover-lift"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <ItemIcon size={20} className="text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-medium text-primary">{item.title}</h3>
                                  <p className="text-primary/60 mt-1">{item.description}</p>
                                  
                                  <div className="flex items-center gap-4 mt-4">
                                    <span className={`text-xs px-3 py-1 rounded border ${getStatusColor(item.status)}`}>
                                      {item.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                    
                                    {item.lastAccessed && (
                                      <div className="flex items-center gap-1 text-xs text-primary/60">
                                        <Clock size={12} />
                                        Last accessed: {item.lastAccessed}
                                      </div>
                                    )}
                                    
                                    {item.nextReview && (
                                      <div className="flex items-center gap-1 text-xs text-primary/60">
                                        <Calendar size={12} />
                                        Next review: {item.nextReview}
                                      </div>
                                    )}
                                  </div>

                                  {item.progress && (
                                    <div className="mt-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-primary/80">Progress</span>
                                        <span className="text-sm text-primary">{item.progress}%</span>
                                      </div>
                                      <div className="w-full h-2 bg-primary/20 rounded-full overflow-hidden">
                                        <motion.div 
                                          className="h-full bg-primary"
                                          initial={{ width: 0 }}
                                          animate={{ width: `${item.progress}%` }}
                                          transition={{ duration: 1, delay: 0.5 }}
                                        />
                                      </div>
                                      {item.nextMilestone && (
                                        <p className="text-xs text-primary/60 mt-2">
                                          Next: {item.nextMilestone}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {item.downloadUrl && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 text-primary/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                  >
                                    <Download size={18} />
                                  </motion.button>
                                )}
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="p-2 text-primary/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                >
                                  <Eye size={18} />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="card-professional">
                    <h2 className="text-xl font-semibold text-primary mb-6">Account Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-primary mb-4">Profile Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input className="input w-full" defaultValue={user?.firstName + ' ' + user?.lastName} />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Email</label>
                            <input className="input w-full" defaultValue={user?.email} />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-primary mb-4">Security Preferences</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20" />
                            <span className="text-primary/80">Enable two-factor authentication</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20" />
                            <span className="text-primary/80">Email notifications for new deliverables</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20" />
                            <span className="text-primary/80">SMS alerts for security events</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="card-professional"
              >
                <h3 className="font-semibold text-primary mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-primary/80">{activity.action}</p>
                        <p className="text-xs text-primary/50">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card-professional"
              >
                <h3 className="font-semibold text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-secondary text-left">
                    <Package size={16} />
                    Request New Project
                  </button>
                  <button className="w-full btn-secondary text-left">
                    <Shield size={16} />
                    Security Consultation
                  </button>
                  <button className="w-full btn-secondary text-left">
                    <FileText size={16} />
                    Download All Reports
                  </button>
                </div>
              </motion.div>

              {/* Security Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="card-professional"
              >
                <h3 className="font-semibold text-primary mb-4">Security Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary/70">Account Security</span>
                    <span className="text-green-400 text-sm">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary/70">Data Encryption</span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary/70">Compliance</span>
                    <span className="text-green-400 text-sm">Up to Date</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard 