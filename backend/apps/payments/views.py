from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class PaymentMethodListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({'methods': ['stripe', 'paypal', 'crypto']})

class CreateStripePaymentIntentView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        return Response({'payment_intent': 'stripe_intent_demo'})

class ConfirmStripePaymentView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        return Response({'status': 'confirmed'})

class CreateCryptoPaymentView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        return Response({'crypto_address': 'demo_address'})

class VerifyCryptoPaymentView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        return Response({'status': 'verified'})

class TransactionListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({'transactions': []}) 