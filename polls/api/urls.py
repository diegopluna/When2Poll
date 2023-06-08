from django.urls import path
from .views import AvailabilityPollView, PollAnswerView, SetPollAdmin, UserInvites, GetPollView, AnswerPollView

urlpatterns = [
    path('post/', AvailabilityPollView.as_view(),name="post-poll"),
    path('get/', AvailabilityPollView.as_view(), name="get-polls"),
    path('put/', AvailabilityPollView.as_view(), name="put-poll"),
    path('answer/<int:pk>/', AnswerPollView.as_view(), name="answer-poll"),
    path('invites/', UserInvites.as_view(), name="poll-invites"),
    path('<int:pk>/', GetPollView.as_view(), name="get-poll"),
    path('<int:pollId>/admin/set/<int:userId>/', SetPollAdmin.as_view(), name="set-poll-admin")
    # ,
    # path('justifications/', JustificationListView.as_view()),
    # path('justifications/<int:pk>/', JustificationDetailView.as_view()),
    # path('poll-answers/', PollAnswerListView.as_view()),
    # path('poll-answers/<int:pk>/', PollAnswerDetailView.as_view()),
    # path('poll-invites/', PollInviteListView.as_view()),
    # path('poll-invites/<int:pk>/', PollInviteDetailView.as_view()),
    # path('justifications/', JustificationListView.as_view()),
    # path('justifications/<int:pk>/', JustificationDetailView.as_view()),
    # path('<int:pk>/setadmin/', SetPollAdmin.as_view())

]