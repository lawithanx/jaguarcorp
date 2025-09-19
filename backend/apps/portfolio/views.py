from rest_framework import viewsets, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Category, Project, ProjectImage, Testimonial
from .serializers import CategorySerializer, ProjectSerializer, ProjectImageSerializer, TestimonialSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing categories.
    """
    queryset = Category.objects.filter(is_active=True).order_by('order')
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing projects.
    """
    queryset = Project.objects.filter(is_active=True).order_by('-is_featured', 'order')
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category__slug=category)
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.increment_views()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class FeaturedProjectsView(generics.ListAPIView):
    """
    A view for getting featured projects.
    """
    queryset = Project.objects.filter(is_featured=True, is_active=True).order_by('order')
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

@api_view(['GET'])
def portfolio_stats(request):
    """
    Get portfolio statistics.
    """
    stats = {
        'total_projects': Project.objects.filter(is_active=True).count(),
        'categories': Category.objects.filter(is_active=True).count(),
        'featured_projects': Project.objects.filter(is_featured=True, is_active=True).count(),
        'total_views': sum(Project.objects.filter(is_active=True).values_list('views_count', flat=True))
    }
    return Response(stats) 