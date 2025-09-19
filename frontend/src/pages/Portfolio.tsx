import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { Shield, Code, Palette, ExternalLink, Github, Calendar, Users, Award, Eye } from 'lucide-react'

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Projects', icon: Award },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: Shield },
    { id: 'development', name: 'Development', icon: Code },
    { id: 'design', name: 'Design', icon: Palette }
  ]

  const projects = [
    {
      id: 1,
      title: 'Healthcare Security Audit',
      category: 'cybersecurity',
      client: 'Regional Medical Center',
      description: 'Comprehensive cybersecurity assessment for a 500-bed hospital system, including HIPAA compliance review and penetration testing.',
      image: '/api/placeholder/400/300',
      technologies: ['NIST Framework', 'HIPAA Compliance', 'Penetration Testing', 'Risk Assessment'],
      deliverables: ['Security Assessment Report', 'Compliance Roadmap', 'Staff Training Program', 'Incident Response Plan'],
      duration: '3 months',
      teamSize: '4 specialists',
      status: 'Completed',
      featured: true,
      sectors: ['Healthcare', 'Compliance']
    },
    {
      id: 2,
      title: 'Legal Case Management System',
      category: 'development',
      client: 'Morrison & Associates Law',
      description: 'Secure web application for case management with client portal, document management, and billing integration.',
      image: '/api/placeholder/400/300',
      technologies: ['Django', 'React', 'PostgreSQL', 'AWS', 'SSL/TLS'],
      deliverables: ['Web Application', 'Client Portal', 'Admin Dashboard', 'API Documentation'],
      duration: '6 months',
      teamSize: '3 developers',
      status: 'Completed',
      featured: true,
      sectors: ['Legal', 'Enterprise Software']
    },
    {
      id: 3,
      title: 'Government Agency Branding',
      category: 'design',
      client: 'Department of Public Safety',
      description: 'Complete brand identity and digital asset creation for a state government security agency.',
      image: '/api/placeholder/400/300',
      technologies: ['Adobe Creative Suite', 'Brand Strategy', 'Digital Assets', 'Web Design'],
      deliverables: ['Brand Guidelines', 'Logo System', 'Website Design', 'Marketing Materials'],
      duration: '2 months',
      teamSize: '2 designers',
      status: 'Completed',
      featured: false,
      sectors: ['Government', 'Branding']
    },
    {
      id: 4,
      title: 'Financial Services Penetration Test',
      category: 'cybersecurity',
      client: 'Community Credit Union',
      description: 'External and internal penetration testing for financial institution with regulatory compliance focus.',
      image: '/api/placeholder/400/300',
      technologies: ['OWASP', 'PCI DSS', 'Network Security', 'Social Engineering'],
      deliverables: ['Penetration Test Report', 'Executive Summary', 'Remediation Plan', 'Compliance Checklist'],
      duration: '1 month',
      teamSize: '3 specialists',
      status: 'Completed',
      featured: true,
      sectors: ['Financial', 'Compliance']
    },
    {
      id: 5,
      title: 'Medical Practice Web Portal',
      category: 'development',
      client: 'Confidential Medical Group',
      description: 'HIPAA-compliant patient portal with appointment scheduling, secure messaging, and telemedicine capabilities.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB', 'HIPAA Compliance', 'WebRTC'],
      deliverables: ['Patient Portal', 'Provider Dashboard', 'Mobile App', 'Integration API'],
      duration: '8 months',
      teamSize: '5 developers',
      status: 'In Progress',
      featured: false,
      sectors: ['Healthcare', 'Patient Care']
    },
    {
      id: 6,
      title: 'Law Firm Digital Transformation',
      category: 'design',
      client: 'Sterling Legal Partners',
      description: 'Complete digital presence redesign including website, client materials, and digital workflow optimization.',
      image: '/api/placeholder/400/300',
      technologies: ['UX/UI Design', 'Workflow Analysis', 'Digital Strategy', 'Responsive Design'],
      deliverables: ['Website Redesign', 'Client Portal UX', 'Digital Workflows', 'Brand Refresh'],
      duration: '4 months',
      teamSize: '3 designers',
      status: 'Completed',
      featured: false,
      sectors: ['Legal', 'Digital Transformation']
    }
  ]

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <Layout
      title="Professional Portfolio"
      description="Showcasing our expertise in cybersecurity, development, and design for enterprise clients"
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/3 via-transparent to-primary/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-6">
              Professional Portfolio
            </h1>
            <p className="text-xl text-primary/60 max-w-3xl mx-auto">
              Proven expertise in cybersecurity, enterprise development, and professional design 
              for government agencies, healthcare organizations, and legal practices.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { label: 'Projects Completed', value: '50+' },
              { label: 'Enterprise Clients', value: '30+' },
              { label: 'Industries Served', value: '15+' },
              { label: 'Success Rate', value: '100%' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-semibold text-primary">{stat.value}</div>
                <div className="text-sm text-primary/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-dark-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-primary mb-4">Featured Projects</h2>
            <p className="text-primary/60">Highlighting our most impactful work across sectors</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-professional hover-lift group"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/5 to-primary/2 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">
                      {project.category === 'cybersecurity' ? '🛡️' : 
                       project.category === 'development' ? '💻' : '🎨'}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-primary/90 text-dark px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                  <div className="absolute bottom-3 left-3 bg-dark/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-primary/80">
                    {project.status}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-primary mb-2">{project.title}</h3>
                <p className="text-primary/60 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.sectors.map(sector => (
                    <span key={sector} className="text-xs bg-primary/8 text-primary/80 px-2 py-1 rounded border border-primary/15">
                      {sector}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-primary/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {project.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    {project.teamSize}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-primary mb-4">All Projects</h2>
            <p className="text-primary/60">Comprehensive showcase of our professional work</p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-dark border-primary'
                    : 'bg-primary/5 text-primary border-primary/20 hover:border-primary/40'
                }`}
              >
                <category.icon size={16} />
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card-professional hover-lift group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Project Image */}
                  <div className="relative w-full lg:w-64 h-48 bg-gradient-to-br from-primary/5 to-primary/2 rounded-lg overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl opacity-20">
                        {project.category === 'cybersecurity' ? '🛡️' : 
                         project.category === 'development' ? '💻' : '🎨'}
                      </div>
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-primary/90 text-dark px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                        <Award size={12} />
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-dark/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-primary/80">
                      {project.status}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{project.title}</h3>
                      <p className="text-primary/70 text-sm mb-2">Client: {project.client}</p>
                      <p className="text-primary/60 leading-relaxed">{project.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-primary/60">
                        <Calendar size={14} />
                        Duration: {project.duration}
                      </div>
                      <div className="flex items-center gap-2 text-primary/60">
                        <Users size={14} />
                        Team: {project.teamSize}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-medium text-primary/80 mb-2">Technologies & Methods:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map(tech => (
                          <span key={tech} className="text-xs bg-primary/8 text-primary/80 px-2 py-1 rounded border border-primary/15">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-xs text-primary/50">+{project.technologies.length - 4} more</span>
                        )}
                      </div>
                    </div>

                    {/* Sectors */}
                    <div>
                      <h4 className="text-sm font-medium text-primary/80 mb-2">Industry Sectors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.sectors.map(sector => (
                          <span key={sector} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-dark-950/50 border-t border-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-primary mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-primary/60 mb-8">
              Let's discuss how we can help secure, develop, or design your next solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
              >
                Schedule Consultation
              </motion.a>
              <motion.a
                href="/shop"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary"
              >
                View Our Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export default Portfolio 