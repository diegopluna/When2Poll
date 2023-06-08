# from django.test import LiveServerTestCase
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import Select


# # Documentação selenium para Python: https://selenium-python.readthedocs.io/
# # Exemplos: https://ordinarycoders.com/blog/article/testing-django-selenium




# # Create your tests here.

# class TestHome(LiveServerTestCase):
#     def test_title(self):
#         chrome_options = webdriver.ChromeOptions()
#         chrome_options.add_argument("--no-sandbox")
#         chrome_options.add_argument("--headless")
#         chrome_options.add_argument("--disable-gpu")
#         browser = webdriver.Chrome(options=chrome_options)
#         browser.get('http://127.0.0.1:8000/')
#         assert "When2Poll" in browser.title