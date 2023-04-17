from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Organization, OrgInvitation

User = get_user_model()

class OrganizationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.test_user = User.objects.create_user(full_name='test user', email='test@example.com', password='testpass')
        cls.test_organization = Organization.objects.create(
            name='Test Organization',
            description='This is a test organization',
            owner=cls.test_user
        )

    def test_organization_name(self):
        organization = Organization.objects.get(id=self.test_organization.id)
        expected_name = 'Test Organization'
        self.assertEqual(organization.name, expected_name)

    def test_organization_owner(self):
        organization = Organization.objects.get(id=self.test_organization.id)
        expected_owner = self.test_user
        self.assertEqual(organization.owner, expected_owner)

class OrgInvitationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.test_user = User.objects.create_user(full_name='test user', email='test@example.com', password='testpass')
        cls.test_organization = Organization.objects.create(
            name='Test Organization',
            description='This is a test organization',
            owner=cls.test_user
        )
        cls.test_invitation = OrgInvitation.objects.create(
            organization=cls.test_organization,
            user=cls.test_user,
            accepted=False
        )

    def test_org_invitation_organization(self):
        invitation = OrgInvitation.objects.get(id=self.test_invitation.id)
        expected_organization = self.test_organization
        self.assertEqual(invitation.organization, expected_organization)

    def test_org_invitation_user(self):
        invitation = OrgInvitation.objects.get(id=self.test_invitation.id)
        expected_user = self.test_user
        self.assertEqual(invitation.user, expected_user)

    def test_org_invitation_accepted(self):
        invitation = OrgInvitation.objects.get(id=self.test_invitation.id)
        expected_accepted = False
        self.assertEqual(invitation.accepted, expected_accepted)