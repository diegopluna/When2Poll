from django.urls import path
from .views import AvailabilityPollView, PollAnswerView, SetPollAdmin, UserInvites, GetPollView, AcceptPollInvite,RejectPollInvite,GetPollDataByInvitePk

urlpatterns = [
    path('post/', AvailabilityPollView.as_view(),name="post-poll"),
    path('get/', AvailabilityPollView.as_view(), name="get-polls"),
    path('put/', AvailabilityPollView.as_view(), name="put-poll"),
    #path('polls/<int:pk>/answer/', PollAnswerView.as_view(), name='poll-answer'),
    path('answer/<int:pk>/', PollAnswerView.as_view(), name="answer-poll"),
    path('invites/', UserInvites.as_view(), name="poll-invites"),
    path('<int:pk>/', GetPollView.as_view(), name="get-poll"),
    path('<int:pollId>/admin/set/<int:userId>/', SetPollAdmin.as_view(), name="set-poll-admin"),
    path('invites/<int:pk>/accept/', AcceptPollInvite.as_view(), name="accept-poll-invite"),
    path('invites/<int:pk>/reject/', RejectPollInvite.as_view(), name="accept-poll-invite"),
    path('invites/<int:pk>/poll/', GetPollDataByInvitePk.as_view(), name="get-poll-by-invite-pk"),
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