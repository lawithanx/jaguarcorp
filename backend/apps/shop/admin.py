from django.contrib import admin
from .models import ProductCategory, Product, Cart, CartItem, Order, OrderItem, Coupon

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'parent', 'order', 'is_active')
    list_filter = ('is_active', 'parent')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order', 'name')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'product_type', 'price', 'is_featured', 'is_active', 'stock_quantity')
    list_filter = ('category', 'product_type', 'is_featured', 'is_active', 'is_digital')
    search_fields = ('name', 'description', 'features')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('-is_featured', 'order')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'status', 'payment_status', 'total_amount', 'created_at')
    list_filter = ('status', 'payment_status', 'payment_method', 'created_at')
    search_fields = ('order_number', 'user__email', 'user__first_name', 'user__last_name')
    readonly_fields = ('order_number', 'created_at', 'updated_at')
    ordering = ('-created_at',)

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_type', 'discount_value', 'usage_limit', 'used_count', 'is_active')
    list_filter = ('discount_type', 'is_active', 'valid_from', 'valid_until')
    search_fields = ('code',)
    ordering = ('-created_at',) 