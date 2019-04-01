from django.contrib import admin
from django.urls import path
from digit_recognizer import views as digit_recognizer_views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('recognizer/', digit_recognizer_views.home),
    path('recognizer/upload/', digit_recognizer_views.upload_pic, name='upload_pic'),
]
