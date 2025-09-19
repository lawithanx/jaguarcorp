from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ContactSubmission(models.Model):
    """
    Model for storing contact form submissions.
    """
    name = models.CharField(max_length=100)
    email = models.EmailField()
    company = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    project_type = models.CharField(max_length=100, blank=True)
    urgency = models.CharField(max_length=50, blank=True)
    budget = models.CharField(max_length=50, blank=True)
    message = models.TextField()
    clearance_required = models.BooleanField(default=False)
    compliance_needs = models.JSONField(default=list, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_read = models.BooleanField(default=False)
    response_sent = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"Contact from {self.name} - {self.email}"

class FAQ(models.Model):
    """
    Model for frequently asked questions.
    """
    CATEGORY_CHOICES = [
        ('general', 'General'),
        ('cybersecurity', 'Cybersecurity'),
        ('development', 'Development'),
        ('design', 'Design'),
        ('pricing', 'Pricing'),
        ('legal', 'Legal'),
        ('technical', 'Technical'),
    ]
    
    question = models.CharField(max_length=500)
    answer = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', 'created_at']
        
    def __str__(self):
        return self.question[:100] 