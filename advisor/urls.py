from django.urls import path
from . import views

urlpatterns = [
    path("analyze/<str:symbol>/", views.analyze_stock),
    path("nifty/", views.get_nifty),
    path("sensex/", views.get_sensex),
    path("banknifty/", views.get_banknifty),
]