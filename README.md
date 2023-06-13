# When2Poll

## Grupo: Arthur Lins Wolmer, Diego Peter Luna, Mathews Ivo Tavares, João Antônio Sampaio Ferreira, João Pedro Batista, João Pedro Araújo
### Board do Jira: https://fds2023.atlassian.net/jira/software/projects/FDS/boards/1

## Linguagens e Frameworks Utilizados
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
cd fds2023-1/reactapp
npm install
npm run build
```

### Uso

Para executar o servidor, use o seguinte comando dentro da raiz do projeto:

```
python manage.py collectstatic
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

Link para o protótipo no figma: https://www.figma.com/proto/dOBYkqG9fAgQhbsRznP8sD/Mobile-Wireframe-UI-Kit-(Community)?page-id=427%3A5822&node-id=427-5848&viewport=-121%2C-206%2C0.29&scaling=scale-down&starting-point-node-id=427%3A5848
