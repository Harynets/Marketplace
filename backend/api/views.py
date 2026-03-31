from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from starlette.status import HTTP_200_OK

from backend.settings import SIMPLE_JWT

from .models import Product, CustomUser
from .serializers import UserRegisterSerializer, ProductSerializer, LoginUserSerializer, CustomUserSerializer


@api_view(["GET"])
def test(request):
    return Response({"text": "Hello world!"})


@api_view(["POST"])
def user_register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({"user": serializer.data, "refresh": str(refresh), "access": str(refresh.access_token)},
                        status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            response = Response({
                "user": CustomUserSerializer(user).data},
                status=status.HTTP_200_OK)

            response.set_cookie(key="access_token",
                                value=access_token,
                                httponly=True,
                                samesite="Lax",
                                max_age=SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds())

            response.set_cookie(key="refresh_token",
                                value=str(refresh),
                                httponly=True,
                                samesite="Lax",
                                max_age=SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds())
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error": "Refresh token not provided"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response({"message": "Access token refreshed successfully"}, status=status.HTTP_200_OK)
            response.set_cookie(key="access_token",
                                value=access_token,
                                httponly=True,
                                samesite="Lax",
                                max_age=SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds())
            return response
        except InvalidToken:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)


class ProductRetrieve(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "pk"


