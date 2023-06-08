from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
# from selenium.webdriver.safari.options import Options as SafariOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import time 



#teste selenium historia criar grupo e convidar um usuario aleatorio e ver dashboard de grupos
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
driver = webdriver.Chrome(options=chrome_options)

# class HostTest(LiveServerTestCase):
    
#     def testhomepage(self):
#         options = SafariOptions()
#         driver = webdriver.Safari(options=options)
#         driver.get('http://127.0.0.1:8000/login/')

#         time.sleep(5)
#         assert "When2Poll" in driver.title

class SystemTest(LiveServerTestCase):
    

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

        driver.close()

    # def test020_creategroup(self):

    #     options = ChromeOptions()
    #     driver = webdriver.Chrome(executable_path=r'C:/Selenium/chromedriver', options=options)
    #     driver.get('http://127.0.0.1:8000/login/')
    #     driver.maximize_window()


    #     #Logando
    #     time.sleep(3)

    #     user_email = driver.find_element(By.NAME,'email')
    #     user_password = driver.find_element(By.NAME,'password')

    #     time.sleep(3)

    #     submit = driver.find_element(By.NAME,'submit')

    #     user_email.send_keys('joaosilva1@test.com')
    #     user_password.send_keys('Teste12345')

    #     submit.send_keys(Keys.RETURN)

    #     time.sleep(3)

    #     #Indo para a pagina de grupos
    #     groups=driver.find_element(By.LINK_TEXT, 'Grupos')
    #     time.sleep(3)
    #     groups.click()

    #     time.sleep(3)

    #     #Indo para a pagina de novos grupos
    #     new_group=driver.find_element(By.LINK_TEXT, 'Novo Grupo')
    #     new_group.click()

    #     #Criando grupo 1
    #     time.sleep(3)

    #     group_name = driver.find_element(By.NAME,'name')
    #     group_description = driver.find_element(By.XPATH, "//textarea[@name='description' and @placeholder='Descrição']")
        
        
    #     time.sleep(3)

    #     group_name.send_keys('Grupo 01')
    #     group_description.send_keys('Descrição do grupo')
    #     element = driver.find_element(By.ID, 'react-select-2-input')
    #     time.sleep(2)

    #     element.click()

    #     time.sleep(2)

    #     element.send_keys(Keys.ENTER)
    #     time.sleep(3)
    #     element.send_keys(Keys.DOWN)
    #     element.send_keys(Keys.ENTER)
    #     time.sleep(3) 

    #     create = driver.find_element(By.NAME, 'submit')
    #     create.click()
    #     time.sleep(3)

    #     #Criando Grupo 2
    #     group_name = driver.find_element(By.NAME,'name')
    #     group_description = driver.find_element(By.XPATH, "//textarea[@name='description' and @placeholder='Descrição']")

    #     time.sleep(3)
        
    #     group_name.send_keys('Grupo 02')
    #     group_description.send_keys('Descrição do grupo 2')

    #     time.sleep(3)
        
    #     element = driver.find_element(By.ID, 'react-select-2-input')
    #     element.click()
    #     time.sleep(3)
        
    #     element.send_keys(Keys.ENTER)
    #     time.sleep(3)
    #     element.send_keys(Keys.DOWN)
    #     element.send_keys(Keys.ENTER)
    #     time.sleep(3)    
        
    #     create = driver.find_element(By.NAME, 'submit')
    #     create.click()
    #     time.sleep(3)

    #     back = driver.find_element(By.LINK_TEXT, 'Voltar')
    #     back.click()
    #     time.sleep(3)

    #     name_elements = driver.find_elements(By.CSS_SELECTOR,".card-body")
    #     names = [element.text for element in name_elements]
    #     expected_names = ['Grupo 01', 'Grupo 02']
    #     self.assertEqual(names, expected_names)

    # def test030_answergroupinvite(self):
    #     options = ChromeOptions()
    #     driver = webdriver.Chrome(executable_path=r'C:/Selenium/chromedriver', options=options)
    #     driver.get('http://127.0.0.1:8000/login/')
    #     driver.maximize_window()

    #     time.sleep(3)

    #     #LOGAR CONTA RECEIVER
    #     Receiver_email = driver.find_element(By.NAME,'email')
    #     Receiver_password = driver.find_element(By.NAME,'password')

    #     time.sleep(3)

    #     submit = driver.find_element(By.NAME,'submit')

    #     Receiver_email.send_keys('joaosilva2@test.com')
    #     Receiver_password.send_keys('Teste12345')

    #     time.sleep(3)

    #     submit.send_keys(Keys.RETURN)

    #     time.sleep(3)

    #     invites=driver.find_element(By.LINK_TEXT, 'Convites')
    #     invites.click()
    #     time.sleep(3)
    #     #ACEITAR GRUPO 1
    #     receveid_event_1=driver.find_element(By.NAME,'Grupo 01')
    #     receveid_event_1.click()
    #     time.sleep(3)
    #     accept_event_1=driver.find_element(By.LINK_TEXT, 'Aceitar')
    #     accept_event_1.click()

    #     time.sleep(3)

    #     #RECUSAR GRUPO 2
    #     receveid_event_2=driver.find_element(By.NAME,'Grupo 02')
    #     receveid_event_2.click()
    #     time.sleep(3)
    #     accept_event_2=driver.find_element(By.LINK_TEXT, 'Recusar')
    #     accept_event_2.click()
    #     time.sleep(3)
        
    #     groups=driver.find_element(By.LINK_TEXT, 'Grupos')
    #     time.sleep(3)
    #     groups.click()
    #     time.sleep(3)
    #     receveid_event_1=driver.find_element(By.NAME,'Grupo 01')
    #     receveid_event_1.click()
    #     time.sleep(3)
    #     grouptitle = driver.find_element(By.NAME,"title")
    #     time.sleep(3)
    #     self.assertEqual('Grupo 01', grouptitle.text) 

    #     driver.close()

    # def test040_createpoll(self):
    #     options = ChromeOptions()
    #     driver = webdriver.Chrome(executable_path=r'C:/Selenium/chromedriver', options=options)
    #     driver.get('http://127.0.0.1:8000/signin/')
    #     driver.maximize_window()

    #     time.sleep(3)

    #     #LOGAR CONTA RECEIVER
    #     Receiver_email = driver.find_element(By.NAME,'email')
    #     Receiver_password = driver.find_element(By.NAME,'password')

    #     time.sleep(3)

    #     submit = driver.find_element(By.NAME,'submit')

    #     Receiver_email.send_keys('joaosilva1@test.com')
    #     Receiver_password.send_keys('Teste12345')

    #     time.sleep(3)

    #     submit.send_keys(Keys.RETURN)

    #     time.sleep(3)
    #     newpoll=driver.find_element(By.LINK_TEXT, 'Nova Reunião')
    #     newpoll.click()
    #     time.sleep(3)

    #     driver.execute_script("window.scrollBy(0, 500)")
    #     time.sleep(3)
        
    #     event_create_name = driver.find_element(By.NAME,'name')
    #     event_create_name.send_keys('Evento 01')
    #     time.sleep(3)
        
    #     event_create_description = driver.find_element(By.XPATH, "//textarea[@class='form-control font-face-sfregular' and @type='text' and @name='description' and @placeholder='Descrição']")
    #     event_create_description.send_keys('Descrição do evento 01')
    #     time.sleep(3)
        
    #     select_day = driver.find_element(By.XPATH, "//span[contains(text(), '19') and contains(@class, 'sd')]")
    #     select_day.click()

    #     time.sleep(3)
        
        
    #     #poll time
        
    #     #duration add 1 hour
    #     driver.find_element(By.XPATH, "/html/body/div/div[2]/div/form/div[3]/div/div[2]/div/div[1]/button[1]").click()
    #     time.sleep(3)
        
    #     #init time add 3 hours
    #     for i in range(3):
    #         driver.find_element(By.XPATH, "/html/body/div/div[2]/div/form/div[3]/div/div[3]/div/div[1]/button[1]").click()
    #         time.sleep(3)
        
    #     #end time  decrease 2 hours
    #     for i in range(2):
    #         driver.find_element(By.XPATH, "/html/body/div/div[2]/div/form/div[3]/div/div[4]/div/div[1]/button[2]").click()
    #         time.sleep(3)

    #     #interact with group button
    #     element = driver.find_element(By.ID, 'react-select-2-input')
    #     element.click()
    #     time.sleep(3)
    #     element.send_keys(Keys.ENTER)
    #     time.sleep(3)

    #     submit = driver.find_element(By.NAME,'submit')
    #     submit.click()
    #     time.sleep(3)
    #     driver.execute_script("window.scrollTo(0, 0)")
    #     time.sleep(2)
    #     home=driver.find_element(By.LINK_TEXT, 'Início')
    #     home.click()
    #     time.sleep(3)

    #     event = driver.find_element(By.XPATH, '//*[@id="root"]/div[2]/div/ul/button/span')
    #     event.click()
    #     time.sleep(3)

    #     title = driver.find_element(By.NAME,'title')
    #     time.sleep(3)
    #     self.assertEqual('Evento 01', title.text)

    #     driver.close()

    # def test050_answerpoll(self):
    #     options = ChromeOptions()
    #     driver = webdriver.Chrome(executable_path=r'C:/Selenium/chromedriver', options=options)
    #     driver.get('http://127.0.0.1:8000/login/')
    #     driver.maximize_window()

    #     time.sleep(3)

    #     #LOGAR CONTA RECEIVER
    #     Receiver_email = driver.find_element(By.NAME,'email')
    #     Receiver_password = driver.find_element(By.NAME,'password')

    #     time.sleep(3)

    #     submit = driver.find_element(By.NAME,'submit')

    #     Receiver_email.send_keys('joaosilva2@test.com')
    #     Receiver_password.send_keys('Teste12345')

    #     time.sleep(3)

    #     submit.send_keys(Keys.RETURN)

    #     time.sleep(3)

    #     invites=driver.find_element(By.LINK_TEXT, 'Convites')
    #     invites.click()
    #     time.sleep(3)

    #     receveid_event_1=driver.find_element(By.XPATH,'//*[@id="root"]/div[2]/div/div/div[2]/button')
    #     receveid_event_1.click()
    #     time.sleep(3)
    #     submit = driver.find_element(By.NAME, 'submit')
    #     submit.click()
    
    # def test060_giveadmin(self):
    #     options = ChromeOptions()
    #     driver = webdriver.Chrome(executable_path=r'C:/Selenium/chromedriver', options=options)
    #     driver.get('http://127.0.0.1:8000/login/')
    #     driver.maximize_window()

    #     time.sleep(3)

    #     #LOGAR CONTA RECEIVER
    #     Receiver_email = driver.find_element(By.NAME,'email')
    #     Receiver_password = driver.find_element(By.NAME,'password')

    #     time.sleep(3)

    #     submit = driver.find_element(By.NAME,'submit')

    #     Receiver_email.send_keys('joaosilva1@test.com')
    #     Receiver_password.send_keys('Teste12345')

    #     time.sleep(3)

    #     submit.send_keys(Keys.RETURN)

    #     time.sleep(3)

    #     receveid_event_1=driver.find_element(By.XPATH,'//*[@id="root"]/div[2]/div/ul/button/span')
    #     receveid_event_1.click()
    #     time.sleep(3)
    #     admin_check = driver.find_element(By.XPATH,'//*[@id="root"]/div[2]/div/div/table/tbody/tr[2]/th[3]/input')
    #     admin_check.click()

    #     time.sleep(3)
    #     click_profile=driver.find_element(By.LINK_TEXT, 'João Silva1')
    #     click_profile.click() 
    #     time.sleep(3)
    #     logout=driver.find_element(By.LINK_TEXT, 'Sair')
    #     logout.click()
    #     time.sleep(3)
    #     Receiver_email = driver.find_element(By.NAME,'email')
    #     Receiver_password = driver.find_element(By.NAME,'password')

    #     time.sleep(3)

    #     submit = driver.find_element(By.NAME,'submit')

    #     Receiver_email.send_keys('joaosilva2@test.com')
    #     Receiver_password.send_keys('Teste12345')

    #     time.sleep(3)

    #     submit.send_keys(Keys.RETURN)

    #     time.sleep(3)

    #     receveid_event_1=driver.find_element(By.XPATH,'//*[@id="root"]/div[2]/div/ul/button/span')
    #     receveid_event_1.click()
    #     time.sleep(3)
    #     user_type = driver.find_element(By.XPATH, '//*[@id="root"]/div[2]/div/div/table/tbody/tr[2]/th[3]')
    #     self.assertEqual('Administrador', user_type.text)










