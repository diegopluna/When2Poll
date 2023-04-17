from django.urls import path
from .views import OrganizationList, InvitationCreate, InvitationList, GetUserOrganizationsView, GetOrganizationView, AcceptedInvitationList, NotAnsweredInvitationList, RejectedInvitationList ,UserInvitationList, AcceptInvitation, RejectInvitation

urlpatterns = [
    path('organizations/', OrganizationList.as_view(), name='organization-list'),
    path('organizations/<int:pk>/', GetOrganizationView.as_view()),
    path('organizations/<int:pk>/members/', AcceptedInvitationList.as_view()),
    path('organizations/<int:pk>/invited/', NotAnsweredInvitationList.as_view()),
    path('organizations/<int:pk>/rejected/', RejectedInvitationList.as_view()),
    path('organizations/<int:pk>/invite/', InvitationCreate.as_view()),
    path('organizations/<int:pk>/invitations/', InvitationList.as_view()),
    path('organizations/user/', GetUserOrganizationsView.as_view()),
    path('user/invites/', UserInvitationList.as_view()),
    path('invitation/<int:pk>/accept/',AcceptInvitation.as_view()),
    path('invitation/<int:pk>/reject/',RejectInvitation.as_view())
]