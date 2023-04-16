from django.urls import path
from .views import OrganizationList, InvitationCreate, InvitationList

urlpatterns = [
    path('organizations/', OrganizationList.as_view(), name='organization-list'),
    path('organizations/<int:pk>/invite/', InvitationCreate.as_view()),
    path('organizations/<int:pk>/invitations/', InvitationList.as_view()),
]