from .models import Post
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class PostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

    def validate(self, data):
        if data['title'] == '':
            raise serializers.ValidationError('Dont send empty data')
        return data
    
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            password = make_password(validated_data['password'])
        )
        user.save()
        return user
    
class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
    