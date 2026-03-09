from django.template.response import TemplateResponse
from django.template.exceptions import TemplateDoesNotExist
from django.http import HttpResponseServerError

def frontend_serving_view(request):
    """
    Serves the React frontend index.html for any given path.
    This allows React Router to handle the routing on the client side.
    """
    try:
        return TemplateResponse(request, 'index.html')
    except TemplateDoesNotExist:
        return HttpResponseServerError(
            "Frontend not found. Did you forget to run 'npm run build' inside the root folder?"
        )
