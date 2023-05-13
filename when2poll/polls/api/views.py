#from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics, permissions

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


class PollInviteListView(generics.ListCreateAPIView):
    queryset = PollInvite.objects.all()
    serializer_class = PollInviteSerializer

class PollInviteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PollInvite.objects.all()
    serializer_class = PollInviteSerializer

class PollAnswerListView(generics.ListCreateAPIView):
    queryset = PollAnswer.objects.all()
    serializer_class = PollAnswerSerializer


class PollAnswerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PollAnswer.objects.all()
    serializer_class = PollAnswerSerializer

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
        if poll_id is None:
            userId = request.user.pk
            polls = AvailabilityPoll.objects.filter(Q(owner=userId) | Q(admins__pk__in=userId) | Q(participants__pk__in=userId)).order_by("deadline")
            serializer = AvailabilityPollSerializer(polls, many=True)
            payload = serializer.data
            return JsonResponse(payload, safe=False)            
        else:
            poll = AvailabilityPoll.objects.get(pk=poll_id)
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

    def post(self, request, poll_id):
        poll = AvailabilityPoll.objects.get(id=poll_id)
        if request.user not in poll.participants.all():
            return Response({'detail': 'You are not a participant in this poll.'}, status=status.HTTP_403_FORBIDDEN)
        data = request.data
        data['user'] = request.user.pk
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

