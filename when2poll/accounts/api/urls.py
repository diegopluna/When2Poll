from django.urls import path
from .views import MyTokenObtainPairView, UsersAPIView, VerifyEmail, LogoutView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)





urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UsersAPIView.as_view(), name='user_register'),
    path('email-verify/', VerifyEmail.as_view(), name = 'email-verify'),
    path('logout/', LogoutView.as_view(), name='logout'), 
]