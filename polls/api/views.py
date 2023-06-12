#from django.shortcuts import render
from django.http import Http404
from utils.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status,  permissions

from django.contrib.auth import get_user_model

#from rest_framework.renderers import JSONRenderer
from polls.api.serializers import AvailabilityPollSerializer, PollInviteSerializer, PollAnswerSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from polls.models import AvailabilityPoll, PollInvite, PollAnswer, DateTimeRange
from django.db.models import Q
# Create your views here.

User = get_user_model()




# class JustificationListView(generics.ListCreateAPIView):
#     serializer_class = JustificationSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         user = self.request.user
#         queryset = Justification.objects.filter(user=user)
#         poll_id = self.request.query_params.get('poll_id')
#         if poll_id:
#             queryset = queryset.filter(poll__id=poll_id)
#         return queryset

# class JustificationDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Justification.objects.all()
#     serializer_class = JustificationSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         queryset = Justification.objects.filter(user=user)
#         return queryset


class AvailabilityPollView(APIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AvailabilityPollSerializer

    @swagger_auto_schema(request_body=serializer_class, responses={201: serializer_class})
    def post(self, request):
        data = request.data
        data['owner'] = request.user.pk
        #data.setdefault('admins', []).append(request.user.pk)
        serializer = AvailabilityPollSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(request_body=serializer_class, responses={201: serializer_class})
    def get(self, request):
        poll_id = request.query_params.get('poll_id')
        user = request.user
        if poll_id is None:
            polls = AvailabilityPoll.objects.filter( Q(pollinvite__receiver=user, pollinvite__accepted=True) | Q(pollinvite__receiver=user, pollinvite__admin=True)).distinct().order_by("deadline") #queries for every poll where the requesting user is a participant
            serializer = AvailabilityPollSerializer(polls, many=True)
            payload = serializer.data
            return Response(payload, status=status.HTTP_200_OK)            
        else:
            poll = AvailabilityPoll.objects.get(pk=poll_id)
            if not (poll.pollinvite_set.filter(receiver=user, accepted=True).exists() or poll.pollinvite_set.filter(receiver=user, admin=True).exists()):
                return Response({'detail': "You are not authorized to access this poll."}, status=status.HTTP_403_FORBIDDEN)
            serializer = AvailabilityPollSerializer(poll)
            payload = serializer.data
            return Response(payload, status=status.HTTP_200_OK)
    
    # @swagger_auto_schema(request_body=serializer_class, responses={201: serializer_class})
    # def put(self, request):
    #     poll_id = request.query_params.get('poll_id')
        

class PollAnswerView(APIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = PollAnswerSerializer

    #@swagger_auto_schema(request_body=serializer_class, responses={201: serializer_class})
    # def post(self, request):
    #     poll_id = request.query_params.get('poll_id')
    def get(self, request):
        pass

    def post(self, request, pk):
        poll_id = pk
        if poll_id is None:
            return Response({'detail': 'You must indicate which poll this answer refers to.'}, status=status.HTTP_400_BAD_REQUEST)
        poll = AvailabilityPoll.objects.get(pk=poll_id)
        # if request.user not in poll.participants:
        #     return Response({'detail': 'You are not a participant in this poll.'}, status=status.HTTP_403_FORBIDDEN)
        if PollAnswer.objects.filter(user=request.user, poll=poll).exists():
            return Response({'detail': 'You have already submitted an answer for this poll.'}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data
        data['user'] = request.user.pk
        data['poll'] = poll_id

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        poll.update_datetime_ranges()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def put(self, request, pk):
        poll_id = pk

        poll = AvailabilityPoll.objects.get(pk=poll_id)

        poll_answer = PollAnswer.objects.filter(poll_id=poll_id, user=request.user.pk).first()
        
        if not poll_answer:
            return Response({'detail': 'Poll answer not found.'}, status=status.HTTP_404_NOT_FOUND)

        request.data['user'] = request.user.pk
        request.data['poll'] = poll_id

        serializer = self.serializer_class(poll_answer, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        poll.update_datetime_ranges()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class JustifyPoll(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, pk):
        if pk is None:
            return Response({'detail': 'You must indicate which poll this answer refers to.'}, status=status.HTTP_400_BAD_REQUEST)
        poll = AvailabilityPoll.objects.get(pk=pk)
        if PollAnswer.objects.filter(user=request.user, poll=poll).exists():
            return Response({'detail': 'You have already submitted an answer for this poll.'}, status=status.HTTP_400_BAD_REQUEST)
        
        data = request.data
        data['user'] = request.user.pk
        data['poll'] = pk
        data['available'] = False

        serializer = PollAnswerSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response (serializer.data)





        
# class AnswerPollView(APIView):
#     permission_classes = (IsAuthenticated, )

#     def post(self, request, pk):
#         recdata = request.data
#         poll = AvailabilityPoll.objects.get(pk=pk)
#         invite = PollInvite.objects.get(receiver = request.user, poll = poll)
#         if PollAnswer.objects.filter(user = request.user, poll = poll).exists():
#             return Response({'detail': 'You have already submitted an answer for this poll.'}, status=status.HTTP_400_BAD_REQUEST)
#         data = {}
#         data['user'] = request.user.pk
#         data['poll'] = pk
#         data['justification'] = recdata['justification']
#         serializer = PollAnswerSerializer(data = data)
#         if serializer.is_valid():
#             serializer.save(user=request.user, poll=poll)
#             invite.accepted = recdata['available']
#             invite.answered = True
#             invite.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# class RejectAnswerPollView(APIView):
#     permission_classes = (IsAuthenticated, )

#     def get(self, request, pk):
#         poll = AvailabilityPoll.objects.get(pk=pk)
#         invite = PollInvite.objects.get(receiver = request.user, poll = poll)
#         invite.accepted = False
#         invite.answered = True
#         invite.save()
#         return Response(status=status.HTTP_200_OK)

class UserInvites(APIView):
    permission_classes = (IsAuthenticated, )
    def get (self, request):
        invitations = PollInvite.objects.filter(receiver=request.user, accepted=False, answered = False)
        serializer = PollInviteSerializer(invitations, many=True)
        return Response(serializer.data)

class SetPollAdmin(APIView):
    permission_classes = (IsAuthenticated, )
    def put(self, request, pollId, userId):
        data = request.data
        owner = User.objects.get(pk = request.user.pk)
        if(AvailabilityPoll.objects.filter(pk = pollId, owner = owner)):
            Poll = AvailabilityPoll.objects.get(pk = pollId, owner = owner)
            invite = PollInvite.objects.get(receiver = userId, accepted = True, answered = True, poll = Poll)
            invite.admin = data['admin']
            invite.save()
            return Response(status=status.HTTP_200_OK)       
        return Response(status=status.HTTP_404_NOT_FOUND)

class GetPollView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, pk):
        poll = AvailabilityPoll.objects.get(pk=pk)
        serializer = AvailabilityPollSerializer(poll)
        return Response(serializer.data)
    
class AcceptPollInvite(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, pk):
        invite = PollInvite.objects.get(pk=pk)
        invite.accept()
        return Response(status=status.HTTP_200_OK)
    
class RejectPollInvite(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, pk):
        invite = PollInvite.objects.get(pk=pk)
        invite.reject()
        return Response(status=status.HTTP_200_OK)
    

class GetPollDataByInvitePk(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, pk):
        invite = PollInvite.objects.get(pk=pk)
        poll = AvailabilityPoll.objects.get(pk = invite.poll.id)
        serializer = AvailabilityPollSerializer(poll)
        return Response(serializer.data)