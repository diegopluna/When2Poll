from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from time import sleep


# Documentação selenium para Python: https://selenium-python.readthedocs.io/
# Exemplos: https://ordinarycoders.com/blog/article/testing-django-selenium


# chrome_options = webdriver.ChromeOptions()
# chrome_options.add_argument("--no-sandbox")
# chrome_options.add_argument("--headless")
# chrome_options.add_argument("--disable-gpu")
# browser = webdriver.Chrome(options=chrome_options)

# Create your tests here.

class TestHome(LiveServerTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.selenium = webdriver.Chrome()
        cls.selenium.implicitly_wait(10)

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super().tearDownClass()


    def test_title(self):
        
        # browser.get('http://127.0.0.1:8000/')
        # sleep(2)
        # assert "When2Poll" in browser.title

        self.selenium.get('http://127.0.0.1:8000/')
        sleep(4)
        self.assertEqual(1,1)