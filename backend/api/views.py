from django.shortcuts import get_object_or_404
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from backend.settings import SIMPLE_JWT

from .models import Product, CustomUser, Cart, CartItem
from .serializers import UserRegisterSerializer, ProductSerializer, LoginUserSerializer, CustomUserSerializer, \
    CartSerializer, CartItemSerializer


@api_view(["GET"])
def test(request):
    return Response({"text": "Hello world!"})


@api_view(["POST"])
def user_register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        Cart.objects.create(user=user)
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


class UserInfo(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = CustomUserSerializer(CustomUser.objects.get(pk=request.user.pk))
        return Response(user.data, status=HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def is_user_authenticated(request):
    return Response({"is_user_authenticated": True}, status=HTTP_200_OK)


class ProductRetrieve(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "pk"


class CartRetrieve(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_object(self):
        return Cart.objects.get(user=self.request.user)


class AddCartItem(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

    def create(self, request, *args, **kwargs):
        product = get_object_or_404(Product, pk=request.data.get("product_id"))
        cart = Cart.objects.get(user=request.user)

        if not product.is_available:
            return Response({"result":"product is not available!"}, status=HTTP_400_BAD_REQUEST)

        if product in [item.product for item in cart.cart_items.all()]:
            return Response({"result":"item already in the cart!"}, status=HTTP_400_BAD_REQUEST)

        CartItem.objects.create(product=product, cart=cart, quantity=1)

        return Response({"result":"item created"}, status=HTTP_201_CREATED)


class DeleteCartItem(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

    def destroy(self, request, *args, **kwargs):
        cart_item = get_object_or_404(CartItem, pk=request.data.get("cart_item_id"), cart__user=request.user)
        cart_item.delete()

        return Response({"result":"cart item deleted"}, status=HTTP_200_OK)


class UpdateCartItem(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

    def update(self, request, *args, **kwargs):
        cart_item = get_object_or_404(CartItem, pk=request.data.get("cart_item_id"), cart__user=request.user)
        cart_item.quantity = request.data.get("quantity")
        cart_item.save()

        return Response({"result": "updated"}, status=HTTP_200_OK)