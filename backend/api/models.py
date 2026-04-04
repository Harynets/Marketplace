from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import ForeignKey, OneToOneField


# authentication with email instead of username
class CustomUserManager(BaseUserManager):

    # create a user with email and password
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    # create superuser with email and password
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.first_name}_{self.last_name}"


class Category(models.Model):
    name = models.CharField(max_length=130)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категорія"
        verbose_name_plural = "Категорії"


class Product(models.Model):
    name = models.CharField(max_length=160)
    price = models.DecimalField(max_digits=14, decimal_places=2)
    discount = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)])
    specifications = models.JSONField(null=True, blank=True)
    description = models.TextField()
    quantity_in_stock = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    is_available = models.BooleanField(default=True)
    seller = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, related_name="products", blank=True, null=True)

    # set is_available to False if there is no products left
    def save(self, *args, **kwargs):
        if self.quantity_in_stock == 0:
            self.is_available = False
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товари"


class ProductImage(models.Model):
    image = models.ImageField(upload_to="product_images/")
    is_main_image = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")

    # ensure only one image is marked as main for the product
    def save(self, *args, **kwargs):
        if self.is_main_image:
            self.product.images.all().exclude(pk=self.pk).update(is_main_image=False)

        if not self.product.images.filter(is_main_image=True).exists():
            self.is_main_image = True

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Фото для {self.product.name}"

    class Meta:
        verbose_name = "Фото товару"
        verbose_name_plural = "Фото товарів"


class Review(models.Model):
    text = models.TextField()
    image = models.ImageField(upload_to="review_images/", blank=True, null=True)
    rating = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="reviews")

    def __str__(self):
        return f"Відгук {self.user} на товар {self.product}"

    class Meta:
        verbose_name = "Відгук"
        verbose_name_plural = "Відгуки"


class Order(models.Model):
    STATUS_CHOICES = [
        ("new", "Новий"),
        ("packing", "Комплектується"),
        ("sent", "Відправлено"),
        ("delivered", "Доставлено"),
        ("completed", "Виконано"),
        ("cancelled", "Скасовано"),
        ("returned", "Повернуто"),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    shipping_address = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)

    @property
    def full_price(self):
        return round(sum(item.price_at_order * item.quantity * ((100 - item.discount_at_order) / 100 if item.discount_at_order else 1) for item in self.order_items.all()), 2)

    def __str__(self):
        return f"Замовлення №{self.pk} для покупця {self.user}"

    class Meta:
        verbose_name = "Замовлення"
        verbose_name_plural = "Замовлення"


class OrderItem(models.Model):
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    price_at_order = models.DecimalField(max_digits=14, decimal_places=2)
    discount_at_order = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)])
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")

    def __str__(self):
        return f"{self.product} в замовленні №{self.order.pk}"

    class Meta:
        verbose_name = "Товар в замовленні"
        verbose_name_plural = "Товари в замовленні"


class Cart(models.Model):
    user = OneToOneField(CustomUser, models.CASCADE, related_name="cart")

    @property
    def full_price(self):
        return round(sum(item.product.price * item.quantity *((100 - item.product.discount) / 100 if item.product.discount else 1) for item in self.cart_items.all()), 2)

    def __str__(self):
        return f"Кошик користувача {self.user}"

    class Meta:
        verbose_name = "Кошик"
        verbose_name_plural = "Кошики"


class CartItem(models.Model):
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    product = ForeignKey(Product, models.CASCADE)
    cart = ForeignKey(Cart, models.CASCADE, related_name="cart_items")

    def __str__(self):
        return f"Товар {self.product} в кошику {self.cart}"

    class Meta:
        verbose_name = "Товар в кошику"
        verbose_name_plural = "Товари в кошиках"