from django.db import models
from django.contrib.auth import get_user_model
from apps.shop.models import Order, Product

User = get_user_model()


class DashboardItem(models.Model):
    """
    Items in client dashboard (private vault)
    """
    ITEM_TYPES = [
        ('purchase', 'Purchased Item'),
        ('project', 'Project Access'),
        ('document', 'Document'),
        ('service', 'Service'),
        ('consultation', 'Consultation'),
    ]
    
    ACCESS_LEVELS = [
        ('view', 'View Only'),
        ('download', 'Download Allowed'),
        ('edit', 'Edit Allowed'),
        ('full', 'Full Access'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dashboard_items')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    item_type = models.CharField(max_length=20, choices=ITEM_TYPES)
    access_level = models.CharField(max_length=10, choices=ACCESS_LEVELS, default='view')
    
    # File associations
    file_path = models.FileField(upload_to='dashboard/files/', blank=True, null=True)
    external_url = models.URLField(blank=True)
    
    # Related objects
    related_order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True)
    related_product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    
    # Access control
    is_active = models.BooleanField(default=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    download_count = models.PositiveIntegerField(default=0)
    download_limit = models.PositiveIntegerField(null=True, blank=True)
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        db_table = 'dashboard_items'
    
    def __str__(self):
        return f"{self.title} - {self.user.email}" 