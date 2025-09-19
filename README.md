# JCorp - Full-Stack Web Application

A comprehensive full-stack web application featuring a brand showcase, interactive catalog/shop, portfolio display, and client dashboard with role-based access. Built with React frontend and Django backend, integrating both Web2 and Web3 payments.

## 🌟 Features

### Frontend (React + TypeScript)
- **Interactive 3D Business Card**: Premium, signature-quality rotating business card with mouse interactions
- **Role-Based Portfolio**: Categorized projects with different views for law, medical, financial, and general clients
- **E-commerce Shop**: Searchable, filterable catalog with cart functionality
- **Client Dashboard**: Private vault for authenticated users showing purchased items and project access
- **Modern UI/UX**: Military-tech inspired design with neon green and black theme
- **Responsive Design**: Optimized for all devices and viewports
- **Payment Integration**: Stripe, PayPal, and cryptocurrency support

### Backend (Django + PostgreSQL)
- **RESTful API**: Comprehensive API endpoints for all functionality
- **User Authentication**: JWT token-based authentication with role-based access control
- **Database Models**: User management, products, orders, portfolio, dashboard, and payments
- **File Management**: Secure file uploads and downloads
- **Email Integration**: Contact form submissions and notifications
- **Admin Interface**: Django admin for content management

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- PostgreSQL 12+
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jcorp
   ```

2. **Set up Python virtual environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp ../env.example .env
   # Edit .env with your configuration
   ```

5. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb jcorp_db
   # Create user
   createuser jcorp_user
   # Grant privileges
   psql -c "ALTER USER jcorp_user CREATEDB;"
   psql -c "GRANT ALL PRIVILEGES ON DATABASE jcorp_db TO jcorp_user;"
   ```

6. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

8. **Start development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Panel: http://localhost:8000/admin

## 📁 Project Structure

```
jcorp/
├── backend/
│   ├── core/                 # Django project settings
│   ├── apps/
│   │   ├── authentication/   # User management
│   │   ├── portfolio/        # Project showcase
│   │   ├── shop/            # E-commerce functionality
│   │   ├── dashboard/       # Client vault
│   │   ├── contact/         # Contact forms
│   │   └── payments/        # Payment processing
│   ├── static/              # Static files
│   ├── media/               # User uploads
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json         # Node dependencies
└── README.md
```

## 🔧 Configuration

### Environment Variables (.env)

```bash
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
DB_NAME=jcorp_db
DB_USER=jcorp_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

# Payment Integration
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_email_password
```

## 🎨 Design System

### Colors
- **Primary**: #00ff00 (Neon Green)
- **Background**: #1a1a1a (Dark)
- **Text**: #00ff00 (Primary Green)
- **Accents**: Various shades of green and dark tones

### Typography
- **Headings**: Orbitron (Tech font)
- **Body**: System font stack
- **Code/Mono**: Monaco, Menlo, Ubuntu Mono

### Components
- Military-tech inspired design
- Cyber grid patterns
- Glowing effects and animations
- Glass morphism elements
- Responsive card layouts

## 🚀 Deployment

### Production Deployment

1. **Set production environment variables**
2. **Configure static file serving**
3. **Set up SSL certificates**
4. **Configure database for production**
5. **Set up monitoring and logging**

### Docker Deployment (Optional)

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🔒 Security Features

- JWT token authentication
- CORS configuration
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure file uploads
- Environment variable management

## 📈 Features by User Type

### General Users
- Portfolio viewing
- Shop access
- Contact form
- Basic dashboard

### Law Clients
- Legal documents access
- Case management tools
- Legal consultation booking

### Medical Clients
- Medical reports access
- Health data management
- Telemedicine features

### Financial Clients
- Financial reports
- Investment tracking
- Tax planning tools

### Admin Users
- User management
- Analytics dashboard
- System settings
- Content management

## 🧪 Testing

### Backend Testing
```bash
cd backend
python manage.py test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📝 API Documentation

The API follows RESTful conventions with the following main endpoints:

- `/api/auth/` - Authentication endpoints
- `/api/portfolio/` - Portfolio management
- `/api/shop/` - E-commerce functionality
- `/api/dashboard/` - Client dashboard
- `/api/contact/` - Contact forms
- `/api/payments/` - Payment processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software owned by JCorp (lawithanx).

## 📞 Contact

- **Email**: lawithanx@gmail.com
- **Bitcoin**: bc1qghu4p0gktdccuph29vznclmg8krp3re6l5keht
- **Portfolio**: https://github.com/lawithanx/jaguarcorp

## 🔧 Development Notes

- Follow the existing code style and patterns
- Use snake_case for backend fields
- Use camelCase for frontend variables
- Ensure mobile responsiveness
- Test on multiple browsers and devices
- Maintain security best practices 