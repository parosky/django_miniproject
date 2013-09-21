import json
import cv2
import numpy

from django.http import HttpResponse
from django.template import RequestContext, loader

def index(request):
    template = loader.get_template('upload_image/index.html')
    context = RequestContext(request, {})
    return HttpResponse(template.render(context))

def upload(request):
    if request.method == 'POST':
        f = request.FILES['file']
        faces = facedetect(f)
    else:
        raise Exception('Access not permitted')

    return HttpResponse(json.dumps(faces), mimetype='application/json')

def facedetect(f):
    buf = numpy.fromstring(f.read(), dtype='int8')
    img = cv2.imdecode(buf, 1)

    hc = cv2.CascadeClassifier("./upload_image/haarcascade_frontalface_alt.xml")
    faces = hc.detectMultiScale(img, minSize=(50,50))
    if len(faces):
        faces = faces.tolist()
    else:
        faces = []
    return faces
