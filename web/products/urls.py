from django.urls import path
from .views import *

urlpatterns = [
    # path("",ProductsView.as_view()),
    path("",products,name='products'),
    path("create",create_products,name="create_products"),
    path("edit",put_products,name="put_products"),
    path("delete",delete_products,name="delete_products"),
]
