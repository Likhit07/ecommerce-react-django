from django.urls import path
from .views import *

urlpatterns = [
    path('cart/add/', add_to_cart),
    path('cart/', view_cart),

    path('wishlist/add/', add_to_wishlist),
    path('wishlist/', view_wishlist),

    path('address/add/', add_address),

    path('order/create/', create_order),
    path('orders/', order_history),
    path('cart/remove/<int:pk>/', remove_from_cart),
    path('cart/update/<int:pk>/', update_cart_quantity),
]