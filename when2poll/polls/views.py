#from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from polls.api.serializers import AvailabilityPollSerializer
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
class AvailabilityPollView(APIView):
    def post(self, request):
        serializer = AvailabilityPollSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
