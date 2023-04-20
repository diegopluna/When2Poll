# When2Poll

## Grupo: Arthur Lins Wolmer, Diego Peter Luna, Mathews Ivo Tavares, Rafael Roque Vieira dos Santos, João Antônio Sampaio Ferreira, João Pedro Batista, João Pedro Araújo
### Board do Jira: https://fds2023.atlassian.net/jira/software/projects/FDS/boards/1

## Linguagens e Frameworks Utilizadoss
<img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" /><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green" /><img src="https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" /><img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />


## Descrição
Este é um aplicativo web de código aberto cujo propósito é facilitar o agendamento de eventos ou reuniões a partir da compatibilização procedural das disponibilidades dos participantes. Ele será desenvolvido usando o framework Django e o banco de dados SQLite e permitirá que os usuários criem enquetes, convidem participantes e agendem eventos, customizando uma série de parâmetros para seu caso de uso específico.




### Instalação

Primeiro clone o repositório para sua máquina local:

```
git clone https://github.com/diegopluna/fds2023-1.git
```

Em seguida, navegue até o diretório do projeto e instale as dependências necessárias

Django:

```
cd fds2023-1 /
pip install -r requirements.txt
```

React:

```
cd fds2023-1/when2poll/reactapp
npm install
npm run build
```

### Uso

Para executar o servidor, use o seguinte comando dentro da pasta when2poll:

```
python manage.py runserver
```

O servidor de desenvolvimento estará disponível, por padrão, em http://localhost:8000/. Você pode acessar o aplicativo web visitando a URL em seu navegador.

### Recursos previstos

- Capacidade de criar e gerenciar enquetes
  - Nome, descrição e duração pretendida
  - Seleção de datas específicas e controle sobre os horários de cada um dos dias
  - Possibilidade de estipular apresentador e/ou participantes mais prioritários
- Indicação de disponibilidade por interface gráfica (compatível com browsers desktop e mobile), inclusive com gradação de preferência
  - Relatórios sobre a disponibilidade comum e seleção final a cargo do(s) administrador(es)
- Sistema de autenticação e autorização de usuários
  - Enquetes restritas a usuários convidados

## Entrega 01

### Figma


Link para o protótipo no figma: https://www.figma.com/proto/dOBYkqG9fAgQhbsRznP8sD/Mobile-Wireframe-UI-Kit-(Community)?page-id=427%3A5822&node-id=427-5848&viewport=-121%2C-206%2C0.29&scaling=scale-down&starting-point-node-id=427%3A5848

### Prints Jira


