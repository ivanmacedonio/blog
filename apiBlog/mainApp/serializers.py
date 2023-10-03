from .models import Post, Comment
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class PostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

    def validate(self, data):
        if data["title"] == "":
            raise serializers.ValidationError("Dont send empty data")
        return data

    def create(self, validated_data):
        post = Post.objects.create(
            title=validated_data["title"],
            description=validated_data["description"],
            author=self.context["request"].user,
        )
        post.save()
        return post


class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

        def validate(self, data):
            if data["text"] == "":
                raise serializers.ValidationError("Dont send empty comments")
            return data

        def create(self, validated_data):
            comment = Comment.objects.create(
                text=validated_data["textComment"], post=self.kwargs["id"]
            )
            comment.save()
            return comment


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            password=make_password(validated_data["password"]),
        )
        user.save()
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
