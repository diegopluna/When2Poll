#from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status,  permissions

from django.contrib.auth import get_user_model

#from rest_framework.renderers import JSONRenderer
from polls.api.serializers import AvailabilityPollSerializer, PollInviteSerializer, PollAnswerSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from polls.models import AvailabilityPoll, PollInvite, PollAnswer
from django.db.models import Q
from django.http import JsonResponse
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
            return JsonResponse(payload, safe=False)            
        else:
            poll = AvailabilityPoll.objects.get(pk=poll_id)
            if not (poll.pollinvite_set.filter(receiver=user, accepted=True).exists() or poll.pollinvite_set.filter(receiver=user, admin=True).exists()):
                return Response({'detail': "You are not authorized to access this poll."}, status=status.HTTP_403_FORBIDDEN)
            serializer = AvailabilityPollSerializer(poll)
            payload = serializer.data
            return JsonResponse(payload, safe=False)
    
    # @swagger_auto_schema(request_body=serializer_class, responses={201: serializer_class})
    # def put(self, request):
    #     poll_id = request.query_params.get('poll_id')
        

class PollAnswerView(APIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = PollAnswerSerializer

    #@swagger_auto_schema(request_body=serializer_class, responses={201: serializer_class})
    # def post(self, request):
    #     poll_id = request.query_params.get('poll_id')

    def post(self, request):
        poll_id = request.query_params.get('poll_id')
        if poll_id is None:
            return Response({'detail': 'You must indicate which poll this answer refers to.'}, status=status.HTTP_400_BAD_REQUEST)
        poll = AvailabilityPoll.objects.get(id=poll_id)
        if request.user not in poll.participants:
            return Response({'detail': 'You are not a participant in this poll.'}, status=status.HTTP_403_FORBIDDEN)
        data = request.data
        data['user'] = request.user.pk
        data['poll'] = poll_id
        serializer = PollAnswerSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user, poll=poll)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class SetPollAdmin(APIView):
    permission_classes = (IsAuthenticated, )
    def put(self, request, pk):
        datas = request.data
        owner = User.objects.get(pk = request.user.pk)
        if(AvailabilityPoll.objects.filter(pk = pk, owner = owner)):
            Poll = AvailabilityPoll.objects.get(pk = pk, owner = owner)
            for data in datas:
                invite = PollInvite.objects.get(receiver = data['receiver_id'], accepted = True, answered = True, poll = Poll)
                invite.admin = data['admin']
                invite.save()
            return Response(status=status.HTTP_200_OK)       
        return Response(status=status.HTTP_404_NOT_FOUND)

