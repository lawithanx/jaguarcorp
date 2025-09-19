"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # API endpoints
    path('api/auth/', include('apps.authentication.urls')),
    path('api/portfolio/', include('apps.portfolio.urls')),
    path('api/shop/', include('apps.shop.urls')),
    path('api/dashboard/', include('apps.dashboard.urls')),
    path('api/contact/', include('apps.contact.urls')),
    path('api/payments/', include('apps.payments.urls')),
    
    # Frontend routes - serve React app for all non-API routes
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('portfolio/', TemplateView.as_view(template_name='index.html'), name='portfolio'),
    path('portfolio/investments/', TemplateView.as_view(template_name='index.html'), name='investments'),
    path('shop/', TemplateView.as_view(template_name='index.html'), name='shop'),
    path('contact/', TemplateView.as_view(template_name='index.html'), name='contact'),
    path('login/', TemplateView.as_view(template_name='index.html'), name='login'),
    path('dashboard/', TemplateView.as_view(template_name='index.html'), name='dashboard'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
