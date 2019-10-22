from django.shortcuts import render
from django.http import HttpResponse
import json
from version1.extraction import *

first_algorithm = "t"
second_algorithm = "rp"
# gets relevant data from snippet.pickle file
first_rank = extractFromFile(first_algorithm + ".txt", 5)
second_rank = extractFromFile(second_algorithm + ".txt", 5)
# stores data as json so that it can be passed to Javascript
first = json.dumps(first_rank)
second = json.dumps(second_rank)

def home(request):
    context = {
        'first': first,
        'second': second,
        'first_algorithm': first_algorithm,
        'second_algorithm': second_algorithm
    }
    return render(request, 'version1/home.html', context)
    
def about(request):
    return render(request, 'version1/about.html')