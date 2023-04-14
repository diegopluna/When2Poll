from django.views.generic import TemplateView


# Create your views here.
class LoginPage(TemplateView):
    template_name = "index.html"

class RegisterPage(TemplateView):
    template_name = "index.html"

class HomePage(TemplateView):
    template_name = "index.html"

class NewPollPage(TemplateView):
    template_name = "index.html"

class InvitesPage(TemplateView):
    template_name = "index.html"

class GroupsPage(TemplateView):
    template_name = "index.html"