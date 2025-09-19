import React from 'react'
import Layout from '../components/layout/Layout'
import BusinessCard from '../components/BusinessCard'
import { motion } from 'framer-motion'
import { Shield, Users, Award, Lock, Globe, Zap, ArrowRight, CheckCircle } from 'lucide-react'

const Home: React.FC = () => {
  const services = [
    {
      icon: Shield,
      title: 'Enterprise Cybersecurity',
      description: 'Advanced threat protection and risk management for mission-critical operations.',
      features: ['Zero-trust architecture', 'Threat intelligence', 'Incident response', 'Compliance auditing']
    },
    {
      icon: Globe,
      title: 'Government Solutions',
      description: 'Secure, scalable technology solutions for federal and state agencies.',
      features: ['Security clearance ready', 'FISMA compliance', 'Custom development', 'Legacy modernization']
    },
    {
      icon: Lock,
      title: 'Healthcare Technology',
      description: 'HIPAA-compliant systems and digital health solutions for medical organizations.',
      features: ['EHR integration', 'Patient data security', 'Telemedicine platforms', 'Analytics dashboards']
    },
    {
      icon: Zap,
      title: 'Financial Systems',
      description: 'Secure fintech solutions and blockchain integration for financial institutions.',
      features: ['Payment processing', 'Blockchain integration', 'Risk assessment', 'Regulatory compliance']
    },
    {
      icon: Users,
      title: 'Legal Technology',
      description: 'Document automation and case management systems for law firms.',
      features: ['Document automation', 'Case management', 'Client portals', 'Billing integration']
    },
    {
      icon: Award,
      title: 'Web3 & Blockchain',
      description: 'Next-generation decentralized solutions and smart contract development.',
      features: ['Smart contracts', 'DeFi protocols', 'NFT platforms', 'Tokenization']
    }
  ]

  const trustFactors = [
    {
      icon: Shield,
      title: 'Security Clearance Ready',
      description: 'Our team holds active security clearances for classified government work.',
      metric: 'SECRET/TOP SECRET'
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'Certified in CISSP, CISM, AWS, Azure, and other critical technologies.',
      metric: '25+ Certifications'
    },
    {
      icon: Users,
      title: 'Enterprise Clients',
      description: 'Trusted by Fortune 500 companies, government agencies, and healthcare systems.',
      metric: '100+ Organizations'
    },
    {
      icon: Lock,
      title: 'Compliance Expertise',
      description: 'Deep experience with HIPAA, SOX, PCI-DSS, FISMA, and other regulations.',
      metric: '99.9% Compliance Rate'
    }
  ]

  const credentials = [
    'Top Secret Security Clearance',
    'CISSP Certified Security Professional',
    'AWS Solutions Architect Professional',
    'CISA Certified Information Systems Auditor',
    'PMP Project Management Professional',
    'HIPAA Privacy & Security Certified'
  ]

  return (
    <Layout
      title="Jaguar Corp - Elite Technology Solutions"
      description="Premier cybersecurity, enterprise development, and technology consulting for military, medical, legal, and financial sectors."
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-900 to-dark opacity-95" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight"
              >
                Elite Technology
                <br />
                <span className="text-primary/80">Solutions</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-primary/70 mb-8 leading-relaxed"
              >
                <strong className="text-primary">Jaguar Corp</strong> delivers enterprise-grade cybersecurity, 
                custom software development, and strategic technology consulting for the world's most demanding organizations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <button className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-3">
                  Schedule Consultation
                  <ArrowRight size={20} />
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  View Our Work
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-primary/60"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  Security Clearance Ready
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  HIPAA Compliant
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  SOC 2 Certified
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column - Business Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <BusinessCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Specialized Solutions for Critical Industries
            </h2>
            <p className="text-xl text-primary/60 max-w-3xl mx-auto">
              We understand the unique challenges facing government, healthcare, legal, and financial organizations.
              Our solutions are designed with security, compliance, and performance at their core.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-professional hover-lift group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <service.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                </div>
                
                <p className="text-primary/60 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-primary/70">
                      <CheckCircle size={16} className="text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Factors Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Trusted by Elite Organizations
            </h2>
            <p className="text-xl text-primary/60 max-w-3xl mx-auto">
              Our track record speaks for itself. We've earned the trust of government agencies, 
              Fortune 500 companies, and critical infrastructure organizations worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {trustFactors.map((factor, index) => (
              <motion.div
                key={factor.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <factor.icon size={28} className="text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">{factor.metric}</div>
                <h3 className="text-lg font-semibold text-primary mb-2">{factor.title}</h3>
                <p className="text-primary/60 text-sm">{factor.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card-professional text-center"
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Professional Certifications & Clearances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {credentials.map((credential) => (
                <div key={credential} className="flex items-center gap-3 text-primary/70">
                  <Award size={16} className="text-primary flex-shrink-0" />
                  <span className="text-sm">{credential}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Ready to Secure Your Organization's Future?
            </h2>
            <p className="text-xl text-primary/60 mb-8 leading-relaxed">
              Join the ranks of elite organizations that trust Jaguar Corp with their most critical technology initiatives. 
              Schedule a confidential consultation to discuss your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-3">
                Schedule Professional Consultation
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                View Services & Solutions
              </button>
            </div>
            <p className="text-sm text-primary/50 mt-6">
              All consultations are confidential and conducted under NDA protection.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export default Home 