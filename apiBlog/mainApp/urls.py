from .views import PostList, PostDetail
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('postlist/', PostList.as_view(), name='PostList'),
    path('postdetail/<int:pk>/', PostDetail.as_view(), name='PostDetail'),
]
