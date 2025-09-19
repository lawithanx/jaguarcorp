from django.contrib import admin
from .models import Category, Project, ProjectImage, Testimonial

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'visibility', 'order', 'is_active')
    list_filter = ('visibility', 'is_active')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order', 'name')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'client_name', 'is_featured', 'is_active', 'views_count')
    list_filter = ('category', 'is_featured', 'is_active', 'visibility', 'project_date')
    search_fields = ('title', 'description', 'client_name', 'technologies')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('-is_featured', 'order')
    date_hierarchy = 'project_date'

@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ('project', 'caption', 'order')
    list_filter = ('project',)
    ordering = ('project', 'order')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'project', 'rating', 'is_featured')
    list_filter = ('rating', 'is_featured', 'project')
    search_fields = ('client_name', 'client_company', 'testimonial_text')
    ordering = ('-is_featured', '-rating') 