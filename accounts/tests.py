from django.test import TestCase
from django.contrib.auth import get_user_model


User = get_user_model()



class UserModelTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email='test@example.com',
            full_name='Test User',
            password='password123'
        )

    def test_create_user(self):
        self.assertTrue(isinstance(self.user, get_user_model()))
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.full_name, 'Test User')
        self.assertTrue(self.user.is_active)
        self.assertFalse(self.user.is_staff)
        self.assertFalse(self.user.is_admin)

    def test_create_staffuser(self):
        staff_user = get_user_model().objects.create_staffuser(
            email='staff@example.com',
            full_name='Staff User',
            password='password123'
        )
        self.assertTrue(isinstance(staff_user, get_user_model()))
        self.assertEqual(staff_user.email, 'staff@example.com')
        self.assertEqual(staff_user.full_name, 'Staff User')
        self.assertTrue(staff_user.is_active)
        self.assertTrue(staff_user.is_staff)
        self.assertFalse(staff_user.is_admin)

    def test_create_superuser(self):
        super_user = get_user_model().objects.create_superuser(
            email='admin@example.com',
            full_name='Admin User',
            password='password123'
        )
        self.assertTrue(isinstance(super_user, get_user_model()))
        self.assertEqual(super_user.email, 'admin@example.com')
        self.assertEqual(super_user.full_name, 'Admin User')
        self.assertTrue(super_user.is_active)
        self.assertTrue(super_user.is_staff)
        self.assertTrue(super_user.is_admin)
