from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager
)

class UserManager(BaseUserManager):
    
    def create_user(self, email, full_name,password=None, is_active=True, is_staff = False, is_admin = False):
        if not email:
            raise ValueError('Users must have an email address')
        if not full_name:
            raise ValueError('Users must have a full name')
        if not password:
            raise ValueError('Users must have a password')
        user_obj = self.model(
            email = self.normalize_email(email),
            full_name=full_name
        )
        user_obj.set_password(password) # set and change password
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.save(using=self._db)
        return user_obj
    
    def create_staffuser(self, email, full_name, password=None):
        user = self.create_user(
            email,
            full_name,
            password=password,
            is_staff=True
        )
        return user
    
    def create_superuser(self, email, full_name, password=None):
        user = self.create_user(
            email,
            full_name,
            password=password,
            is_staff=True,
            is_admin=True
        )
        return user

# Create your models here.
class User(AbstractBaseUser):
    email = models.EmailField(unique=True, max_length=255)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    active = models.BooleanField(default=True) #can login
    staff = models.BooleanField(default=False) #staff user non superuser
    admin = models.BooleanField(default=False) #superuser
    timestamp = models.DateTimeField(auto_now_add=True)
    avatar = models.ImageField(upload_to='users_avatars/', blank=True, null=True)

    USERNAME_FIELD = 'email' #username
    #email and password are required by default
    REQUIRED_FIELDS = ['full_name'] #['full_name']

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.full_name
    
    def get_short_name(self):
        return self.email
    
    def has_perm(self, perm, opj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff
    
    @property
    def is_admin(self):
        return self.admin
    
    @property
    def is_active(self):
        return self.active
    

class Friendship(models.Model):
    from_user = models.ForeignKey(User, related_name='sent_invitations', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='received_invitations', on_delete=models.CASCADE)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('from_user', 'to_user')

    def __str__(self):
        return f'{self.from_user} invited {self.to_user} (Accepted: {self.is_accepted})'
    
    def accept(self):
        self.is_accepted = True
        self.save()
        
    def reject(self):
        # Add to blocklist
        Blocklist.objects.get_or_create(user=self.from_user, blocked_user=self.to_user)
        self.delete()
    
    
class Blocklist(models.Model):
    user = models.ForeignKey(User, related_name='blocklist', on_delete=models.CASCADE)
    blocked_user = models.ForeignKey(User, related_name='blocked_by', on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('user', 'blocked_user')
        
    def __str__(self):
        return f'{self.user} blocked {self.blocked_user}'
    
    