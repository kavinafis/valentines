from django.urls import path
from . import views

urlpatterns = [
    path('', views.valentine_view, name='valentine'),
]
