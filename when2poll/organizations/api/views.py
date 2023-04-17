from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
from organizations.models import Organization, OrgInvitation
from .serializers import OrganizationSerializer, OrgInvitationSerializer

User = get_user_model()

class OrganizationList(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        organizations = Organization.objects.all()
        serializer = OrganizationSerializer(organizations, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        data['owner'] = request.user.pk
        serializer = OrganizationSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GetUserOrganizationsView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        owned_organizations = Organization.objects.filter(owner=request.user.id)
        member_organizations = OrgInvitation.objects.filter(user=request.user.id, accepted=True)
        data = []
        for owned_organization in owned_organizations:
            data.append({"id":owned_organization.id,"name":owned_organization.name,"owner": True})
        for member_organization in member_organizations:
            org = member_organization.organization
            data.append({"id":org.id,"name":org.name,"owner":False})

        return Response(data)

class GetOrganizationView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, pk):
        organization = Organization.objects.get(pk=pk)
        serializer = OrganizationSerializer(organization)
        return Response(serializer.data)


class InvitationCreate(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request, pk):
        data = request.data
        if(Organization.objects.get(pk=pk)):
            data['organization'] = pk
            serializer = OrgInvitationSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_404_NOT_FOUND)


class InvitationList(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, pk):
        organization = Organization.objects.get(pk=pk)
        invitations = OrgInvitation.objects.filter(organization=organization)
        serializer = OrgInvitationSerializer(invitations, many=True)
        return Response(serializer.data)