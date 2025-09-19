from django.urls import path
from . import views

app_name = 'authentication'

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('user/', views.UserDetailView.as_view(), name='user_detail'),
    path('change-password/', views.change_password, name='change_password'),
    path('dashboard/', views.user_dashboard_data, name='dashboard_data'),
] 