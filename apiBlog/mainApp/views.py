from django.shortcuts import render
from rest_framework import generics
from .models import Post
from .serializers import *


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostListSerializer
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Post.objects.filter(id = pk)



