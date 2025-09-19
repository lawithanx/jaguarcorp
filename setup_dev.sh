#!/bin/bash

# JCorp Development Setup Script
# This script automates the setup process for the JCorp application

set -e  # Exit on any error

echo "🚀 Starting JCorp Development Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on supported OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    print_status "Detected Linux system"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    print_status "Detected macOS system"
else
    print_warning "This script is optimized for Linux/macOS. Proceed with caution."
fi

# Check prerequisites
print_status "Checking prerequisites..."

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1 | cut -d" " -f2)
    print_success "Python $PYTHON_VERSION found"
else
    print_error "Python 3 is required but not installed"
    exit 1
fi

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js $NODE_VERSION found"
else
    print_error "Node.js is required but not installed"
    exit 1
fi

# Check PostgreSQL
if command -v psql &> /dev/null; then
    print_success "PostgreSQL found"
else
    print_warning "PostgreSQL not found. Please install PostgreSQL before continuing."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Setup backend
print_status "Setting up Django backend..."

cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
    print_success "Virtual environment created"
else
    print_status "Virtual environment already exists"
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
print_status "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
print_success "Python dependencies installed"

# Setup environment file
if [ ! -f ".env" ]; then
    print_status "Creating environment file..."
    cp ../env.example .env
    print_warning "Please edit .env file with your database credentials and other settings"
else
    print_status "Environment file already exists"
fi

# Database setup
print_status "Setting up database..."
read -p "Do you want to create the database? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Creating database migrations..."
    python manage.py makemigrations
    print_status "Running database migrations..."
    python manage.py migrate
    print_success "Database setup completed"
    
    read -p "Do you want to create sample data? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Creating sample data..."
        python manage.py shell < create_sample_data.py
        print_success "Sample data created"
    fi
    
    read -p "Do you want to create a superuser? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Creating superuser..."
        python manage.py createsuperuser
        print_success "Superuser created"
    fi
fi

# Return to root directory
cd ..

# Setup frontend
print_status "Setting up React frontend..."

cd frontend

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
npm install
print_success "Node.js dependencies installed"

# Return to root directory
cd ..

print_success "🎉 Setup completed successfully!"
print_status "Next steps:"
echo "1. Edit backend/.env with your configuration"
echo "2. Start the backend: cd backend && source venv/bin/activate && python manage.py runserver"
echo "3. Start the frontend: cd frontend && npm run dev"
echo "4. Visit http://localhost:3000 to see the application"
echo ""
print_status "Available test accounts:"
echo "- Admin: admin@jcorp.dev / admin123"
echo "- General: general@test.com / password123"
echo "- Law: law@test.com / password123"
echo "- Medical: medical@test.com / password123"
echo "- Financial: financial@test.com / password123"
echo ""
print_status "Happy coding! 🚀" 