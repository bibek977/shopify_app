from django.urls import path
from .views import *

urlpatterns = [
    # path("",ProductsView.as_view(),name='products'),
    path("",products,name='products'),
    path("create",create_products,name="create_products"),
    path("update",update_products,name="update_products"),
    path("delete",delete_products,name="delete_products"),
]
