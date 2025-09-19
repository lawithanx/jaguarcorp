from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

class ContactSubmissionView(generics.CreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def post(self, request):
        return Response({'message': 'Contact form submitted successfully'})

class FAQListView(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get(self, request):
        return Response({'faqs': []})

class ContactSubmissionListView(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get(self, request):
        return Response({'submissions': []}) 