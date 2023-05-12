from django.urls import path
from .views import AvailabilityPollView, AvailabilityAnswerView

urlpatterns = [
    path('post/', AvailabilityPollView.as_view(),name="post-poll"),
    path('get/', AvailabilityPollView.as_view(), name="get-polls"),
    path('put/', AvailabilityPollView.as_view(), name="put-poll"),
    path('answer/', AvailabilityAnswerView.as_view(), name="answer-poll"),
]