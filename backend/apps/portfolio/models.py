from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    """
    Portfolio categories for organizing projects
    """
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)  # Icon class name
    color = models.CharField(max_length=7, default='#00ff00')  # Hex color
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    # Access control
    VISIBILITY_CHOICES = [
        ('public', 'Public'),
        ('law', 'Law Clients Only'),
        ('medical', 'Medical Clients Only'),
        ('financial', 'Financial Clients Only'),
        ('private', 'Private/Admin Only'),
    ]
    visibility = models.CharField(max_length=20, choices=VISIBILITY_CHOICES, default='public')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['order', 'name']
        db_table = 'portfolio_categories'
    
    def __str__(self):
        return self.name


class Project(models.Model):
    """
    Individual portfolio projects
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='projects')
    description = models.TextField()
    short_description = models.CharField(max_length=300)
    
    # Images and media
    featured_image = models.ImageField(upload_to='portfolio/featured/', blank=True, null=True)
    gallery_images = models.JSONField(default=list, blank=True)  # List of image URLs
    demo_url = models.URLField(blank=True)
    repository_url = models.URLField(blank=True)
    
    # Project details
    technologies = models.JSONField(default=list, blank=True)  # List of technologies used
    client_name = models.CharField(max_length=100, blank=True)
    project_date = models.DateField()
    duration = models.CharField(max_length=50, blank=True)  # e.g., "3 months"
    
    # Access control
    VISIBILITY_CHOICES = [
        ('public', 'Public'),
        ('law', 'Law Clients Only'),
        ('medical', 'Medical Clients Only'),
        ('financial', 'Financial Clients Only'),
        ('private', 'Private/Admin Only'),
    ]
    visibility = models.CharField(max_length=20, choices=VISIBILITY_CHOICES, default='public')
    
    # Status and metadata
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    views_count = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', 'order', '-project_date']
        db_table = 'portfolio_projects'
    
    def __str__(self):
        return self.title
    
    def increment_views(self):
        """Increment view count"""
        self.views_count += 1
        self.save(update_fields=['views_count'])


class ProjectImage(models.Model):
    """
    Additional images for projects
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='portfolio/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        db_table = 'portfolio_project_images'
    
    def __str__(self):
        return f"{self.project.title} - Image {self.order}"


class Testimonial(models.Model):
    """
    Client testimonials for projects
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='testimonials')
    client_name = models.CharField(max_length=100)
    client_title = models.CharField(max_length=100, blank=True)
    client_company = models.CharField(max_length=100, blank=True)
    client_image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    testimonial_text = models.TextField()
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-is_featured', '-created_at']
        db_table = 'portfolio_testimonials'
    
    def __str__(self):
        return f"{self.client_name} - {self.project.title}" 