from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Organization(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    members = models.ManyToManyField(User, related_name='grupos')

class OrgInvitation(models.Model):
    group = models.ForeignKey(Organization, on_delete=models.CASCADE)
    member = models.ForeignKey(User, on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
