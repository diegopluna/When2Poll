from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time 

# Documentação selenium para Python: https://selenium-python.readthedocs.io/
# Exemplos: https://ordinarycoders.com/blog/article/testing-django-selenium


chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument('window-size=1920,1080')
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
driver = webdriver.Chrome(options=chrome_options)

# Create your tests here.

class TestHome(LiveServerTestCase):
    def test010_create_users(self):
        driver.get('http://127.0.0.1:8000/signin/')

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
            
    def test020_creategroup(self):

        driver.get('http://127.0.0.1:8000/signin/')


        #Logando
        time.sleep(3)

        user_email = driver.find_element(By.NAME,'email')
        user_password = driver.find_element(By.NAME,'password')

        time.sleep(3)

        submit = driver.find_element(By.ID,'submit')

        user_email.send_keys('joaosilva1@test.com')
        user_password.send_keys('Teste12345')

        submit.send_keys(Keys.RETURN)

        time.sleep(3)

        #Indo para a pagina de grupos
        groups=driver.find_element(By.LINK_TEXT, 'GROUPS')
        time.sleep(3)
        groups.click()

        time.sleep(3)

        #Indo para a pagina de novos grupos
        new_group=driver.find_element(By.ID, "addButton")
        new_group.click()

        #Criando grupo 1
        time.sleep(3)

        group_name = driver.find_element(By.NAME,'title')
        group_description = driver.find_element(By.NAME, "description")
        
        
        time.sleep(3)

        group_name.send_keys('Grupo 01')
        group_description.send_keys('Descrição do grupo')
        element = driver.find_element(By.ID, 'inviteUsers')
        time.sleep(2)

        element.click()

        time.sleep(3)
        element.send_keys('joaosilva2@test.com')
        time.sleep(3)
        element.send_keys(Keys.ARROW_DOWN, Keys.ENTER)
        time.sleep(3)
        element.send_keys('joaosilva3@test.com')
        time.sleep(3)
        element.send_keys(Keys.ARROW_DOWN, Keys.ENTER)
        time.sleep(3)    

        create = driver.find_element(By.ID, 'submit')
        create.click()
        time.sleep(3)

        new_group=driver.find_element(By.ID, "addButton")
        new_group.click()

        #Criando Grupo 2
        group_name = driver.find_element(By.NAME,'title')
        group_description = driver.find_element(By.NAME, "description")

        time.sleep(3)
        
        group_name.send_keys('Grupo 02')
        group_description.send_keys('Descrição do grupo 2')

        time.sleep(3)
        
        element = driver.find_element(By.ID, 'inviteUsers')
        element.click()
        time.sleep(3)
        element.send_keys('joaosilva2@test.com') 
        time.sleep(3)
        element.send_keys(Keys.ARROW_DOWN, Keys.ENTER)
        time.sleep(3)
        element.send_keys('joaosilva3@test.com')
        time.sleep(3)
        element.send_keys(Keys.ARROW_DOWN, Keys.ENTER)
        time.sleep(3)    
        
        create = driver.find_element(By.ID, 'submit')
        create.click()
        time.sleep(3)

        name_elements = driver.find_elements(By.ID,"groupName")
        names = [element.text for element in name_elements]
        expected_names = ['Grupo 01', 'Grupo 02']
        self.assertEqual(names, expected_names)
        
        ###LOGOUT
        avatar = driver.find_element(By.ID,"João Silva1")
        avatar.click()

        time.sleep(1)

        logout = driver.find_element(By.ID, "logout")
        logout.click()

    def test030_answergroupinvite(self):
        driver.get('http://127.0.0.1:8000/signin/')

        time.sleep(3)

        #LOGAR CONTA RECEIVER
        Receiver_email = driver.find_element(By.NAME,'email')
        Receiver_password = driver.find_element(By.NAME,'password')

        time.sleep(3)

        submit = driver.find_element(By.ID,'submit')

        Receiver_email.send_keys('joaosilva2@test.com')
        Receiver_password.send_keys('Teste12345')

        time.sleep(3)

        submit.send_keys(Keys.RETURN)

        time.sleep(3)

        invites=driver.find_element(By.LINK_TEXT, 'INVITES')
        invites.click()
        time.sleep(3)
        #ACEITAR GRUPO 1
        receveid_event_1=driver.find_element(By.ID,'acceptGrupo 01')
        receveid_event_1.click()
        time.sleep(3)

        #RECUSAR GRUPO 2
        receveid_event_2=driver.find_element(By.ID,'rejectGrupo 02')
        receveid_event_2.click()
        time.sleep(3)
        
        groups=driver.find_element(By.LINK_TEXT, 'GROUPS')
        groups.click()
        time.sleep(3)
        receveid_event_1=driver.find_element(By.ID,'detailsGrupo 01')
        receveid_event_1.click()
        time.sleep(3)
        grouptitle = driver.find_element(By.ID,"title")
        time.sleep(3)
        self.assertEqual('Grupo 01', grouptitle.text) 

        driver.close()


    