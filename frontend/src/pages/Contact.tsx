import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { Mail, Phone, MapPin, Clock, Shield, CheckCircle, AlertCircle } from 'lucide-react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    urgency: '',
    budget: '',
    message: '',
    clearanceRequired: false,
    complianceNeeds: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const projectTypes = [
    'Cybersecurity Assessment',
    'Penetration Testing',
    'Web Application Development',
    'Mobile App Development',
    'System Integration',
    'Brand Identity & Design',
    'UI/UX Design',
    'Digital Transformation',
    'Compliance Consulting',
    'Other'
  ]

  const urgencyLevels = [
    'Standard (4-6 weeks)',
    'Priority (2-3 weeks)', 
    'Urgent (1-2 weeks)',
    'Emergency (< 1 week)'
  ]

  const budgetRanges = [
    'Under $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+'
  ]

  const complianceOptions = [
    'HIPAA (Healthcare)',
    'SOX (Financial)',
    'PCI DSS (Payment)',
    'FISMA (Government)',
    'GDPR (Privacy)',
    'ISO 27001'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      if (name === 'clearanceRequired') {
        setFormData(prev => ({ ...prev, [name]: checked }))
      } else {
        // Handle compliance checkboxes
        const complianceValue = value
        setFormData(prev => ({
          ...prev,
          complianceNeeds: checked
            ? [...prev.complianceNeeds, complianceValue]
            : prev.complianceNeeds.filter(item => item !== complianceValue)
        }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        urgency: '',
        budget: '',
        message: '',
        clearanceRequired: false,
        complianceNeeds: []
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: ['hello@jcorp.dev', 'security@jcorp.dev'],
      description: 'Primary communication channel'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567'],
      description: 'For urgent security matters'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Remote Operations', 'Global Service Delivery'],
      description: 'Serving clients worldwide'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: ['< 24 hours standard', '< 4 hours urgent'],
      description: 'Professional support guaranteed'
    }
  ]

  return (
    <Layout
      title="Professional Consultation"
      description="Contact us for cybersecurity, development, and design services"
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
              Schedule a Professional Consultation
            </h1>
            <p className="text-xl text-primary/60 max-w-3xl mx-auto">
              Get expert guidance on cybersecurity, enterprise development, and professional design solutions. 
              Trusted by government agencies, healthcare organizations, and legal practices.
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              { icon: Shield, title: 'Security Clearance Available', desc: 'Government & defense projects' },
              { icon: CheckCircle, title: 'Compliance Expertise', desc: 'HIPAA, SOX, PCI DSS certified' },
              { icon: AlertCircle, title: '24/7 Emergency Response', desc: 'Critical security incidents' }
            ].map((item, index) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium text-primary mb-2">{item.title}</h3>
                <p className="text-primary/60">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h2 className="text-2xl font-semibold text-primary mb-8">Get in Touch</h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card-professional"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-primary/80 text-sm">{detail}</p>
                      ))}
                      <p className="text-primary/60 text-sm mt-1">{info.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Professional Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 card-professional"
            >
              <h3 className="font-medium text-primary mb-4">Professional Certifications</h3>
              <div className="space-y-2 text-sm text-primary/70">
                <div>• CISSP - Certified Information Systems Security Professional</div>
                <div>• CEH - Certified Ethical Hacker</div>
                <div>• CISA - Certified Information Systems Auditor</div>
                <div>• AWS Certified Solutions Architect</div>
                <div>• ISO 27001 Lead Auditor</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card-professional">
              <h2 className="text-2xl font-semibold text-primary mb-8">Professional Consultation Request</h2>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg mb-6"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} />
                    <span>Thank you! We'll contact you within 24 hours to schedule your consultation.</span>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle size={18} />
                    <span>There was an error submitting your request. Please try again or contact us directly.</span>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input w-full"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input w-full"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Company/Organization</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="input w-full"
                      placeholder="Your organization"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input w-full"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Project Type *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="input w-full"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Timeline</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="input w-full"
                    >
                      <option value="">Select timeline</option>
                      {urgencyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="input w-full"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                {/* Special Requirements */}
                <div className="form-group">
                  <label className="form-label">Security Clearance Required</label>
                  <label className="flex items-center gap-3 mt-2">
                    <input
                      type="checkbox"
                      name="clearanceRequired"
                      checked={formData.clearanceRequired}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20"
                    />
                    <span className="text-primary/80">This project requires security clearance</span>
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">Compliance Requirements</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {complianceOptions.map(option => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="compliance"
                          value={option}
                          checked={formData.complianceNeeds.includes(option)}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-primary bg-dark-800 border-primary/30 rounded focus:ring-primary/20"
                        />
                        <span className="text-primary/80 text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Description *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="input w-full resize-none"
                    placeholder="Please describe your project requirements, goals, and any specific challenges you're facing..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full"
                      />
                      Submitting Request...
                    </div>
                  ) : (
                    'Schedule Professional Consultation'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact 