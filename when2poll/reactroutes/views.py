from django.views.generic import TemplateView


# Create your views here.
class LoginPage(TemplateView):
    template_name = "index.html"

class RegisterPage(TemplateView):
    template_name = "index.html"