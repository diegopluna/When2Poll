from django.urls import path
from .views import MyTokenObtainPairView, UsersAPIView, VerifyEmail, LogoutView, GetUserByEmailView, GetUsersView, GetUserByPK, GetCurrentUser, SendFriendInvite, GetPendingInvites, AcceptFriendshipInvite, RejectFriendshipInvite, GetFriendships
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)





urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UsersAPIView.as_view(), name='user_register'),
    path('email-verify/', VerifyEmail.as_view(), name = 'email-verify'),
    path('logout/', LogoutView.as_view(), name='logout'), 
    path('users/', GetUsersView.as_view(), name='get-users'),
    path('users/<int:pk>/',GetUserByPK.as_view(), name='get-user-by-pk'),
    path('user/<str:email>/', GetUserByEmailView.as_view(), name='get-user-by-email'),
    path('user/me/', GetCurrentUser.as_view(), name='get-current-user'),
    path('friends/invite/<str:email>/', SendFriendInvite.as_view(), name='send-friend-invite'),
    path('friends/invites/pending/', GetPendingInvites.as_view(), name='get-pending-invites'),
    path('friends/invite/<int:pk>/accept/', AcceptFriendshipInvite.as_view(), name='accept-friendship-invite'),
    path('friends/invite/<int:pk>/reject/', RejectFriendshipInvite.as_view(), name='accept-friendship-invite'),
    path('friends/', GetFriendships.as_view(), name='get-friendships'),
]