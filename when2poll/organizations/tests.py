from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Organization, OrgInvitation

User = get_user_model()

# class OrganizationModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(
#             full_name='test user',
#             email='testuser@example.com',
#             password='testpass'
#         )
#         self.organization = Organization.objects.create(
#             name='Test Organization',
#             description='Test description',
#             owner=self.user
#         )

#     def test_organization_name(self):
#         self.assertEqual(str(self.organization), 'Test Organization')

#     def test_organization_owner(self):
#         self.assertEqual(self.organization.owner, self.user)


# class OrgInvitationModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(
#             full_name='test user',
#             email='testuser@example.com',
#             password='testpass'
#         )
#         self.organization = Organization.objects.create(
#             name='Test Organization',
#             description='Test description',
#             owner=self.user
#         )
#         self.org_invitation = OrgInvitation.objects.create(
#             organization=self.organization,
#             user=self.user,
#             accepted=False,
#             answered=False
#         )

#     def test_org_invitation_user(self):
#         self.assertEqual(str(self.org_invitation), 'testuser@example.com')

#     def test_org_invitation_organization(self):
#         self.assertEqual(self.org_invitation.organization, self.organization)

#     def test_org_invitation_accepted(self):
#         self.assertFalse(self.org_invitation.accepted)

#     def test_org_invitation_answered(self):
#         self.assertFalse(self.org_invitation.answered)