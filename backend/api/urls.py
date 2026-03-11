from django.urls import path
from api import views
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path("test/", views.test, name="test"),
    path("register/", views.user_register, name="register"),
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token"),
    path("refresh/", jwt_views.TokenRefreshView.as_view(), name="refresh"),
]