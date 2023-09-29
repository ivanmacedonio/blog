from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.request import Request
from .models import Post
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.filter()
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated]


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Post.objects.filter(id = pk)

class UserRegister(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

    def create(self, request):
        user_serializer = UserRegisterSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response ({'message': 'user Created '}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Error in creation'}, status=status.HTTP_400_BAD_REQUEST)
    

class loginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer
    def post(self, request: Request, *args, **kwargs) -> Response:
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = authenticate(username = username, password = password)
        if user:
            token_serializer = TokenObtainPairSerializer(data = request.data)
            if token_serializer.is_valid():
                user_serializer = UserLoginSerializer(user)
                return Response({
                    'token' : token_serializer.validated_data.get('access'),
                    'refresh' : token_serializer.validated_data.get('refresh'),
                    'user' : user_serializer.data,
                    'message' : 'Success login'
                }, status=status.HTTP_202_ACCEPTED)
            return Response({'message' : 'Invalid user'})
        