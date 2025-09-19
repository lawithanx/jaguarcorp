#!/usr/bin/env python
"""
Sample data creation script for JCorp application
Run with: python manage.py shell < create_sample_data.py
"""

import os
import django
from datetime import date, datetime, timedelta
from decimal import Decimal

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.portfolio.models import Category, Project
from apps.shop.models import ProductCategory, Product
from apps.contact.models import FAQ

User = get_user_model()

def create_sample_data():
    """Create sample data for the application"""
    
    print("Creating sample data...")
    
    # Create users
    admin_user, created = User.objects.get_or_create(
        email='admin@jcorp.dev',
        defaults={
            'username': 'admin',
            'first_name': 'Admin',
            'last_name': 'User',
            'user_type': 'admin',
            'is_staff': True,
            'is_superuser': True,
            'is_verified': True,
        }
    )
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print("Created admin user")
    
    # Create test users for different types
    user_types = ['general', 'law', 'medical', 'financial']
    for user_type in user_types:
        user, created = User.objects.get_or_create(
            email=f'{user_type}@test.com',
            defaults={
                'username': f'{user_type}_user',
                'first_name': user_type.capitalize(),
                'last_name': 'User',
                'user_type': user_type,
                'is_verified': True,
            }
        )
        if created:
            user.set_password('password123')
            user.save()
            print(f"Created {user_type} user")
    
    # Create portfolio categories
    portfolio_categories = [
        {
            'name': 'Web Development',
            'slug': 'web-development',
            'description': 'Full-stack web applications and websites',
            'icon': 'globe',
            'visibility': 'public'
        },
        {
            'name': 'Cybersecurity',
            'slug': 'cybersecurity',
            'description': 'Security audits and penetration testing',
            'icon': 'shield',
            'visibility': 'public'
        },
        {
            'name': 'Legal Tech',
            'slug': 'legal-tech',
            'description': 'Technology solutions for legal practices',
            'icon': 'scales',
            'visibility': 'law'
        },
        {
            'name': 'Medical Systems',
            'slug': 'medical-systems',
            'description': 'Healthcare technology solutions',
            'icon': 'medical',
            'visibility': 'medical'
        },
        {
            'name': 'Financial Software',
            'slug': 'financial-software',
            'description': 'Financial technology and trading systems',
            'icon': 'dollar',
            'visibility': 'financial'
        }
    ]
    
    for cat_data in portfolio_categories:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        if created:
            print(f"Created portfolio category: {category.name}")
    
    # Create sample projects
    projects = [
        {
            'title': 'E-commerce Platform',
            'slug': 'ecommerce-platform',
            'category': Category.objects.get(slug='web-development'),
            'description': 'Full-featured e-commerce platform with payment integration',
            'short_description': 'Modern e-commerce solution',
            'technologies': ['React', 'Django', 'PostgreSQL', 'Stripe'],
            'project_date': date.today() - timedelta(days=30),
            'visibility': 'public',
            'is_featured': True,
        },
        {
            'title': 'Penetration Testing Framework',
            'slug': 'pentest-framework',
            'category': Category.objects.get(slug='cybersecurity'),
            'description': 'Automated penetration testing and vulnerability assessment tool',
            'short_description': 'Security testing automation',
            'technologies': ['Python', 'Nmap', 'Metasploit', 'Docker'],
            'project_date': date.today() - timedelta(days=60),
            'visibility': 'public',
            'is_featured': True,
        },
        {
            'title': 'Legal Case Management',
            'slug': 'legal-case-management',
            'category': Category.objects.get(slug='legal-tech'),
            'description': 'Comprehensive case management system for law firms',
            'short_description': 'Law firm management system',
            'technologies': ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
            'project_date': date.today() - timedelta(days=90),
            'visibility': 'law',
            'is_featured': False,
        }
    ]
    
    for proj_data in projects:
        project, created = Project.objects.get_or_create(
            slug=proj_data['slug'],
            defaults=proj_data
        )
        if created:
            print(f"Created project: {project.title}")
    
    # Create product categories
    product_categories = [
        {
            'name': 'Digital Assets',
            'slug': 'digital-assets',
            'description': 'Source code, templates, and digital tools'
        },
        {
            'name': 'Services',
            'slug': 'services',
            'description': 'Professional services and consultations'
        },
        {
            'name': 'Partnerships',
            'slug': 'partnerships',
            'description': 'Business partnership opportunities'
        },
        {
            'name': 'Merchandise',
            'slug': 'merchandise',
            'description': 'JCorp branded merchandise'
        }
    ]
    
    for cat_data in product_categories:
        category, created = ProductCategory.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        if created:
            print(f"Created product category: {category.name}")
    
    # Create sample products
    products = [
        {
            'name': 'React Dashboard Template',
            'slug': 'react-dashboard-template',
            'category': ProductCategory.objects.get(slug='digital-assets'),
            'product_type': 'asset',
            'description': 'Professional React dashboard with multiple themes',
            'short_description': 'Complete React admin dashboard',
            'price': Decimal('99.99'),
            'features': ['Multiple themes', 'Responsive design', 'TypeScript support'],
            'is_featured': True,
        },
        {
            'name': 'Security Audit Service',
            'slug': 'security-audit-service',
            'category': ProductCategory.objects.get(slug='services'),
            'product_type': 'service',
            'description': 'Comprehensive security audit for your web application',
            'short_description': 'Professional security assessment',
            'price': Decimal('499.99'),
            'features': ['Vulnerability assessment', 'Penetration testing', 'Detailed report'],
            'is_featured': True,
        },
        {
            'name': 'Tech Partnership Program',
            'slug': 'tech-partnership',
            'category': ProductCategory.objects.get(slug='partnerships'),
            'product_type': 'partnership',
            'description': 'Strategic technology partnership for growing businesses',
            'short_description': 'Strategic tech partnership',
            'price': Decimal('0.00'),
            'is_free': True,
            'features': ['Technical consultation', 'Development support', 'Regular reviews'],
        }
    ]
    
    for prod_data in products:
        product, created = Product.objects.get_or_create(
            slug=prod_data['slug'],
            defaults=prod_data
        )
        if created:
            print(f"Created product: {product.name}")
    
    # Create FAQ entries
    faqs = [
        {
            'question': 'What services does JCorp offer?',
            'answer': 'JCorp specializes in cybersecurity, full-stack web development, and graphic design services.',
            'category': 'general'
        },
        {
            'question': 'How do I get started with a project?',
            'answer': 'Contact us through the contact form or email to discuss your project requirements.',
            'category': 'general'
        },
        {
            'question': 'What payment methods do you accept?',
            'answer': 'We accept credit cards via Stripe, PayPal, and various cryptocurrencies including Bitcoin.',
            'category': 'pricing'
        },
        {
            'question': 'Do you provide ongoing support?',
            'answer': 'Yes, we offer maintenance and support packages for all our services.',
            'category': 'support'
        }
    ]
    
    for faq_data in faqs:
        faq, created = FAQ.objects.get_or_create(
            question=faq_data['question'],
            defaults=faq_data
        )
        if created:
            print(f"Created FAQ: {faq.question}")
    
    print("Sample data creation completed!")

if __name__ == '__main__':
    create_sample_data() 