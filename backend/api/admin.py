from django.contrib import admin
from api.models import CustomUser, Category, Product, ProductImage, Review, Order, OrderItem, Cart, CartItem

admin.site.register(CustomUser)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Cart)
admin.site.register(CartItem)
