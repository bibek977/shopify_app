import logging

from django.utils import timezone
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from apps.accounts.authentication import ShopifyAuthentication
from apps.accounts.models import User
from apps.profiles.api.serializers import ProfileSerializer
from apps.profiles.models import Profile

app_name = __package__.split(".")[1]
logger = logging.getLogger(app_name)


class UserProfileViewSet(ModelViewSet):
    serializer_class = ProfileSerializer
    authentication_classes = [ShopifyAuthentication]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Profile.objects.filter(user=self.request.user)


class ProfileUpdateAPIView(GenericAPIView):
    serializer_class = ProfileSerializer
    authentication_classes = [ShopifyAuthentication]

    def post(self, request: Request, *args, **kwargs):
        user: User = getattr(request, "user")
        profile = user.profile  # type:ignore
        datas: dict = request.data  # type:ignore
        for data in datas.keys():
            if data == "review_later" and datas.get(data, False):
                review_latter_date = timezone.now() + timezone.timedelta(days=2)
                setattr(profile, "review_on", review_latter_date)
            else:
                setattr(profile, data, datas.get(data, getattr(profile, data)))
        profile.save()
        serializer = self.get_serializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
