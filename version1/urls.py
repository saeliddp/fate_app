from django.urls import path
from . import views

# about is the intro page
# home is where the survey actually takes place
urlpatterns = [
    path('', views.about, name='version1-about'),
    path('home/', views.home, name='version1-home'),
]