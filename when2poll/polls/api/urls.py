from django.urls import path
from .views import AvailabilityPollView

urlpatterns = [
    path('post/', AvailabilityPollView.as_view(),name="post-poll"),
    path('get/', AvailabilityPollView.as_view(), name="get-polls"),
]