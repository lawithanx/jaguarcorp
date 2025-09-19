import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { TrendingUp, DollarSign, Shield, Users, Calendar, Award, ChevronRight, Lock, Eye } from 'lucide-react'

const Investments: React.FC = () => {
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null)

  const investmentOpportunities = [
    {
      id: 'series-a',
      title: 'JCorp Series A Funding',
      type: 'Equity Investment',
      minInvestment: '$50,000',
      targetRaise: '$2,000,000',
      currentRaised: '$1,200,000',
      progress: 60,
      expectedROI: '15-25% annually',
      timeline: '18-24 months',
      status: 'Active',
      description: 'Expand our cybersecurity and enterprise development services across government and healthcare sectors.',
      highlights: [
        'Government contracts pipeline: $5M+',
        'Healthcare compliance expertise',
        'Proven track record: 100% project success',
        'Security clearance capabilities'
      ],
      riskLevel: 'Medium',
      sector: 'Technology Services',
      featured: true
    },
    {
      id: 'cybersec-expansion',
      title: 'Cybersecurity Division Expansion',
      type: 'Strategic Partnership',
      minInvestment: '$100,000',
      targetRaise: '$1,500,000',
      currentRaised: '$800,000',
      progress: 53,
      expectedROI: '20-30% annually',
      timeline: '12-18 months',
      status: 'Active',
      description: 'Scale our cybersecurity services to meet growing demand from legal and medical practices.',
      highlights: [
        'HIPAA & SOX compliance specialization',
        'Penetration testing automation tools',
        'Legal sector partnerships established',
        '24/7 security monitoring platform'
      ],
      riskLevel: 'Medium-Low',
      sector: 'Cybersecurity',
      featured: true
    },
    {
      id: 'medtech-platform',
      title: 'Healthcare Technology Platform',
      type: 'Product Development',
      minInvestment: '$25,000',
      targetRaise: '$3,000,000',
      currentRaised: '$500,000',
      progress: 17,
      expectedROI: '25-40% annually',
      timeline: '24-36 months',
      status: 'Early Stage',
      description: 'Develop a comprehensive healthcare technology platform for patient management and compliance.',
      highlights: [
        'HIPAA-compliant by design',
        'Telemedicine integration',
        'AI-powered patient insights',
        'Multi-practice management'
      ],
      riskLevel: 'Medium-High',
      sector: 'HealthTech',
      featured: false
    },
    {
      id: 'legal-automation',
      title: 'Legal Process Automation Suite',
      type: 'SaaS Development',
      minInvestment: '$75,000',
      targetRaise: '$2,500,000',
      currentRaised: '$1,100,000',
      progress: 44,
      expectedROI: '18-28% annually',
      timeline: '15-20 months',
      status: 'Active',
      description: 'Automated legal document processing and case management system for law firms.',
      highlights: [
        'Document automation & templates',
        'Case timeline management',
        'Client communication portal',
        'Billing & time tracking integration'
      ],
      riskLevel: 'Medium',
      sector: 'LegalTech',
      featured: false
    }
  ]

  const investorBenefits = [
    {
      icon: TrendingUp,
      title: 'Proven Growth',
      description: '300% revenue growth over the past 2 years with expanding client base in high-value sectors.'
    },
    {
      icon: Shield,
      title: 'Security Expertise',
      description: 'Unique positioning in cybersecurity for regulated industries with security clearance capabilities.'
    },
    {
      icon: Users,
      title: 'Enterprise Clients',
      description: 'Established relationships with government agencies, healthcare systems, and law firms.'
    },
    {
      icon: Award,
      title: 'Track Record',
      description: '100% project success rate with zero security incidents across all client engagements.'
    }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
      case 'medium-low':
        return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'medium-high':
      case 'high':
        return 'text-red-400 bg-red-500/20 border-red-500/30'
      default:
        return 'text-primary/60 bg-primary/10 border-primary/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'early stage':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
      case 'closing soon':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      default:
        return 'text-primary/60 bg-primary/10 border-primary/20'
    }
  }

  return (
    <Layout
      title="Investment Opportunities"
      description="Strategic investment opportunities in JCorp's expansion across cybersecurity, healthcare, and legal technology sectors"
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
              Investment Opportunities
            </h1>
            <p className="text-xl text-primary/60 max-w-3xl mx-auto">
              Join JCorp's expansion into high-growth sectors. Strategic investment opportunities 
              in cybersecurity, healthcare technology, and legal automation.
            </p>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { label: 'Total Investment Target', value: '$9M+', desc: 'Across all opportunities' },
              { label: 'Current Commitments', value: '$3.6M', desc: 'From strategic investors' },
              { label: 'Expected ROI Range', value: '15-40%', desc: 'Annual returns projected' },
              { label: 'Investment Horizon', value: '12-36mo', desc: 'Timeline to returns' }
            ].map((metric, index) => (
              <div key={metric.label} className="text-center">
                <div className="text-3xl font-semibold text-primary">{metric.value}</div>
                <div className="text-sm font-medium text-primary/80 mt-1">{metric.label}</div>
                <div className="text-xs text-primary/50 mt-1">{metric.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Investor Benefits */}
      <section className="py-16 bg-dark-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-primary mb-4">Why Invest in JCorp</h2>
            <p className="text-primary/60">Strategic advantages and proven performance in high-growth sectors</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {investorBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-professional text-center hover-lift"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">{benefit.title}</h3>
                <p className="text-primary/60 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold text-primary mb-4">Current Opportunities</h2>
            <p className="text-primary/60 max-w-2xl mx-auto">
              Strategic investment opportunities across our core business divisions and expansion initiatives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {investmentOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`card-professional hover-lift cursor-pointer ${
                  opportunity.featured ? 'ring-2 ring-primary/20' : ''
                }`}
                onClick={() => setSelectedInvestment(
                  selectedInvestment === opportunity.id ? null : opportunity.id
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-primary">{opportunity.title}</h3>
                      {opportunity.featured && (
                        <span className="bg-primary/90 text-dark px-2 py-1 rounded text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-primary/60 text-sm">{opportunity.type}</p>
                  </div>
                  <ChevronRight 
                    size={20} 
                    className={`text-primary/60 transition-transform ${
                      selectedInvestment === opportunity.id ? 'rotate-90' : ''
                    }`} 
                  />
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-primary/60">Min Investment</div>
                    <div className="text-lg font-semibold text-primary">{opportunity.minInvestment}</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary/60">Expected ROI</div>
                    <div className="text-lg font-semibold text-primary">{opportunity.expectedROI}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary/80">Funding Progress</span>
                    <span className="text-sm text-primary">{opportunity.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-primary/20 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${opportunity.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-primary/60">
                    <span>{opportunity.currentRaised} raised</span>
                    <span>{opportunity.targetRaise} target</span>
                  </div>
                </div>

                {/* Status and Risk */}
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-xs px-3 py-1 rounded border ${getStatusColor(opportunity.status)}`}>
                    {opportunity.status}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded border ${getRiskColor(opportunity.riskLevel)}`}>
                    Risk: {opportunity.riskLevel}
                  </span>
                  <span className="text-xs bg-primary/8 text-primary/80 px-3 py-1 rounded border border-primary/15">
                    {opportunity.sector}
                  </span>
                </div>

                {/* Expanded Details */}
                {selectedInvestment === opportunity.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-primary/10 pt-6 mt-6"
                  >
                    <p className="text-primary/70 mb-6 leading-relaxed">
                      {opportunity.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-primary/80 mb-3">Key Highlights</h4>
                      <ul className="space-y-2">
                        {opportunity.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3 text-primary/70 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-primary/60">Timeline</div>
                        <div className="text-primary font-medium">{opportunity.timeline}</div>
                      </div>
                      <div>
                        <div className="text-sm text-primary/60">Sector Focus</div>
                        <div className="text-primary font-medium">{opportunity.sector}</div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="btn-primary flex-1">
                        <Lock size={16} />
                        Request Information
                      </button>
                      <button className="btn-secondary">
                        <Eye size={16} />
                        View Prospectus
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
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
              Ready to Invest in JCorp's Future?
            </h2>
            <p className="text-xl text-primary/60 mb-8 max-w-2xl mx-auto">
              Join our strategic investors and be part of the next phase of growth in cybersecurity and enterprise technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Schedule Investor Meeting
              </button>
              <button className="btn-secondary">
                Download Investment Deck
              </button>
            </div>
            
            <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lock size={16} className="text-primary/60" />
                <span className="text-sm font-medium text-primary/80">Accredited Investors Only</span>
              </div>
              <p className="text-xs text-primary/60">
                Investment opportunities are available to accredited investors only. 
                All investments carry risk and past performance does not guarantee future results.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export default Investments 