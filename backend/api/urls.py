from django.urls import path
from api import views


urlpatterns = [
    path("test/", views.test, name="test"),
    path("register/", views.user_register, name="register"),
    path("token/", views.LoginView.as_view(), name="token"),
    path("refresh/", views.CookieTokenRefreshView.as_view(), name="refresh"),
    path("is_user_authenticated/", views.is_user_authenticated, name="is_user_authenticated"),
    path("product_retrieve/<int:pk>/", views.ProductRetrieve.as_view(), name="product_retrieve"),
    path("user_retrieve/", views.UserInfo.as_view(), name="user_retrieve"),
    path("cart_retrieve/", views.CartRetrieve.as_view(), name="cart_retrieve"),
    path("add_cart_item/", views.AddCartItem.as_view(), name="add_cart_item"),
    path("delete_cart_item/", views.DeleteCartItem.as_view(), name="delete_cart_item"),
    path("update_cart_item/", views.UpdateCartItem.as_view(), name="update_cart_item")
]