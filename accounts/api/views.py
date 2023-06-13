from django.http import JsonResponse
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.conf import settings
from .serializers import UserRegisterSerializer, EmailVerificationSerializer, UserSerializer, FriendshipSerializer, BlocklistSerializer
from .utils import Util
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from accounts.models import Friendship, Blocklist

User = get_user_model()
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['full_name'] = user.full_name
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UsersAPIView(APIView):
    serializer_class = UserRegisterSerializer

    @swagger_auto_schema(request_body=serializer_class, responses={201: UserSerializer})
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data = user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # user_data = serializer.data

        # user = User.objects.get(email=user_data['email'])
        # token = RefreshToken.for_user(user).access_token
        # current_site = get_current_site(request).domain
        # relativeLink = reverse('email-verify')
        # absurl = 'http://'+ current_site+relativeLink+"?token="+str(token)
        # email_body='Oi '+user.full_name+'. Use o link abaixo para confirmar sua conta:\n'+absurl
        # data = {
        #     'email_body':email_body,
        #     'email_subject':'When2Poll - Verificação de email',
        #     'to_email': user.email


        #     }

        # Util.send_email(data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class VerifyEmail(APIView):
    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter('token',in_=openapi.IN_QUERY, description='Description',type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY,algorithms=['HS256'])
            user=User.objects.get(id=payload['user_id'])
            print(user.active)
            
            if not user.active:
                user.active = True
                user.save()
            return Response({'email':'Successfully activated'},status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error':'Activation link expired'},status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error':'Invalid token'},status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    token_param_config = openapi.Parameter('refresh_token',in_=openapi.IN_QUERY, description='Description',type=openapi.TYPE_STRING)
    @swagger_auto_schema(manual_parameters=[token_param_config])
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class GetUserByEmailView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, email, format=None):
        if request.user.email == email:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email)
            serialized_users = {'id': user.id, 'full_name': user.full_name, 'email': user.email}
            return Response(serialized_users)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
    
class GetUserByPK(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, pk): 
        user = User.objects.get(id=pk)
        serialized_user = {'id': user.id, 'full_name': user.full_name, 'email': user.email}
        return Response(serialized_user)

    
class GetUsersView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = User.objects.exclude(id=request.user.id)
        serialized_users = [{'id': user.id, 'full_name': user.full_name, 'email': user.email} for user in users]
        return Response(serialized_users)
        

class GetCurrentUser(APIView):
    permission_classes = (IsAuthenticated,)

    def get(Self, request):
        print("debug1")
        try:
            user = User.objects.get(id=request.user.id)
            
            serialized_user = {'id': user.id, 'full_name': user.full_name, 'email': user.email}
            return Response(serialized_user)
        except:
            return Response({"message":"Could not find user"}, status=status.HTTP_404_NOT_FOUND)
        
        
class SendFriendInvite(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, email):
        try:
            to_user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        if Blocklist.objects.filter(blocked_user=request.user, user = to_user).exists():
            return Response({'error': 'Blocked by user'}, status=status.HTTP_400_BAD_REQUEST)
        
        if Blocklist.objects.filter(blocked_user=to_user, user = request.user).exists():
            return Response({'error': 'User is blocked'}, status=status.HTTP_400_BAD_REQUEST)

        if Friendship.objects.filter(from_user=request.user, to_user=to_user).exists() or Friendship.objects.filter(from_user=to_user, to_user=request.user).exists():
            return Response({'error': 'Invitation already sent or friendship exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        friendship = Friendship(from_user=request.user, to_user=to_user)
        friendship.save()
        serializer = FriendshipSerializer(friendship) 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class GetPendingInvites(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        pending_invites = Friendship.objects.filter(to_user=request.user, is_accepted=False)
        serializer = FriendshipSerializer(pending_invites, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AcceptFriendshipInvite(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request, pk):
        invite = Friendship.objects.get(pk=pk)
        if invite.is_accepted:
            return Response({'error': 'Invite is already accepted'}, status=status.HTTP_400_BAD_REQUEST)
        if invite.to_user == request.user:
            invite.accept()
            return Response(status=status.HTTP_200_OK)
        return Response({'error': 'User is not a part of the invite'}, status=status.HTTP_400_BAD_REQUEST)
    
class BlockFriendshipInvite(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request, pk):
        invite = Friendship.objects.get(pk=pk)
        if invite.is_accepted:
            return Response({'error': 'Invite is already accepted'}, status=status.HTTP_400_BAD_REQUEST)
        if invite.to_user == request.user:
            invite.reject()
            return Response(status=status.HTTP_200_OK)
        return Response({'error': 'User is not a part of the invite'}, status=status.HTTP_400_BAD_REQUEST)
    

class GetFriendships(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friendships= Friendship.objects.filter(Q(to_user=request.user, is_accepted = True) | Q(from_user=request.user, is_accepted = True))
        serializer = FriendshipSerializer(friendships, many=True)
        return Response(serializer.data)
    
class GetBlocked(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        blocked = Blocklist.objects.filter(user = request.user)
        serializer = BlocklistSerializer(blocked, many = True)
        return Response(serializer.data)

class UnblockUser(APIView):
    permission_classes = (IsAuthenticated,)
    
    def delete(self, request, pk):
        
        block = Blocklist.objects.get(pk=pk)
        
        if request.user == block.user:
            block.unblock()
            return Response(status=status.HTTP_200_OK)
        
        return Response({'error': 'User cannot unblock itself'}, status=status.HTTP_400_BAD_REQUEST)
    
class BlockFriend(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, pk):
        
        blocked = User.objects.get(pk=pk)
        if Blocklist.objects.filter(Q(blocked_user=blocked, user = request.user) | Q(blocked_user=request.user, user=blocked)).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        if Friendship.objects.filter(to_user=request.user, from_user=blocked).exists():
            invite = Friendship.objects.get(to_user=request.user, from_user=blocked)
            invite.delete()
            block = Blocklist.objects.get_or_create(user = request.user, blocked_user=blocked)
            serializer = BlocklistSerializer(block)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        if Friendship.objects.filter(to_user=blocked, from_user=request.user).exists():
            invite = Friendship.objects.get(to_user=blocked, from_user=request.user)
            invite.delete()
            block = Blocklist.objects.get_or_create(user = request.user, blocked_user=blocked)
            serializer = BlocklistSerializer(block)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
        
        
        
        