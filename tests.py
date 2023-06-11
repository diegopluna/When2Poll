from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC

import time 
import datetime

# Documentação selenium para Python: https://selenium-python.readthedocs.io/
# Exemplos: https://ordinarycoders.com/blog/article/testing-django-selenium

# chrome_options = webdriver.FirefoxOptions()
# chrome_options.add_argument("--no-sandbox")
# chrome_options.add_argument('window-size=1080,1440')
# chrome_options.add_argument("--start-maximized")
# chrome_options.add_argument("--headless")
# chrome_options.add_argument("--disable-gpu")
# chrome_options.add_argument('--disable-dev-shm-usage')
#chrome_options.add_argument("--start-fullscreen")



chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--disable-browser-side-navigation")
#chrome_options.add_argument("--no-sandbox")
#chrome_options.add_argument("--headless")
chrome_options.add_argument("window-size=1080,1440")
#chrome_options.add_argument("--start-maximized")
#chrome_options.add_argument("--disable-gpu")
#chrome_options.add_argument("force-device-scale-factor=0.5")
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument("--disable-extensions")
#chrome_options.add_argument("--start-fullscreen")

driver = webdriver.Chrome(options=chrome_options)
# driver.set_window_size(1080, 1440)

# driver = webdriver.Firefox(options=chrome_options, executable_path='/usr/bin/geckodriver')
# Create your tests here.