# class LoginFormTest(LiveServerTestCase):

#     def testform(self):
#         options = ChromeOptions()
#         #options = SafariOptions()
#         #driver = webdriver.Safari(options=options)
#         # options.BinaryLocation='/Applications/Arc.app/Contents/MacOS/Arc'
#         driver = webdriver.Chrome(executable_path=r'C:/Selenium/chromedriver',
#                            options=options)
#         driver.get('http://127.0.0.1:8000/login/')
#         driver.maximize_window()
#         time.sleep(3)

#         user_email = driver.find_element(By.NAME,'email')
#         user_password = driver.find_element(By.NAME,'password')

#         time.sleep(3)

#         submit = driver.find_element(By.NAME,'submit')

#         user_email.send_keys('alunodocesar@cesar.school')
#         user_password.send_keys('qwertyui')

#         submit.send_keys(Keys.RETURN)

#         time.sleep(3)
        
#         groups=driver.find_element(By.LINK_TEXT, 'Grupos')
#         groups.click() #INTERAGIR COM GRUPOS
        
#         #driver.get('http://127.0.0.1:8000/groups/')
        
#         time.sleep(3)
        
#         new_group=driver.find_element(By.LINK_TEXT, 'Novo Grupo')
#         new_group.click() #INTERAGIR COM Novo Grupo
        
