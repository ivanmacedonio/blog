from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=128, blank=False, null=False)
    description = models.TextField(blank=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, to_field="username"
    )
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    def __str__(self):
        return f"{self.title} => {self.author}"
    


class Comment(models.Model):
    text = models.TextField(blank=True, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, to_field='username')

