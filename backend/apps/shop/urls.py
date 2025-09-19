from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'shop'

router = DefaultRouter()
router.register(r'categories', views.ProductCategoryViewSet)
router.register(r'products', views.ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/add/', views.AddToCartView.as_view(), name='add_to_cart'),
    path('cart/remove/', views.RemoveFromCartView.as_view(), name='remove_from_cart'),
    path('checkout/', views.CheckoutView.as_view(), name='checkout'),
    path('orders/', views.OrderListView.as_view(), name='orders'),
] 