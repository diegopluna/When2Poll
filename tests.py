from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time 

# Documentação selenium para Python: https://selenium-python.readthedocs.io/
# Exemplos: https://ordinarycoders.com/blog/article/testing-django-selenium

# chrome_options = webdriver.ChromeOptions()
# chrome_options.add_argument("--no-sandbox")
# chrome_options.add_argument("--headless")
# chrome_options.add_argument("--disable-gpu")
# browser = webdriver.Chrome(options=chrome_options)

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
driver = webdriver.Chrome(options=chrome_options)

# Create your tests here.

class TestHome(LiveServerTestCase):
    def test_title(self):
        driver.get('http://127.0.0.1:8000/')
        assert "When2Poll" in driver.title

    def test010_create_users(self):
        # options = ChromeOptions()
        # # driver = webdriver.Chrome(executable_path=r'C:/Selenium/chromedriver', options=options)
        # driver = webdriver.Chrome(options=options)
        driver.get('http://127.0.0.1:8000/signin/')
        # driver.maximize_window()

        time.sleep(3)
        
        for i in range(1,4):
            time.sleep(3)

            register = driver.find_element(By.ID,'signup')

            time.sleep(3)

            register.click()

            time.sleep(3)

            first_name = driver.find_element(By.ID,'firstName')
            last_name = driver.find_element(By.ID,'lastName')
            email = driver.find_element(By.ID,'email')
            password = driver.find_element(By.ID,'password')
            password_confirm = driver.find_element(By.ID,'passwordConfirm')

            time.sleep(3)

            first_name.send_keys('João')
            last_name.send_keys(f'Silva{i}')
            email.send_keys(f'joaosilva{i}@test.com')
            password.send_keys('Teste12345')
            password_confirm.send_keys('Teste12345')

            create = driver.find_element(By.ID,'submit')

            time.sleep(2)

            create.send_keys(Keys.RETURN)

    