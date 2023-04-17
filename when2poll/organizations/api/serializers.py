from rest_framework import serializers
from organizations.models import Organization, OrgInvitation
from django.contrib.auth import get_user_model

User = get_user_model()

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'

class OrgInvitationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    class Meta:
        model = OrgInvitation
        fields = '__all__'