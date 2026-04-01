from django.urls import path
from api import views


urlpatterns = [
    path("test/", views.test, name="test"),
    path("register/", views.user_register, name="register"),
    path("token/", views.LoginView.as_view(), name="token"),
    path("refresh/", views.CookieTokenRefreshView.as_view(), name="refresh"),
    path("product_retrieve/<int:pk>/", views.ProductRetrieve.as_view(), name="product_retrieve"),
    path("user_retrieve/", views.UserInfo.as_view(), name="user_retrieve"),
    path("is_user_authenticated/", views.is_user_authenticated, name="is_user_authenticated")
]