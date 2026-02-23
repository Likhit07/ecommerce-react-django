from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Category, SubCategory, Product

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Product)