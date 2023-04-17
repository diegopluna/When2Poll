from django.urls import path
from .views import OrganizationList, InvitationCreate, InvitationList, GetUserOrganizationsView, GetOrganizationView

urlpatterns = [
    path('organizations/', OrganizationList.as_view(), name='organization-list'),
    path('organizations/<int:pk>/', GetOrganizationView.as_view()),
    path('organizations/<int:pk>/invite/', InvitationCreate.as_view()),
    path('organizations/<int:pk>/invitations/', InvitationList.as_view()),
    path('organizations/user/', GetUserOrganizationsView.as_view()),
]