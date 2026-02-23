from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction

from .models import Cart, Wishlist, Address, Order
from .serializers import *


# 🛒 CART

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product')
    quantity = request.data.get('quantity', 1)

    if not product_id:
        return Response({"error": "Product ID required"}, status=400)

    # Prevent duplicate cart items
    cart_item, created = Cart.objects.get_or_create(
        user=request.user,
        product_id=product_id,
        defaults={"quantity": quantity}
    )

    if not created:
        cart_item.quantity += int(quantity)
        cart_item.save()

    return Response({"message": "Added to cart"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    cart = Cart.objects.filter(user=request.user)
    serializer = CartSerializer(cart, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, pk):
    cart_item = get_object_or_404(Cart, id=pk, user=request.user)
    cart_item.delete()
    return Response({"message": "Removed from cart"})


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request, pk):
    cart_item = get_object_or_404(Cart, id=pk, user=request.user)

    quantity = request.data.get('quantity')
    if not quantity or int(quantity) < 1:
        return Response({"error": "Invalid quantity"}, status=400)

    cart_item.quantity = quantity
    cart_item.save()

    return Response({"message": "Quantity updated"})


# ❤️ WISHLIST

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_wishlist(request):
    product_id = request.data.get('product')

    if not product_id:
        return Response({"error": "Product ID required"}, status=400)

    Wishlist.objects.get_or_create(
        user=request.user,
        product_id=product_id
    )

    return Response({"message": "Added to wishlist"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_wishlist(request):
    wishlist = Wishlist.objects.filter(user=request.user)
    serializer = WishlistSerializer(wishlist, many=True)
    return Response(serializer.data)


# 🏠 ADDRESS

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_address(request):
    serializer = AddressSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data)  # Return full address with ID

    return Response(serializer.errors, status=400)


# 📦 ORDER

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):

    with transaction.atomic():

        address_id = request.data.get('address')
        payment_method = request.data.get('payment_method', 'COD')

        if not address_id:
            return Response({"error": "Address is required"}, status=400)

        address = get_object_or_404(
            Address,
            id=address_id,
            user=request.user
        )

        cart_items = Cart.objects.filter(user=request.user)

        if not cart_items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        total_amount = sum(
            item.product.price * item.quantity
            for item in cart_items
        )

        order = Order.objects.create(
            user=request.user,
            address=address,
            total_amount=total_amount,
            payment_method=payment_method,
            status="Paid"
        )

        # Clear cart after order
        cart_items.delete()

        return Response({
            "message": "Order placed successfully",
            "order_id": order.id,
            "total": total_amount
        })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_history(request):
    orders = Order.objects.filter(user=request.user).order_by('-id')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)