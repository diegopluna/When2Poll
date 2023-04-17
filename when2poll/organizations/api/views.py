from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from organizations.models import Organization, OrgInvitation
from .serializers import OrganizationSerializer, OrgInvitationSerializer

class OrganizationList(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        organizations = Organization.objects.all()
        serializer = OrganizationSerializer(organizations, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        data['owner'] = request.user.pk
        serializer = OrganizationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InvitationCreate(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request, pk):
        organization = Organization.objects.get(pk=pk)
        serializer = OrgInvitationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(organization=organization)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InvitationList(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, pk):
        organization = Organization.objects.get(pk=pk)
        invitations = OrgInvitation.objects.filter(organization=organization)
        serializer = OrgInvitationSerializer(invitations, many=True)
        return Response(serializer.data)
