#from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from polls.api.serializers import AvailabilityPollSerializer

# Create your views here.

class AvailabilityPollView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        serializer = AvailabilityPollSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)