from django.contrib.auth import get_user_model
from rest_framework import serializers
from accounts.models import Friendship

User = get_user_model()

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    
    # def create(self, validated_data):
    #     user = User.objects.create(full_name = validated_data['full_name'], email = validated_data['email'])
    #     return user

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length = 8, write_only = True)
    class Meta:
        model = User
        fields = ['full_name', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create(full_name = validated_data['full_name'], email = validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user

class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        user = User
        fields = ['token']


class UserFriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email']
        
class FriendshipSerializer(serializers.ModelSerializer):
    from_user = UserFriendshipSerializer(read_only = True)
    to_user = UserFriendshipSerializer(read_only = True)
    class Meta:
        model = Friendship
        fields = '__all__'
