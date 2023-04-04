from django.urls import path, re_path
from . import views
from .views import MyTokenObtainPairView, UsersAPIView, VerifyEmail
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)





urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UsersAPIView.as_view(), name='user_register'),
    path('email-verify/', VerifyEmail.as_view(), name = 'email-verify')
]