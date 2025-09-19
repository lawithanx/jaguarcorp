from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'portfolio'

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'projects', views.ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('featured/', views.FeaturedProjectsView.as_view(), name='featured_projects'),
] 