from django.shortcuts import render
from django.http import HttpResponse
import random
import json
# imports Snippet and QuerySnippet
from version1.extraction import *
"""
first_rank = {
    1: [["query_name", "climate change", "link", "cc desc"],
    ["query_name", "clinton", "link", "bill and hill"],
    ["query_name", "trump", "link", "trump.com"],
    ["query_name", "kap", "link", "america?"],
    ["query_name", "iran", "link", "contra?"]],
    2: [["query_name", "climate change", "link", "cc desc"],
    ["query_name", "clinton", "link", "bill and hill"],
    ["query_name", "trump", "link", "trump.com"],
    ["query_name", "kap", "link", "america?"],
    ["query_name", "iran", "link", "contra?"]],
    3: [["query_name", "climate change", "link", "cc desc"],
    ["query_name", "clinton", "link", "bill and hill"],
    ["query_name", "trump", "link", "trump.com"],
    ["query_name", "kap", "link", "america?"],
    ["query_name", "iran", "link", "contra?"]]
}

second_rank = {
    1: [["query_name", "climate changeR", "link", "cc desc"],
    ["query_name", "clintonR", "link", "bill and hill"],
    ["query_name", "trumpR", "link", "trump.com"],
    ["query_name", "kapR", "link", "america?"],
    ["query_name", "iranR", "link", "contra?"]],
    2: [["query_name", "climate changeR", "link", "cc desc"],
    ["query_name", "clintonR", "link", "bill and hill"],
    ["query_name", "trumpR", "link", "trump.com"],
    ["query_name", "kapR", "link", "america?"],
    ["query_name", "iranR", "link", "contra?"]],
    3: [["query_name", "climate changeR", "link", "cc desc"],
    ["query_name", "clintonR", "link", "bill and hill"],
    ["query_name", "trumpR", "link", "trump.com"],
    ["query_name", "kapR", "link", "america?"],
    ["query_name", "iranR", "link", "contra?"]]
}
"""
first_rank = extractFromFile("0g.txt", 5)
second_rank = extractFromFile("rp.txt", 5)
first = json.dumps(first_rank)
second = json.dumps(second_rank)


def home(request):
    context = {
        'first': first,
        'second': second
    }
    return render(request, 'version1/home.html', context)
    
def about(request):
    return render(request, 'version1/about.html')