from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json, base64
from .rec_model import recognizer

def home(request):
  return render(request, 'digit_recognizer/home.html')

@csrf_exempt
def upload_pic(request):
    if request.method == 'POST':
        img_data_in_base64 = json.loads(request.body.decode('utf-8'))['image'].split(',')[1]
        imgdata = base64.b64decode(img_data_in_base64)
        with open('test.jpeg', 'wb') as f:
            f.write(imgdata)
        result = recognizer.transform_digit()
        print(result)
    return JsonResponse({'number': int(result)})