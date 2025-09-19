from django.urls import path
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('items/', views.DashboardItemListView.as_view(), name='dashboard_items'),
    path('items/<int:pk>/', views.DashboardItemDetailView.as_view(), name='dashboard_item_detail'),
    path('notes/', views.ClientNoteListView.as_view(), name='client_notes'),
    path('activity/', views.ActivityLogListView.as_view(), name='activity_log'),
    path('settings/', views.DashboardSettingsView.as_view(), name='dashboard_settings'),
] 