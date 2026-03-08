from django.urls import path
from . import views

urlpatterns = [
    # ---------------- AUTHENTICATION ----------------
    path("auth/register/", views.register),
    path("auth/login/", views.login_view),
    path("auth/google/", views.google_login),

    # ---------------- STOCK ENDPOINTS ----------------
    path("analyze/<str:symbol>/", views.analyze_stock),
    path("nifty/", views.get_nifty),
    path("sensex/", views.get_sensex),
    path("banknifty/", views.get_banknifty),
    path("search/", views.search_stock),
    path("market-status/", views.get_market_status),
]