import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, Download, Eye, FileText, Calendar, User, Settings, 
  BarChart3, Clock, Star, Award, Lock, CheckCircle, Activity,
  TrendingUp, Briefcase, Globe, Zap
} from 'lucide-react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for demonstration
  const dashboardData = {
    stats: {
      projectsCompleted: 12,
      activeLicenses: 3,
      securityScore: 98,
      lastLogin: '2024-01-15 14:30'
    },
    recentActivity: [
      { id: 1, type: 'download', item: 'Security Assessment Report', date: '2024-01-15', status: 'completed' },
      { id: 2, type: 'access', item: 'Project Alpha Documentation', date: '2024-01-14', status: 'viewed' },
      { id: 3, type: 'update', item: 'Compliance Certificate', date: '2024-01-12', status: 'updated' }
    ],
    vaultItems: [
      {
        id: 1,
        title: 'Enterprise Security Audit',
        type: 'report',
        description: 'Comprehensive security assessment and recommendations',
        size: '2.4 MB',
        downloads: 3,
        expires: '2024-12-31',
        status: 'active'
      },
      {
        id: 2,
        title: 'Custom Software License',
        type: 'license',
        description: 'Professional software development tools and frameworks',
        size: '156 KB',
        downloads: 1,
        expires: '2024-06-30',
        status: 'active'
      },
      {
        id: 3,
        title: 'Training Materials',
        type: 'training',
        description: 'Cybersecurity best practices and implementation guides',
        size: '45.7 MB',
        downloads: 8,
        expires: 'Unlimited',
        status: 'active'
      }
    ],
    projects: [
      {
        id: 1,
        name: 'Project Alpha',
        status: 'completed',
        progress: 100,
        startDate: '2023-11-01',
        endDate: '2024-01-15',
        type: 'cybersecurity'
      },
      {
        id: 2,
        name: 'System Integration',
        status: 'in-progress',
        progress: 75,
        startDate: '2024-01-10',
        endDate: '2024-03-15',
        type: 'development'
      }
    ]
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'vault', label: 'Vault', icon: Lock },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'completed': return 'text-blue-400'
      case 'in-progress': return 'text-yellow-400'
      case 'pending': return 'text-orange-400'
      default: return 'text-primary/60'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'report': return FileText
      case 'license': return Award
      case 'training': return User
      case 'cybersecurity': return Shield
      case 'development': return Globe
      default: return FileText
    }
  }

  return (
    <Layout
      title="Client Dashboard - Jaguar Corp"
      description="Your secure client portal for projects, downloads, and exclusive content"
    >
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Welcome back, {user?.first_name || 'Client'}
                </h1>
                <p className="text-primary/60">
                  Your secure vault and project dashboard
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-primary/70">
                  <Activity size={16} />
                  <span>Last login: {dashboardData.stats.lastLogin}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-400">
                  <Shield size={16} />
                  <span>Security Score: {dashboardData.stats.securityScore}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border-b border-primary/20 mb-8"
          >
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-primary/60 hover:text-primary'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Projects Completed', value: dashboardData.stats.projectsCompleted, icon: CheckCircle, color: 'text-green-400' },
                    { label: 'Active Licenses', value: dashboardData.stats.activeLicenses, icon: Award, color: 'text-blue-400' },
                    { label: 'Security Score', value: `${dashboardData.stats.securityScore}%`, icon: Shield, color: 'text-green-400' },
                    { label: 'Vault Items', value: dashboardData.vaultItems.length, icon: Lock, color: 'text-primary' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="card-professional p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary/60 text-sm">{stat.label}</p>
                          <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                        </div>
                        <stat.icon size={24} className={stat.color} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="card-professional p-6">
                  <h2 className="text-xl font-semibold text-primary mb-6 flex items-center gap-3">
                    <Clock size={24} />
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {dashboardData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            {activity.type === 'download' && <Download size={16} className="text-primary" />}
                            {activity.type === 'access' && <Eye size={16} className="text-primary" />}
                            {activity.type === 'update' && <CheckCircle size={16} className="text-primary" />}
                          </div>
                          <div>
                            <p className="text-primary font-medium">{activity.item}</p>
                            <p className="text-primary/60 text-sm">{activity.date}</p>
                          </div>
                        </div>
                        <span className={`text-sm ${getStatusColor(activity.status)} capitalize`}>
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'vault' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary">Your Private Vault</h2>
                  <div className="text-sm text-primary/60">
                    {dashboardData.vaultItems.length} items available
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {dashboardData.vaultItems.map((item, index) => {
                    const IconComponent = getTypeIcon(item.type)
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="card-professional p-6 hover-lift"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <IconComponent size={20} className="text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-primary">{item.title}</h3>
                              <p className="text-primary/60 text-sm capitalize">{item.type}</p>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)} bg-current bg-opacity-10`}>
                            {item.status}
                          </span>
                        </div>

                        <p className="text-primary/60 text-sm mb-4">{item.description}</p>

                        <div className="space-y-2 text-sm text-primary/60 mb-6">
                          <div className="flex justify-between">
                            <span>Size:</span>
                            <span>{item.size}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Downloads:</span>
                            <span>{item.downloads}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Expires:</span>
                            <span>{item.expires}</span>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-2">
                            <Download size={16} />
                            Download
                          </button>
                          <button className="btn-ghost flex-1 text-sm py-2 flex items-center justify-center gap-2">
                            <Eye size={16} />
                            Preview
                          </button>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-primary">Your Projects</h2>

                <div className="space-y-6">
                  {dashboardData.projects.map((project, index) => {
                    const IconComponent = getTypeIcon(project.type)
                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="card-professional p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <IconComponent size={20} className="text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-primary">{project.name}</h3>
                              <p className="text-primary/60 capitalize">{project.type}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)} bg-current bg-opacity-10`}>
                            {project.status.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-primary/60 text-sm">Start Date</p>
                            <p className="text-primary font-medium">{project.startDate}</p>
                          </div>
                          <div>
                            <p className="text-primary/60 text-sm">End Date</p>
                            <p className="text-primary font-medium">{project.endDate}</p>
                          </div>
                          <div>
                            <p className="text-primary/60 text-sm">Progress</p>
                            <p className="text-primary font-medium">{project.progress}%</p>
                          </div>
                        </div>

                        <div className="w-full bg-primary/10 rounded-full h-2 mb-4">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-end">
                          <button className="btn-ghost text-sm px-4 py-2">
                            View Details
                          </button>
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
                <h2 className="text-2xl font-bold text-primary">Account Settings</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="card-professional p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-primary/60 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={`${user?.first_name || ''} ${user?.last_name || ''}`}
                          className="w-full px-3 py-2 bg-dark/50 border border-primary/20 rounded-lg text-primary"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-primary/60 mb-1">Email</label>
                        <input 
                          type="email" 
                          value={user?.email || ''}
                          className="w-full px-3 py-2 bg-dark/50 border border-primary/20 rounded-lg text-primary"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-primary/60 mb-1">Account Type</label>
                        <input 
                          type="text" 
                          value={user?.user_type || 'Client'}
                          className="w-full px-3 py-2 bg-dark/50 border border-primary/20 rounded-lg text-primary capitalize"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-professional p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                        <div>
                          <p className="text-primary font-medium">Two-Factor Authentication</p>
                          <p className="text-primary/60 text-sm">Add an extra layer of security</p>
                        </div>
                        <button className="btn-secondary text-sm px-4 py-2">
                          Enable
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                        <div>
                          <p className="text-primary font-medium">Session Timeout</p>
                          <p className="text-primary/60 text-sm">Auto-logout after inactivity</p>
                        </div>
                        <span className="text-primary/60 text-sm">30 minutes</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                        <div>
                          <p className="text-primary font-medium">Login Notifications</p>
                          <p className="text-primary/60 text-sm">Get notified of new logins</p>
                        </div>
                        <span className="text-green-400 text-sm">Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard 