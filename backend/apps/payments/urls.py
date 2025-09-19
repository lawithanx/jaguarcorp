from django.urls import path
from . import views

app_name = 'payments'

urlpatterns = [
    path('methods/', views.PaymentMethodListView.as_view(), name='payment_methods'),
    path('stripe/create-intent/', views.CreateStripePaymentIntentView.as_view(), name='stripe_create_intent'),
    path('stripe/confirm/', views.ConfirmStripePaymentView.as_view(), name='stripe_confirm'),
    path('crypto/create/', views.CreateCryptoPaymentView.as_view(), name='crypto_create'),
    path('crypto/verify/', views.VerifyCryptoPaymentView.as_view(), name='crypto_verify'),
    path('transactions/', views.TransactionListView.as_view(), name='transactions'),
] 