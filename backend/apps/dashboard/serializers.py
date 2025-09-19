from rest_framework import serializers
from .models import DashboardItem

class DashboardItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardItem
        fields = [
            'id', 'title', 'description', 'item_type', 'access_level',
            'file_path', 'external_url', 'is_active', 'expires_at',
            'download_count', 'download_limit', 'metadata', 'created_at', 'updated_at'
        ] 