class TestHome(LiveServerTestCase):
    
    def test010_create_users(self):
        
        driver.get('http://127.0.0.1:8000/signin/')
        
        for i in range(1,6):
            time.sleep(1)
            register = driver.find_element(By.ID,'signup')
            register.click()


            first_name = driver.find_element(By.ID,'firstName')
            last_name = driver.find_element(By.ID,'lastName')
            email = driver.find_element(By.ID,'email')
            password = driver.find_element(By.ID,'password')
            password_confirm = driver.find_element(By.ID,'passwordConfirm')

            first_name.send_keys('João')
            last_name.send_keys(f'Silva{i}')
            email.send_keys(f'joaosilva{i}@test.com')
            password.send_keys('Teste12345')
            password_confirm.send_keys('Teste12345')

            create = driver.find_element(By.ID,'submit')

            create.send_keys(Keys.RETURN)
            
    def test020_addfriends(self):       
    
        #Logando
        driver.get("http://127.0.0.1:8000/signin/")
        time.sleep(2)
        user_email = driver.find_element(By.NAME,'email')
        user_email.send_keys('joaosilva1@test.com')
        user_password = driver.find_element(By.NAME,'password')
        user_password.send_keys('Teste12345')
        submit = driver.find_element(By.ID,'submit')
        submit.click()
        #submit.send_keys(Keys.RETURN)
        
        

        

        time.sleep(1)
        #convida joaosilva2 e joaosilva3
        time.sleep(2)
        driver.get("http://127.0.0.1:8000/friends/")
        
        search_user = WebDriverWait(driver, 30).until(EC.visibility_of_element_located((By.ID, 'inviteUsers')))
        search_user.click()
        for i in range(2,4):
                time.sleep(3)
                ActionChains(driver).move_to_element(search_user).send_keys(f"joaosilva{i}@test.com").perform()
                time.sleep(3)
                search_user.send_keys(Keys.ARROW_DOWN, Keys.ENTER) 
                time.sleep(2)
                submit = driver.find_element(By.ID,'submit')
                submit.click()
                time.sleep(2)
                if i == 2:
                    search_user = WebDriverWait(driver, 30).until(EC.visibility_of_element_located((By.ID, 'inviteUsers')))
                    search_user.click()    
    
    def test030_accept_invites(self):
        #logout
        avatar = driver.find_element(By.ID,"João Silva1")
        avatar.click()
        time.sleep(2)
        logout = driver.find_element(By.ID, "logout")
        logout.click()
        #entra na conta silva2 e silva3 e aceita a amizade
        time.sleep(2)
        for i in range(2,4):
            #driver.get("http://127.0.0.1:8000/signin/")
            time.sleep(2)
            user_email = driver.find_element(By.NAME,'email')
            time.sleep(1)
            user_email.send_keys(f'joaosilva{i}@test.com')
            user_password = driver.find_element(By.NAME,'password')
            time.sleep(1)
            user_password.send_keys('Teste12345')
            time.sleep(1)
            submit = driver.find_element(By.ID,'submit')
            submit.click()
            #aceitar amizade
            time.sleep(2)
            driver.get("http://127.0.0.1:8000/friends")
            accept = WebDriverWait(driver, 30).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[aria-label='accept-invite']")))
            accept.click()
            time.sleep(5)
            #logout
            avatar = driver.find_element(By.ID,f"João Silva{i}")
            avatar.click()
            time.sleep(1)
            logout = driver.find_element(By.ID, "logout")
            logout.click()
    def test040_creategroup(self):

        driver.get('http://127.0.0.1:8000/signin/')


        # #Logando
        time.sleep(3)
        user_email = driver.find_element(By.NAME,'email')
        user_password = driver.find_element(By.NAME,'password')

        submit = driver.find_element(By.ID,'submit')

        user_email.send_keys('joaosilva1@test.com')
        user_password.send_keys('Teste12345')

        submit.send_keys(Keys.RETURN)

        time.sleep(1)

        #Indo para a pagina de grupos
        groups=driver.find_element(By.LINK_TEXT, 'GROUPS')
        groups.click()
        driver.get("http://127.0.0.1:8000/groups/")
        time.sleep(1)

        #Indo para a pagina de novos grupos
        new_group=driver.find_element(By.ID, "addButton")
        new_group.click()

        #Criando grupo 1
        time.sleep(1)

        group_name = driver.find_element(By.NAME,'title')
        group_description = driver.find_element(By.NAME, "description")
        
        
        group_name.send_keys('Grupo 01')
        group_description.send_keys('Descrição do grupo')
        element = driver.find_element(By.ID, 'inviteUsers')
        element.click()

        element.send_keys('joaosilva2@test.com')
        time.sleep(1)
        element.send_keys(Keys.ARROW_DOWN, Keys.ENTER)
        
        element.send_keys('joaosilva3@test.com')
        time.sleep(1)
        element.send_keys(Keys.ARROW_DOWN, Keys.ENTER) 
        create = driver.find_element(By.ID, 'submit')
        create.click()
        time.sleep(1)

        new_group=driver.find_element(By.ID, "addButton")
        new_group.click()
        
        #Criando Grupo 2
        time.sleep(1)
        group_name = driver.find_element(By.NAME,'title')
        group_description = driver.find_element(By.NAME, "description")
        
        group_name.send_keys('Grupo 02')
        group_description.send_keys('Descrição do grupo 2')
        
        element = driver.find_element(By.ID, 'inviteUsers')
        element.click()
        element.send_keys('joaosilva2@test.com') 
        time.sleep(1)
        element.send_keys(Keys.ARROW_DOWN, Keys.ENTER)
        element.send_keys('joaosilva3@test.com')
        time.sleep(1)
        element.send_keys(Keys.ARROW_DOWN, Keys.ENTER)
        create = driver.find_element(By.ID, 'submit')
        create.click()
        time.sleep(1)

        name_elements = driver.find_elements(By.ID,"groupName")
        names = [element.text for element in name_elements]
        expected_names = ['Grupo 01', 'Grupo 02']
        self.assertEqual(names, expected_names)
        
        ###LOGOUT
        avatar = driver.find_element(By.ID,"João Silva1")
        avatar.click()

        logout = driver.find_element(By.ID, "logout")
        logout.click()

    def test050_answergroupinvite(self):

        driver.get('http://127.0.0.1:8000/signin/')

        #LOGAR CONTA RECEIVER
        Receiver_email = driver.find_element(By.NAME,'email')
        Receiver_password = driver.find_element(By.NAME,'password')

        submit = driver.find_element(By.ID,'submit')

        Receiver_email.send_keys('joaosilva2@test.com')
        Receiver_password.send_keys('Teste12345')

        submit.send_keys(Keys.RETURN)

        time.sleep(1)

        invites=driver.find_element(By.LINK_TEXT, 'INVITES')
        invites.click()
        time.sleep(1)
        #ACEITAR GRUPO 1
        receveid_event_1=driver.find_element(By.ID,'acceptGrupo 01')
        receveid_event_1.click()
        time.sleep(1)

        #RECUSAR GRUPO 2
        receveid_event_2=driver.find_element(By.ID,'rejectGrupo 02')
        receveid_event_2.click()
        time.sleep(1)
        
        groups=driver.find_element(By.LINK_TEXT, 'GROUPS')
        groups.click()
        time.sleep(1)
        receveid_event_1=driver.find_element(By.ID,'detailsGrupo 01')
        receveid_event_1.click()
        time.sleep(1)
        grouptitle = driver.find_element(By.ID,"title")
        self.assertEqual('Grupo 01', grouptitle.text) 

        avatar = driver.find_element(By.ID,"João Silva2")
        avatar.click()

        logout = driver.find_element(By.ID, "logout")
        logout.click()

    def test060_createpoll(self):
            driver.get('http://127.0.0.1:8000/signin/')
            

            #LOGAR CONTA RECEIVER
            Receiver_email = driver.find_element(By.NAME,'email')
            Receiver_password = driver.find_element(By.NAME,'password')

            submit = driver.find_element(By.ID,'submit')

            Receiver_email.send_keys('joaosilva1@test.com')
            Receiver_password.send_keys('Teste12345')

            submit.send_keys(Keys.RETURN)

            time.sleep(1)
            newpoll=driver.find_element(By.PARTIAL_LINK_TEXT, 'NEW POLL')
            newpoll.click()
            time.sleep(1)
            #zoom out 
            #actions = ActionChains(driver)
            #zoom = driver.find_element(By.NAME,'title')
            #zoom.click()
            #zoom.(Keys.CONTROL + '-')
            # ActionChains(driver)\
            #     .key_down(Keys.CONTROL)\
            #     .key_down(Keys.SUBTRACT)\
            #     .perform()
            # time.sleep(2)
            
            event_create_name = driver.find_element(By.NAME,'title')
            event_create_name.send_keys('Evento 01')
            event_create_description = driver.find_element(By.NAME, "description")
            event_create_description.send_keys('Descrição do evento 01')
            #WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH,f"//span[contains(text(), '19') and contains(@class, 'sd')]")))
            select_day1 = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH,f"//span[contains(text(), '19') and contains(@class, 'sd')]")))
            select_day1.click()
            #WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH,"//span[contains(text(), '24') and contains(@class, 'sd')]")))
            select_day2 = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH,"//span[contains(text(), '24') and contains(@class, 'sd')]")))
            select_day2.click()        
            #driver.execute_script("window.scrollBy(0, 500)")
            #driver.execute_script("window.scrollBy(0, document.body.scrollHeight)")
            
            #poll time
            #duration add 1 hour
            duration = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH,"/html/body/div[1]/div[3]/form/div[4]/div/input")))
            ActionChains(driver).move_to_element(duration).click().perform()
            ActionChains(driver).move_to_element(duration).send_keys("0200").perform()
            #ActionChains(driver).move_to_element(duration).click().perform()
            #ActionChains(driver).move_to_element(duration).send_keys("0200").perform()
            # duration = driver.find_element(By.XPATH,"/html/body/div[1]/div[3]/form/div[4]/div/input")
            # driver.execute_script('arguments[0].click()',duration)
            # duration.click()
            # driver.implicitly_wait(1)
            # # time.sleep(3)
            # duration.send_keys("0200")
            # duration.send_keys(Keys.ARROW_UP,Keys.ARROW_UP)
            
            earliest = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH,"/html/body/div[1]/div[3]/form/div[5]/div/input")))
            ActionChains(driver).move_to_element(earliest).click().perform()
            ActionChains(driver).move_to_element(earliest).send_keys("0630").perform()
            #ActionChains(driver).move_to_element(earliest).click().perform()
            #ActionChains(driver).move_to_element(earliest).send_keys("0630").perform()
            
            latest = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH,"/html/body/div[1]/div[3]/form/div[6]/div/input")))
            ActionChains(driver).move_to_element(latest).click().perform()
            ActionChains(driver).move_to_element(latest).send_keys("1730").perform()
            #ActionChains(driver).move_to_element(latest).click().perform()
            #ActionChains(driver).move_to_element(latest).send_keys("1730").perform()        
            #init time add 3 hours
            # earliest = driver.find_element(By.XPATH,"/html/body/div[1]/div[3]/form/div[5]/div/input")
            # earliest.click()
            # time.sleep(3)
            # earliest.send_keys("0630")
            # time.sleep(3)
            
            #end time  decrease 2 hours
            # latest = driver.find_element(By.XPATH,"/html/body/div[1]/div[3]/form/div[6]/div/input")
            # latest.click()
            # time.sleep(2)
            # latest.send_keys("1730")
            # time.sleep(3)

            #invite groups to the poll
            element = driver.find_element(By.ID, 'inviteGroups')
            element.click()
            time.sleep(1)
            
            #invite 2 groups
            element.send_keys(Keys.DOWN)
            time.sleep(1)
            element.send_keys(Keys.ENTER)
            time.sleep(1)
            element.send_keys(Keys.DOWN)
            time.sleep(1)
            element.send_keys(Keys.DOWN)
            element.send_keys(Keys.ENTER) 
            #-------------------------------------------
            time.sleep(1)
            element.send_keys(Keys.LEFT_ALT)
            time.sleep(1)
            #driver.execute_script("window.scrollTo(0, 1000)")
            #ActionChains(driver).move_to_element(submit).click()
            #driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")

            submit = WebDriverWait(driver, 30).until(EC.visibility_of_element_located((By.ID, 'submit')))
            submit.click()
            # poll_create = driver.find_element(By.ID,'submit')
            # poll_create.click()
            
            #create = driver.find_element(By.ID, …        
            
    
    def test070_addFriends(self):
            
            
            
            #comeca aqui
            time.sleep(2)
            driver.get("http://127.0.0.1:8000/friends")
            
            #time.sleep(3)
            
            search_user = WebDriverWait(driver, 30).until(EC.visibility_of_element_located((By.ID, 'inviteUsers')))
            search_user.click()
            
            #avatar.click()
            #pedidos de amizade
            #search_user = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.ID,'inviteUser')))
            #search_user.click()
            #search_user.click()
            
            #convida joaosilva4 e joaosilva5
            for i in range(4,6):
                time.sleep(3)
                ActionChains(driver).move_to_element(search_user).send_keys(f"joaosilva{i}@test.com").perform()
                time.sleep(3)
                search_user.send_keys(Keys.ARROW_DOWN, Keys.ENTER) 
                time.sleep(2)
                submit = driver.find_element(By.ID,'submit')
                submit.click()
                time.sleep(2)
                search_user = WebDriverWait(driver, 30).until(EC.visibility_of_element_located((By.ID, 'inviteUsers')))
                search_user.click()
                
            #LOGOUT SENDER
            avatar = driver.find_element(By.ID,"João Silva1")
            avatar.click()

            logout = driver.find_element(By.ID, "logout")
            logout.click()   

            #LOGIN RECEIVER 1
            driver.get('http://127.0.0.1:8000/signin/')

            Receiver_email = driver.find_element(By.NAME,'email')
            Receiver_password = driver.find_element(By.NAME,'password')

            submit = driver.find_element(By.ID,'submit')

            Receiver_email.send_keys('joaosilva4@test.com')
            Receiver_password.send_keys('Teste12345')

            submit.send_keys(Keys.RETURN)
            
            #vai para friends
            time.sleep(2)
            driver.get("http://127.0.0.1:8000/friends")
            
            #aceita amizade
            accept = WebDriverWait(driver, 30).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[aria-label='accept-invite']")))
            accept.click()
            time.sleep(5)

            #LOGOUT RECEIVER 1
            avatar = driver.find_element(By.ID,"João Silva4")
            avatar.click()

            logout = driver.find_element(By.ID, "logout")
            logout.click() 
            time.sleep(1)
            
            #LOGIN RECEIVER 2
            driver.get('http://127.0.0.1:8000/signin/')

            Receiver_email = driver.find_element(By.NAME,'email')
            Receiver_password = driver.find_element(By.NAME,'password')

            submit = driver.find_element(By.ID,'submit')

            Receiver_email.send_keys('joaosilva5@test.com')
            Receiver_password.send_keys('Teste12345')

            submit.send_keys(Keys.RETURN)
            
            #vai para friends
            time.sleep(2)
            driver.get("http://127.0.0.1:8000/friends")
            
            #block
            reject = WebDriverWait(driver, 30).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[aria-label='reject-invite']")))
            reject.click()
            time.sleep(5)

            #LOGOUT RECEIVER 2
            avatar = driver.find_element(By.ID,"João Silva5")
            avatar.click()

            logout = driver.find_element(By.ID, "logout")
            logout.click() 
            time.sleep(1)
            
            #Logando na SENDER para conferir a amizade
            driver.get("http://127.0.0.1:8000/signin")
            user_email = driver.find_element(By.NAME,'email')
            user_password = driver.find_element(By.NAME,'password')

            submit = driver.find_element(By.ID,'submit')

            user_email.send_keys('joaosilva1@test.com')
            user_password.send_keys('Teste12345')
            submit.send_keys(Keys.RETURN)
            
            time.sleep(2)
            driver.get("http://127.0.0.1:8000/friends")
            #friend = driver.find_element(By.CSS_SELECTOR, 'p.MuiListItemText-secondary.css-mbfek').text
            #self.assertEqual(friend, 'joaosilva4@test.com')
            friend = WebDriverWait(driver, 30).until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'p.MuiListItemText-secondary.css-mbfek'))).text
            #self.assertEqual(friend, 'joaosilva4@test.com')
            time.sleep(3)
