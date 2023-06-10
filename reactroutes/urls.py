from django.urls import path
from .views import LoginPage, RegisterPage, HomePage, PollPage, NewPollPage, InvitesPage, GroupsPage

urlpatterns = [
    path('signin/', LoginPage.as_view()),
    path('signup/', RegisterPage.as_view()),
    path('',HomePage.as_view()),
    path('poll/<int:pk>/', PollPage.as_view()),
    path('newpoll/',NewPollPage.as_view()),
    path('invites/',InvitesPage.as_view()),
    path('invites/poll/<int:pk>/', InvitesPage.as_view()),
    path('groups/',GroupsPage.as_view()),
    path('newgroup/',GroupsPage.as_view()),
    path('group/<int:pk>/', GroupsPage.as_view()),
    path('friends/', GroupsPage.as_view()),
]