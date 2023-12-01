from django.urls import path
from .views import *

urlpatterns = [
    # path("",ProductsView.as_view(),name="products"),
    path("",products,name='products'),
    path("delete/<int:id>",products_delete,name="products_delete")
]
