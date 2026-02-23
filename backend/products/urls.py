from django.urls import path
from .views import *

urlpatterns = [
    path('categories/', get_categories),
    path('subcategories/<int:category_id>/', get_subcategories),
    path('products/<int:subcategory_id>/', get_products),
    path('product/<int:pk>/', product_detail),
    path('product/create/', create_product),
]