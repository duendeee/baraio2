from django.conf.urls import url
from django.urls import path, re_path

#related reference
from . import apiviews

urlpatterns = [
    url(r'^v1/rooms/$', apiviews.rooms_list),
    url(r'^v1/romms/(?P<pk>[0-9]+)$', apiviews.rooms_detail),
]