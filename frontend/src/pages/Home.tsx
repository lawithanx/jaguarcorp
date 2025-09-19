import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import BusinessCard from '../components/BusinessCard'
import { ArrowRight, Shield, Code, Palette, CheckCircle, Users, Award } from 'lucide-react'

const Home: React.FC = () => {
  const services = [
    {
      icon: Shield,
      title: 'Cybersecurity Solutions',
      description: 'Enterprise-grade security assessments, penetration testing, and compliance auditing for mission-critical systems.',
      features: ['Security Audits & Compliance', 'Penetration Testing', 'Vulnerability Assessment', 'Risk Management'],
      sectors: ['Government', 'Healthcare', 'Legal']
    },
    {
      icon: Code,
      title: 'Enterprise Development',
      description: 'Secure, scalable software solutions built with industry best practices and regulatory compliance.',
      features: ['Secure Web Applications', 'Database Design', 'System Integration', 'Cloud Infrastructure'],
      sectors: ['Legal Tech', 'MedTech', 'Defense']
    },
    {
      icon: Palette,
      title: 'Professional Design',
      description: 'Strategic visual communications and user experience design for professional service organizations.',
      features: ['Brand Identity', 'User Interface Design', 'Documentation Design', 'Digital Assets'],
      sectors: ['Professional Services', 'Healthcare', 'Government']
    }
  ]

  const credentials = [
    { label: 'Projects Delivered', value: '50+', description: 'Successfully completed projects' },
    { label: 'Enterprise Clients', value: '30+', description: 'Trusted by organizations' },
    { label: 'Years Experience', value: '5+', description: 'In cybersecurity & development' },
    { label: 'Security Clearance', value: 'Available', description: 'Government & defense projects' }
  ]

  const trustFactors = [
    { icon: Shield, title: 'Security First', description: 'All solutions built with security and compliance at the core' },
    { icon: Users, title: 'Professional Team', description: 'Certified professionals with industry expertise' },
    { icon: Award, title: 'Proven Track Record', description: 'Trusted by law firms, medical practices, and government agencies' }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Professional Background */}
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Professional Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <motion.h1 
                  className="text-5xl md:text-6xl font-semibold text-primary leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  JCorp
                </motion.h1>
                <motion.p 
                  className="text-xl text-primary/70 mt-2 font-medium"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Professional Technology Solutions
                </motion.p>
                <motion.div 
                  className="text-sm text-primary/50 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  by lawithanx
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl text-primary/90 font-medium">
                  Cybersecurity • Development • Design
                </h2>
                <p className="text-lg text-primary/60 leading-relaxed max-w-2xl">
                  Specialized technology services for legal practices, medical organizations, and government agencies. 
                  Delivering secure, compliant, and scalable solutions with professional excellence.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/portfolio" className="btn-primary group">
                  View Our Work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Schedule Consultation
                </Link>
              </motion.div>

              {/* Trust Factors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8"
              >
                {trustFactors.map((factor, index) => (
                  <div key={factor.title} className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md mt-1">
                      <factor.icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary">{factor.title}</div>
                      <div className="text-xs text-primary/60 mt-1">{factor.description}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Business Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <BusinessCard className="animate-subtle-float" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 bg-dark-950/50 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-semibold text-primary">
                  {credential.value}
                </div>
                <div className="text-sm font-medium text-primary/80 mt-1">
                  {credential.label}
                </div>
                <div className="text-xs text-primary/50 mt-1">
                  {credential.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-6">
              Professional Services
            </h2>
            <p className="text-xl text-primary/60 max-w-3xl mx-auto">
              Comprehensive technology solutions designed for regulated industries and professional organizations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-professional hover-lift group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <service.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                </div>
                
                <p className="text-primary/60 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-medium text-primary/80">Core Services:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-primary/70 text-sm">
                        <CheckCircle size={14} className="text-primary/60 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-primary/10 pt-4">
                  <div className="text-xs text-primary/50 mb-2">Specialized for:</div>
                  <div className="flex flex-wrap gap-2">
                    {service.sectors.map((sector) => (
                      <span
                        key={sector}
                        className="text-xs bg-primary/10 text-primary/80 px-2 py-1 rounded border border-primary/20"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-dark-950/30 border-t border-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-6">
              Ready to Secure Your Organization?
            </h2>
            <p className="text-xl text-primary/60 mb-8 max-w-2xl mx-auto">
              Schedule a consultation to discuss your cybersecurity, development, or design requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Schedule Consultation
              </Link>
              <Link to="/shop" className="btn-secondary">
                View Services & Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export default Home 