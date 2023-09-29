from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=128, blank=False, null=False)
    description = models.TextField(blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True) #fix request.user

    def __str__(self):
        return f'{self.title} => {self.author}'
    

    
    


