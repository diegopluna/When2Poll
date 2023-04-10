from django.urls import path
from polls.views import AvailabilityPollView

urlpatterns = [
    path('post/', AvailabilityPollView.post),
]