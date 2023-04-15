from django.urls import path
from .views import LoginPage, RegisterPage, HomePage, NewPollPage, InvitesPage, GroupsPage

urlpatterns = [
    path('login/', LoginPage.as_view()),
    path('register/', RegisterPage.as_view()),
    path('',HomePage.as_view()),
    path('newpoll/',NewPollPage.as_view()),
    path('invites/',InvitesPage.as_view()),
    path('groups/',GroupsPage.as_view()),
]