#         #driver.get('http://127.0.0.1:8000/newgroup/')
        
        
#         #CRIAR GRUPO 1
#         group_name = driver.find_element(By.NAME,'name')
#         group_name.send_keys('Nome do Grupo')
        
#         time.sleep(3)
        
#         group_description = driver.find_element(By.XPATH, "//textarea[@name='description' and @placeholder='Descrição']")
#         group_description.send_keys('Descrição')

#         time.sleep(3)
        
#         element = driver.find_element(By.ID, 'react-select-2-input')
#         element.click()
#         time.sleep(3)
        
#         #Convidando 2 usuarios
#         element.send_keys(Keys.ENTER)
#         time.sleep(3)
#         element.send_keys(Keys.DOWN)
#         element.send_keys(Keys.ENTER)
#         time.sleep(3)    
        
#         create = driver.find_element(By.NAME, 'submit')
#         create.click()
#         time.sleep(3)
        
#         #GRUPO 2
#         group_name = driver.find_element(By.NAME,'name')
#         group_name.send_keys('Outro Grupo')
        
#         time.sleep(3)
        
#         group_description = driver.find_element(By.XPATH, "//textarea[@name='description' and @placeholder='Descrição']")
#         group_description.send_keys('Descrição do outro grupo')

#         time.sleep(3)
        
