from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.request import Request
from .models import Post, Comment
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import authenticate


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated]


class PostListFiltered(generics.ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = Post.objects.filter(author=request.user)
        serialized_data = self.serializer_class(posts, many=True)
        return Response({"posts": serialized_data.data}, status=status.HTTP_200_OK)


class UserList(generics.ListAPIView):
    serializer_class = UserListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs["pk"]
        return User.objects.filter(id=pk)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs["pk"]
        return Post.objects.filter(id=pk)


class PostComment(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs["id"]
        return Comment.objects.filter(post=pk)

    def create(self, request, *args, **kwargs):
        pk = self.kwargs["id"]
        post = Post.objects.get(id=pk)
        token = request.META.get("HTTP_AUTHORIZATION", "").split(" ")[1]
        try:
            decoded_token = AccessToken(token)
            user_id = decoded_token.payload["user_id"]
            user = User.objects.get(id=user_id)
        except Exception as e:
            {"error": "User not found"}
        comment = Comment.objects.create(
            text=request.data["textComment"], post=post, user=user
        )
        serialized_comment = self.serializer_class(comment)
        return Response(serialized_comment.data)


class postLike(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            pk = request.query_params.get("post_id")
            post = Post.objects.get(id=pk)
            user = request.user
            if user in post.likes.all():
                return Response({"Message": "Ya diste like a este post!"})
            post.save()
            post.likes.add(user)
            return Response({"Message": "Liked!"})
        except Exception as e:
            return Response({"error": "Post not found"})


class getUser(APIView):
    def get(self, request):
        token = request.META.get("HTTP_AUTHORIZATION", "").split(" ")[1]
        # Extraemos el token, el "split" elimina la parabra Bearer de la cabecera

        try:
            decoded_token = AccessToken(token)
            user_id = decoded_token.payload["user_id"]
            response_data = {"user_id": user_id}
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": "Error decoding token"}, status=status.HTTP_400_BAD_REQUEST
            )


class UserRegister(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

    def create(self, request):
        user_serializer = UserRegisterSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(
                {"message": "user Created "}, status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error in creation"}, status=status.HTTP_400_BAD_REQUEST
        )


class loginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(username=username, password=password)
        if user:
            token_serializer = TokenObtainPairSerializer(data=request.data)
            if token_serializer.is_valid():
                user_serializer = UserLoginSerializer(user)
                return Response(
                    {
                        "token": token_serializer.validated_data.get("access"),
                        "refresh": token_serializer.validated_data.get("refresh"),
                        "user": user_serializer.data,
                        "message": "Success login",
                    },
                    status=status.HTTP_202_ACCEPTED,
                )
            return Response({"message": "Invalid user"})
