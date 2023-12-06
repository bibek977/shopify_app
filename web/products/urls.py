from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('',ProductsView,basename="products")

urlpatterns = [
    # path("", include(router.urls)),
    path("",products,name='products'),
    path("create",create_products,name="create_products"),
    path("update",update_products,name="update_products"),
    path("delete",delete_products,name="delete_products"),
]
