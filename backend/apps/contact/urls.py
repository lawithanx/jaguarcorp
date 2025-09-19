from django.urls import path
from . import views

app_name = 'contact'

urlpatterns = [
    path('submit/', views.ContactSubmissionView.as_view(), name='contact_submit'),
    path('faq/', views.FAQListView.as_view(), name='faq_list'),
    path('submissions/', views.ContactSubmissionListView.as_view(), name='contact_submissions'),
] 