Painel do Jira
![image](https://user-images.githubusercontent.com/111078608/228092624-de603c49-a2a7-422b-97fc-3e0fff2fc72a.png)
![image](https://user-images.githubusercontent.com/111078608/228092673-d4d9f1a6-5063-495e-a039-0c4716512d72.png)

Backlog do Jira
![image](https://user-images.githubusercontent.com/111078608/228092701-edf16c79-d9d7-48e8-be5c-f773ec554b9c.png)
![image](https://user-images.githubusercontent.com/111078608/228092737-c9048996-eb62-4119-9fae-6af56f713d59.png)
![image](https://user-images.githubusercontent.com/111078608/228092778-89407efa-4b20-42c1-9f9d-181f97feb0c4.png)
![image](https://user-images.githubusercontent.com/111078608/228092794-3712486d-b4d6-4266-8518-9fd51befa8f6.png)
![image](https://user-images.githubusercontent.com/111078608/228092830-a0ef1e61-0641-4e90-a715-5fe457e26c92.png)
![image](https://user-images.githubusercontent.com/111078608/228092851-2cda9984-c996-4ede-a9d3-863e1389b298.png)
![image](https://user-images.githubusercontent.com/111078608/228092877-8bced924-a1e4-4246-b8aa-89bcb4e16428.png)
![image](https://user-images.githubusercontent.com/111078608/228092903-69694835-e2d7-414e-8a5a-ac1e98c3a175.png)
![image](https://user-images.githubusercontent.com/111078608/228092925-35b968ca-3e12-465e-ba77-5875fca9d6b1.png)
![image](https://user-images.githubusercontent.com/111078608/228092949-f6da22ca-e42b-403d-8694-a7db1787afb4.png)
![image](https://user-images.githubusercontent.com/111078608/228092972-7c916fbf-bdcb-4a64-a1a4-ba4d98752053.png)
![image](https://user-images.githubusercontent.com/111078608/228092997-454f4c0f-0fc0-4279-9161-fb43ebd275b3.png)
![image](https://user-images.githubusercontent.com/111078608/228093029-f774b048-c511-49d0-8d65-4799246400f9.png)


## Entrega 02


### Diagrama de atividades


![Diagramando nosso caminho para o sucesso_ Um estudo de caso do uso de diagramas de atividades no desenvolvimento de software_](https://user-images.githubusercontent.com/111078608/232639792-83e89c1c-af27-41c6-a2d4-e7a62be98ac4.png)


### Relato programação em pares

https://docs.google.com/document/d/1vgzDEOPSKoXRHU4viP0DTabFN5ODX0bRgQ28WmqPey4/edit?usp=sharing

### Deploy de algumas histórias

Link do deploy: http://when2poll-env.eba-cpqbamxu.sa-east-1.elasticbeanstalk.com/

Instruções de uso:
```
  Ao entrar no site, primeiramente clicar em Criar Conta para ir para a tela de Registro.
  
  Preencher os dados do usário, ao criar a conta o website o redirecionará para a tela de login.
  
  Ao fazer login o usuário irá se deparar com a tela inicial, que no momento está vazia, e a barra
  de navegação no topo da tela onde podemos navegar pelo site.
  
  História 1: Criar Grupos
   -Clicar em Grupos na barra de navegação
   -Clicar em Novo Grupo na barra secundária
   -Preencher os dados do Grupo e selecionar os usuários que deseja convidar
   -Clicar em Criar Grupo
   
   Agora o grupo estará criado e ao apertar em Voltar na barra secundária ou em Grupos na barra de navegação,
   o novo grupo estará lá e ao ver os detalhes do mesmo, o usuário consegue ver o criador do grupo, os membros do
   grupo e quem foi convidado para o grupo
   
  História 2: Aceitar ou rejeitar convite de Grupo
  -Navegar para a tela de Convites na barra de navegação
  
  Nesta tela o usuário pode ver seus convites de grupos(e, futuramente os convites de reuniões também) e responder
  se deseja entrar no grupo ou não. Ao rejeitar, o convite desaparece. Ao aceitar, o grupo irá aparecer na aba de grupos do
  usuário e ele conseguirá ver os detalhes deste grupo.
  
  História 3: Criar Reunião
  -Navegar para Nova Reunião na barra de navegação
  
  Nesta tela o usuário deve preencher nome e a descrição da reunião.
  Selecionar os dias em que é possível que a reunião ocorra(Um clique o calendário entra no modo de range, esperando que o usuário selecione
  outro dia para pegar todos os dias neste intervalo, e um clique duplo no dia seleciona apenas o dia desejado)
  
  O usuário determina também a duração da reunião, e os horário mais cedo e mais tarde em que essa reunião possa ocorrer.
  
  O sistema calcula uma deadline de 24 horas ante do horário mais cedo do dia mais cedo.
  
  Nesta implementação o usuário pode apenas convidar grupos de usuários mas, no futuro pretende-se que também possa convidar usuários de forma
  avulsa.
  
  Ao selecionar o grupo que deseja convidar, basta clicar em Criar enquete. (Como a dashboard ainda não foi implementada, só podemos ver esta
  reunião na dashboard de admin do Django)
  
```

https://user-images.githubusercontent.com/111078608/232656893-72f30856-edf8-4d84-a888-e4ce675c1b73.mp4


### Print Issues Github


![Screenshot 2023-04-18 at 00 01 34](https://user-images.githubusercontent.com/111078608/232660115-13b6fe30-1a29-42ea-b9a9-90f689726e40.png)

![Screenshot 2023-04-18 at 00 01 56](https://user-images.githubusercontent.com/111078608/232660068-b91af277-7cf3-428d-a216-aa92058b9c69.png)




### Quadro do JIRA refletindo a entrega

![quadro FDS - Equipe ágil - Jira](https://user-images.githubusercontent.com/111078608/232652516-4a9f07b6-e2af-4836-a8d1-b142e876cf6a.png)

![quadro FDS - Equipe ágil - Jira](https://user-images.githubusercontent.com/111078608/232652659-c0cac856-5e09-4b6d-afd6-95edc5f247b8.png)
