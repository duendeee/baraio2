from django.conf.urls import url
from django.urls import path, re_path

#related reference
from . import apiviews

urlpatterns = [
    re_path(r'^api/rooms/$', apiviews.rooms_list),
    re_path(r'^api/romms/(?P<pk>[0-9]+)$', apiviews.rooms_detail),   
]