#         element = driver.find_element(By.ID, 'react-select-2-input')
#         element.click()
#         time.sleep(3)
        
        
#         #Convidando 2 usuarios
#         element.send_keys(Keys.ENTER)
#         time.sleep(3)
#         element.send_keys(Keys.DOWN)
#         element.send_keys(Keys.ENTER)
#         time.sleep(3)    
        
#         create = driver.find_element(By.NAME, 'submit')
#         create.click()
#         time.sleep(3)

#         back = driver.find_element(By.LINK_TEXT, 'Voltar')
#         back.click()
#         time.sleep(3)
        
#         #aqui
        
#         #Criar um evento
#         driver.get('http://127.0.0.1:8000/newpoll/')
#         time.sleep(3)
#         #scrole down
#         driver.execute_script("window.scrollBy(0, 500)")
#         time.sleep(3)
        
#         event_create_name = driver.find_element(By.NAME,'name')
#         event_create_name.send_keys('Nome do evento')
#         time.sleep(3)
        
#         event_create_description = driver.find_element(By.XPATH, "//textarea[@class='form-control font-face-sfregular' and @type='text' and @name='description' and @placeholder='Descrição']")
#         event_create_description.send_keys('Descrição do evento')
#         time.sleep(3)
        
#         select_day = driver.find_element(By.XPATH, "//span[contains(text(), '19') and contains(@class, 'sd')]")
#         select_day.click()

