from .views import *
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path("postlist/", PostList.as_view(), name="PostList"),
    path("postdetail/<int:pk>/", PostDetail.as_view(), name="PostDetail"),
    path("userRegister/", UserRegister.as_view(), name="userRegister"),
    path("loginView/", loginView.as_view(), name="loginView"),
    path("postComment/<int:id>/", PostComment.as_view(), name="PostComment"),
    path("postListFiltered/", PostListFiltered.as_view(), name="PostListFiltered"),
    path("getUser/", getUser.as_view(), name="getUser"),
    path("userList/<int:pk>", UserList.as_view(), name="userList"),
    path("postLike/", postLike.as_view(), name="postLike"),
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
]

