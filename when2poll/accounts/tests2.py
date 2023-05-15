from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.safari.options import Options as SafariOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import time 
import random


#teste selenium historia criar grupo e convidar um usuario aleatorio


# class HostTest(LiveServerTestCase):
    
#     def testhomepage(self):
#         options = SafariOptions()
#         driver = webdriver.Safari(options=options)
#         driver.get('http://127.0.0.1:8000/login/')

#         time.sleep(5)
#         assert "When2Poll" in driver.title


class LoginFormTest(LiveServerTestCase):

    def testform(self):
        options = ChromeOptions()
        #options = SafariOptions()
        #driver = webdriver.Safari(options=options)
        # options.BinaryLocation='/Applications/Arc.app/Contents/MacOS/Arc'
        driver = webdriver.Chrome(executable_path=r'home/jp/Downloads/chromedriver',
                           options=options)
        driver.get('http://127.0.0.1:8000/login/')

        time.sleep(3)

        user_email = driver.find_element(By.NAME,'email')
        user_password = driver.find_element(By.NAME,'password')

        time.sleep(3)

        submit = driver.find_element(By.NAME,'submit')

        user_email.send_keys('jpbs1@cesar.school')
        user_password.send_keys('qwertyui')

        submit.send_keys(Keys.RETURN)

        time.sleep(3)
        
        groups=driver.find_element(By.LINK_TEXT, 'Grupos')
        groups.click() #INTERAGIR COM GRUPOS
        
        #driver.get('http://127.0.0.1:8000/groups/')
        
        time.sleep(3)
        
        new_group=driver.find_element(By.LINK_TEXT, 'Novo Grupo')
        new_group.click() #INTERAGIR COM Novo Grupo
        
        #driver.get('http://127.0.0.1:8000/newgroup/')
        
        group_name = driver.find_element(By.NAME,'name')
        group_name.send_keys('Nome do Grupo')
        
        time.sleep(2)
        
        group_description = driver.find_element(By.XPATH, "//textarea[@name='description' and @placeholder='Descrição']")
        group_description.send_keys('Descrição')

        time.sleep(3)
        
        element = driver.find_element(By.ID, 'react-select-2-input')
        element.click()
        time.sleep(2)
        x = random.randint(1, 10)
        #Convidando um usuario aleatorio
        for _ in range(x):
            element.send_keys(Keys.DOWN)
            time.sleep(1)
        element.send_keys(Keys.ENTER)
        
        time.sleep(3)    
        
        create = driver.find_element(By.XPATH,"//button[@type='submit' and @class='btn btn-success w-100' and @style='background-color: rgb(0, 173, 181);' and text()='Criar grupo']")
        create.click()
        time.sleep(3)

        back = driver.find_element(By.LINK_TEXT, 'Voltar')
        back.click()
        time.sleep(3)
        
        driver.close()