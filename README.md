# fds2023-1

## Enquete de Agendamento

Este é um aplicativo web de código aberto cujo propósito é facilitar o agendamento de eventos ou reuniões a partir da compatibilização procedural das disponibilidades dos participantes. Ele será desenvolvido usando o framework Django e o banco de dados SQLite e permitirá que os usuários criem enquetes, convidem participantes e agendem eventos, customizando uma série de parâmetros para seu caso de uso específico.

### Instalação

Primeiro clone o repositório para sua máquina local:

```
git clone https://github.com/diegopluna/fds2023-1.git
```

Em seguida, navegue até o diretório do projeto e instale as dependências necessárias usando o pip:

```
cd scheduling-poll-app/
pip install -r requirements.txt
```

Por fim, execute o comando de migração para criar o banco de dados e as tabelas necessárias:

```
python manage.py migrate
```

### Uso

Para executar o aplicativo web, use o seguinte comando:

```
python manage.py runserver
```

O servidor de desenvolvimento estará disponível, por padrão, em http://localhost:8000/. Você pode acessar o aplicativo web visitando a URL em seu navegador.

### Recursos previstos

- Capacidade de criar e gerenciar enquetes
  - Segmentação customizada dos dias, duração pretendida da reunião e descrição
- Seleção de dias da semana ou datas específicas
  - Controle sobre os horários de cada um dos dias
- Sistema de autenticação e autorização de usuários
  - Enquetes públicas ou restritas a usuários específicos
- Indicação dos horários disponveis por interface gráfica (compatível com browsers mobile)
  - Relatórios gráficos e textuais sobre a disponibilidade comum
- Possibilidade de estipular apresentador e/ou participantes mais prioritários
