from rest_framework import serializers
from .models import Category, Project, ProjectImage, Testimonial

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 'color', 'order', 'visibility']

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'client_name', 'client_title', 'client_company', 'client_image', 'testimonial_text', 'rating', 'is_featured']

class ProjectSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True, source='projectimage_set')
    testimonials = TestimonialSerializer(many=True, read_only=True, source='testimonial_set')
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'description', 'short_description',
            'featured_image', 'gallery_images', 'demo_url', 'repository_url',
            'technologies', 'client_name', 'project_date', 'duration',
            'visibility', 'is_featured', 'views_count', 'images', 'testimonials'
        ] 