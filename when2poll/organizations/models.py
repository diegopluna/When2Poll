from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class group_group(models.Model):
    group_name = models.CharField(max_length=100)
    description = models.CharField(max_lenght=500)
    members = models.ManyToManyField(User, related_name='grupos')

class invitation(models.Model):
    group_01 = models.ForeignKey(group_group, on_delete=models.CASCADE)
    member = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    acptance = models.BooleanField(default=False)
