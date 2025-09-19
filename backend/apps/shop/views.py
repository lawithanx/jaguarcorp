from rest_framework import viewsets, generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import ProductCategory, Product, Cart, CartItem, Order, OrderItem, Coupon
from .serializers import (
    ProductCategorySerializer, ProductSerializer, CartSerializer, 
    CartItemSerializer, OrderSerializer, OrderItemSerializer, CouponSerializer
)

class ProductCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing product categories.
    """
    queryset = ProductCategory.objects.filter(is_active=True).order_by('order')
    serializer_class = ProductCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing products.
    """
    queryset = Product.objects.filter(is_active=True).order_by('-is_featured', 'order')
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)
        
        if category is not None:
            queryset = queryset.filter(category__slug=category)
        
        if search is not None:
            queryset = queryset.filter(name__icontains=search)
            
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.increment_views()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class CartView(generics.RetrieveAPIView):
    """
    Get user's cart.
    """
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

class AddToCartView(generics.CreateAPIView):
    """
    Add item to cart.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        
        product = get_object_or_404(Product, id=product_id)
        cart, created = Cart.objects.get_or_create(user=request.user)
        
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, 
            product=product,
            defaults={'quantity': quantity, 'price': product.price}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        
        return Response({
            'message': 'Item added to cart',
            'cart_item_id': cart_item.id,
            'quantity': cart_item.quantity
        }, status=status.HTTP_201_CREATED)

class RemoveFromCartView(generics.DestroyAPIView):
    """
    Remove item from cart.
    """
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        item_id = request.data.get('item_id')
        cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
        cart_item.delete()
        
        return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)

class CheckoutView(generics.CreateAPIView):
    """
    Process checkout.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        cart = get_object_or_404(Cart, user=request.user)
        
        if not cart.cartitem_set.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create order
        order = Order.objects.create(
            user=request.user,
            subtotal=cart.total_price,
            total_amount=cart.total_price,
            status='pending'
        )
        
        # Create order items
        for cart_item in cart.cartitem_set.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.price
            )
        
        # Clear cart
        cart.cartitem_set.all().delete()
        
        return Response({
            'message': 'Order created successfully',
            'order_id': order.id,
            'order_number': order.order_number
        }, status=status.HTTP_201_CREATED)

class OrderListView(generics.ListAPIView):
    """
    List user's orders.
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

@api_view(['GET'])
def shop_stats(request):
    """
    Get shop statistics.
    """
    stats = {
        'total_products': Product.objects.filter(is_active=True).count(),
        'categories': ProductCategory.objects.filter(is_active=True).count(),
        'featured_products': Product.objects.filter(is_featured=True, is_active=True).count(),
        'total_orders': Order.objects.count() if request.user.is_staff else 0
    }
    return Response(stats) 