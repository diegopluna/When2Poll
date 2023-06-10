from django.contrib import admin
from .models import Organization, OrgInvitation

# Register your models here.

admin.site.register(Organization)
admin.site.register(OrgInvitation)