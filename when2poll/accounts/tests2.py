from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.safari.options import Options as SafariOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import time 



#teste selenium historia criar grupo e convidar um usuario aleatorio e ver dashboard de grupos


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
        driver = webdriver.Chrome(executable_path=r'C:/Selenium/chromedriver',
                           options=options)
        driver.get('http://127.0.0.1:8000/login/')

        time.sleep(3)

        user_email = driver.find_element(By.NAME,'email')
        user_password = driver.find_element(By.NAME,'password')

        time.sleep(3)

        submit = driver.find_element(By.NAME,'submit')

        user_email.send_keys('jpbs2@cesar.school')
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
        
        
        #CRIAR GRUPO 1
        group_name = driver.find_element(By.NAME,'name')
        group_name.send_keys('Nome do Grupo')
        
        time.sleep(2)
        
        group_description = driver.find_element(By.XPATH, "//textarea[@name='description' and @placeholder='Descrição']")
        group_description.send_keys('Descrição')

        time.sleep(3)
        
        element = driver.find_element(By.ID, 'react-select-2-input')
        element.click()
        time.sleep(2)
        
        #Convidando 2 usuarios
        element.send_keys(Keys.ENTER)
        time.sleep(1)
        element.send_keys(Keys.DOWN)
        element.send_keys(Keys.ENTER)
        time.sleep(3)    
        
        create = driver.find_element(By.NAME, 'submit')
        create.click()
        time.sleep(2)
        
        #GRUPO 2
        group_name = driver.find_element(By.NAME,'name')
        group_name.send_keys('Outro Grupo')
        
        time.sleep(2)
        
        group_description = driver.find_element(By.XPATH, "//textarea[@name='description' and @placeholder='Descrição']")
        group_description.send_keys('Descrição do outro grupo')

        time.sleep(3)
        
        element = driver.find_element(By.ID, 'react-select-2-input')
        element.click()
        time.sleep(2)
        
        
        #Convidando 2 usuarios
        element.send_keys(Keys.ENTER)
        time.sleep(1)
        element.send_keys(Keys.DOWN)
        element.send_keys(Keys.ENTER)
        time.sleep(3)    
        
        create = driver.find_element(By.NAME, 'submit')
        create.click()
        time.sleep(3)

        back = driver.find_element(By.LINK_TEXT, 'Voltar')
        back.click()
        time.sleep(3)
        
        #ENTRAR PERFIL E LOGOUT
        click_profile=driver.find_element(By.LINK_TEXT, 'Aluno do cesar')
        click_profile.click() 
        time.sleep(5)

        logout=driver.find_element(By.LINK_TEXT, 'Sair')
        logout.click()
        time.sleep(3)
        
        #LOGAR CONTA RECEIVER
        Receiver_email = driver.find_element(By.NAME,'email')
        Receiver_password = driver.find_element(By.NAME,'password')

        time.sleep(3)

        submit = driver.find_element(By.NAME,'submit')

        Receiver_email.send_keys('jpbs1@cesar.school')
        Receiver_password.send_keys('qwertyui')

        submit.send_keys(Keys.RETURN)
        time.sleep(5)

        invites=driver.find_element(By.LINK_TEXT, 'Convites')
        invites.click() #INTERAGIR COM CONVITES

        time.sleep(5)
        
        #ACEITAR GRUPO 1
        receveid_event_1=driver.find_element(By.NAME,'Nome do Grupo')
        receveid_event_1.click()
        time.sleep(2)
        accept_event_1=driver.find_element(By.LINK_TEXT, 'Aceitar')
        accept_event_1.click()

        time.sleep(2)
        
        #RECUSAR GRUPO 2
        receveid_event_2=driver.find_element(By.NAME,'Outro Grupo')
        receveid_event_2.click()
        time.sleep(2)
        accept_event_2=driver.find_element(By.LINK_TEXT, 'Recusar')
        accept_event_2.click()
        time.sleep(2)
        
        #VER GRUPOS
        view_groups=driver.find_element(By.LINK_TEXT,'Grupos')
        view_groups.click()
        time.sleep(2)
        #Ver detalhes
        group_details=driver.find_element(By.NAME,'Nome do Grupo')
        group_details.click()
        
        time.sleep(3)
        driver.close()



        
        
