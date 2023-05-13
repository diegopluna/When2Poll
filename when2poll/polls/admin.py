from django.contrib import admin
from .models import AvailabilityPoll, DateTimeRange, PollInvite

# Register your models here.


admin.site.register(AvailabilityPoll)
admin.site.register(DateTimeRange)
admin.site.register(PollInvite)
