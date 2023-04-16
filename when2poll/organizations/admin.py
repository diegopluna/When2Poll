from django.contrib import admin
from .models import group_group
from .models import invitation

# Register your models here.

admin.site.register(group_group)
admin.site.register(invitation)