from django.urls import path
from polls.views import AvailabilityPollView

urlpatterns = [
    path('post/', AvailabilityPollView.as_view(),name="post-poll"),
]