#         time.sleep(3)
        
        
#         #poll time
        
#         #duration add 1 hour
#         driver.find_element(By.XPATH, "/html/body/div/div[2]/div/form/div[3]/div/div[2]/div/div[1]/button[1]").click()
#         time.sleep(3)
        
#         #init time add 3 hours
#         for _ in range(3):
#             driver.find_element(By.XPATH, "/html/body/div/div[2]/div/form/div[3]/div/div[3]/div/div[1]/button[1]").click()
#             time.sleep(3)
        
#         #end time  decrease 2 hours
#         for _ in range(2):
#             driver.find_element(By.XPATH, "/html/body/div/div[2]/div/form/div[3]/div/div[4]/div/div[1]/button[2]").click()
#             time.sleep(3)

#         #interact with group button
#         element = driver.find_element(By.ID, 'react-select-2-input')
#         element.click()
#         time.sleep(3)
#         element.send_keys(Keys.ENTER)
#         time.sleep(3)

#         submit = driver.find_element(By.NAME,'submit')
#         submit.click()

#         time.sleep(3)
        
#         #LOGOUT
#         driver.execute_script("window.scrollTo(0, 0)")
#         time.sleep(3)
#         click_profile=driver.find_element(By.LINK_TEXT, 'Aluno do cesar')
#         click_profile.click() 
#         time.sleep(3)

#         logout=driver.find_element(By.LINK_TEXT, 'Sair')
#         logout.click()
#         time.sleep(3)
        
#         #LOGAR CONTA RECEIVER
#         Receiver_email = driver.find_element(By.NAME,'email')
#         Receiver_password = driver.find_element(By.NAME,'password')

#         time.sleep(3)

#         submit = driver.find_element(By.NAME,'submit')

#         Receiver_email.send_keys('aluno1@cesar.school')
#         Receiver_password.send_keys('qwertyui')

#         submit.send_keys(Keys.RETURN)
#         time.sleep(3)

#         invites=driver.find_element(By.LINK_TEXT, 'Convites')
#         invites.click() #INTERAGIR COM CONVITES

#         time.sleep(3)
        
#         #ACEITAR GRUPO 1
#         receveid_event_1=driver.find_element(By.NAME,'Nome do Grupo')
#         receveid_event_1.click()
#         time.sleep(3)
#         accept_event_1=driver.find_element(By.LINK_TEXT, 'Aceitar')
#         accept_event_1.click()

#         time.sleep(3)
        
#         #RECUSAR GRUPO 2
#         receveid_event_2=driver.find_element(By.NAME,'Outro Grupo')
#         receveid_event_2.click()
#         time.sleep(3)
#         accept_event_2=driver.find_element(By.LINK_TEXT, 'Recusar')
#         accept_event_2.click()
#         time.sleep(3)
        
#         #VER GRUPOS
#         view_groups=driver.find_element(By.LINK_TEXT,'Grupos')
#         view_groups.click()
#         time.sleep(3)
#         #Ver detalhes
#         group_details=driver.find_element(By.NAME,'Nome do Grupo')
#         group_details.click()
#         time.sleep(3)
        
        
        
        
        
        
        
#         driver.close()



        
        
