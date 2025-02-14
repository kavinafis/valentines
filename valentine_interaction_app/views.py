from django.shortcuts import render

def valentine_view(request):
    return render(request, 'index.html')
