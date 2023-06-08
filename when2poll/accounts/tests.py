from django.test import LiveServerTestCase
from selenium.webdriver.chrome.webdriver import WebDriver

# Documentação selenium para Python: https://selenium-python.readthedocs.io/
# Exemplos: https://ordinarycoders.com/blog/article/testing-django-selenium

browser = WebDriver()


# Create your tests here.

class TestHome(LiveServerTestCase):
    def test_title(self):
        browser.get('http://127.0.0.1:8000/')
        assert "When2Poll" in browser.title