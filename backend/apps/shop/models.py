from django.db import models
from django.contrib.auth import get_user_model
from decimal import Decimal

User = get_user_model()


class ProductCategory(models.Model):
    """
    Product categories for organizing shop items
    """
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name_plural = 'Product Categories'
        ordering = ['order', 'name']
        db_table = 'shop_categories'
    
    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Products available in the shop
    """
    PRODUCT_TYPES = [
        ('asset', 'Digital Asset'),
        ('service', 'Service'),
        ('partnership', 'Partnership'),
        ('merchandise', 'Merchandise'),
        ('consultation', 'Consultation'),
    ]
    
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='products')
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPES)
    
    # Basic info
    description = models.TextField()
    short_description = models.CharField(max_length=300)
    features = models.JSONField(default=list, blank=True)  # List of features
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_free = models.BooleanField(default=False)
    
    # Images and media
    featured_image = models.ImageField(upload_to='products/featured/', blank=True, null=True)
    gallery_images = models.JSONField(default=list, blank=True)
    
    # Digital assets
    digital_file = models.FileField(upload_to='products/files/', blank=True, null=True)
    download_limit = models.PositiveIntegerField(default=3)  # Number of downloads allowed
    
    # Inventory
    stock_quantity = models.PositiveIntegerField(default=0)
    is_digital = models.BooleanField(default=True)
    manage_stock = models.BooleanField(default=False)
    
    # Status and metadata
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    views_count = models.PositiveIntegerField(default=0)
    
    # SEO
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.CharField(max_length=300, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', 'order', 'name']
        db_table = 'shop_products'
    
    def __str__(self):
        return self.name
    
    @property
    def is_on_sale(self):
        return self.original_price and self.price < self.original_price
    
    @property
    def discount_percentage(self):
        if self.is_on_sale:
            return int(((self.original_price - self.price) / self.original_price) * 100)
        return 0
    
    def increment_views(self):
        """Increment view count"""
        self.views_count += 1
        self.save(update_fields=['views_count'])


class Cart(models.Model):
    """
    Shopping cart for users
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'shop_carts'
    
    def __str__(self):
        return f"Cart for {self.user.email}"
    
    @property
    def total_price(self):
        """Calculate total cart price"""
        return sum(item.total_price for item in self.items.all())
    
    @property
    def total_items(self):
        """Calculate total items in cart"""
        return sum(item.quantity for item in self.items.all())


class CartItem(models.Model):
    """
    Individual items in shopping cart
    """
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at time of adding
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['cart', 'product']
        db_table = 'shop_cart_items'
    
    def __str__(self):
        return f"{self.quantity}x {self.product.name}"
    
    @property
    def total_price(self):
        return self.price * self.quantity


class Order(models.Model):
    """
    Customer orders
    """
    ORDER_STATUS = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]
    
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    PAYMENT_METHODS = [
        ('stripe', 'Stripe'),
        ('paypal', 'PayPal'),
        ('crypto', 'Cryptocurrency'),
    ]
    
    # Order details
    order_number = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    
    # Status
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    
    # Pricing
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Payment details
    payment_intent_id = models.CharField(max_length=200, blank=True)  # Stripe payment intent
    transaction_id = models.CharField(max_length=200, blank=True)
    crypto_address = models.CharField(max_length=200, blank=True)
    crypto_amount = models.DecimalField(max_digits=20, decimal_places=8, null=True, blank=True)
    
    # Billing information
    billing_email = models.EmailField()
    billing_first_name = models.CharField(max_length=50)
    billing_last_name = models.CharField(max_length=50)
    billing_address = models.TextField(blank=True)
    billing_city = models.CharField(max_length=50, blank=True)
    billing_state = models.CharField(max_length=50, blank=True)
    billing_zip_code = models.CharField(max_length=10, blank=True)
    billing_country = models.CharField(max_length=50, blank=True)
    
    # Metadata
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        db_table = 'shop_orders'
    
    def __str__(self):
        return f"Order {self.order_number}"
    
    def save(self, *args, **kwargs):
        if not self.order_number:
            # Generate order number
            import uuid
            self.order_number = f"JC{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    """
    Individual items in an order
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at time of purchase
    
    # For digital products
    download_count = models.PositiveIntegerField(default=0)
    download_expires_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'shop_order_items'
    
    def __str__(self):
        return f"{self.quantity}x {self.product.name} (Order {self.order.order_number})"
    
    @property
    def total_price(self):
        return self.price * self.quantity


class Coupon(models.Model):
    """
    Discount coupons
    """
    DISCOUNT_TYPES = [
        ('percentage', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]
    
    code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(max_length=20, choices=DISCOUNT_TYPES)
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Usage limits
    usage_limit = models.PositiveIntegerField(null=True, blank=True)
    used_count = models.PositiveIntegerField(default=0)
    
    # Validity
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()
    
    # Restrictions
    minimum_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    applicable_products = models.ManyToManyField(Product, blank=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'shop_coupons'
    
    def __str__(self):
        return self.code
    
    def is_valid(self):
        """Check if coupon is valid"""
        from django.utils import timezone
        now = timezone.now()
        return (
            self.is_active and
            self.valid_from <= now <= self.valid_until and
            (self.usage_limit is None or self.used_count < self.usage_limit)
        ) 