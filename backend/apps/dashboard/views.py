from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DashboardItem
from .serializers import DashboardItemSerializer

class DashboardItemListView(generics.ListAPIView):
    serializer_class = DashboardItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return DashboardItem.objects.filter(user=self.request.user, is_active=True)

class DashboardItemDetailView(generics.RetrieveAPIView):
    serializer_class = DashboardItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return DashboardItem.objects.filter(user=self.request.user, is_active=True)

class ClientNoteListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({'notes': []})

class ActivityLogListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({'activities': []})

class DashboardSettingsView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({'settings': {}}) 