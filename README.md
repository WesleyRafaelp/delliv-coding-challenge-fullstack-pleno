# Desafio Delliv Fullstack Pleno - (Delivery)

Bem-vindo ao Delliv Fullstack Pleno Coding Challenge! O objetivo deste desafio é construir um aplicativo de rastreamento de entregas que ofereça aos usuários autenticados a capacidade de visualizar uma lista de pedidos, atualizar o status de cada pedido e fornecer recursos de autenticação e segurança. No frontend usei reactjs(nextjs) com redux para gerenciamento de estado e no backend usei nestjs com prisma de ORM para conexão com banco de dados postgresql

## 🚀 Como Iniciar

Certifique-se de ter o Docker e o Docker Compose instalados antes de prosseguir.

1. Clone o repositório para sua máquina:

    ```bash
    git clone https://github.com/WesleyRafaelp/delliv-coding-challenge-fullstack-pleno.git
    cd delliv-coding-challenge-fullstack-pleno
    ```

2. Crie um arquivo `.env` para o backend e configure as variáveis necessárias:

    ```bash
    # Backend
    DATABASE_URL=postgres://root:example@db:5432/deliveryDB 
    
    JWT_SECRET = secret
    JWT_EXPIRATION_AT = 15s
    JWT_REFRESH_SECRET= secret2
    JWT_EXPIRATION_RT = 7d
    ```

3. Inicie os serviços usando o Docker Compose:

    ```bash
    docker-compose up -d
    ```

    Aguarde até que os serviços estejam prontos. Isso pode levar alguns minutos na primeira execução.

4. Acesse o frontend em http://localhost:3000 e a documentação swagger do backend em http://localhost:3001/api.

## ⚙️ Comandos Úteis

- Iniciar os serviços:

    ```bash
    docker-compose up -d --build
    ```

- Parar os serviços:

    ```bash
    docker-compose down
    ```

- Parar e remover volumes e redes associados:

    ```bash
    docker-compose down -v
    ```

## 🛠️ Desenvolvimento

### Backend

O backend foi construído com NestJS. Certifique-se de ter o Node.js instalado e, em seguida, instale as dependências e execute o servidor localmente:

```bash
cd backend
npm install
npm run start:dev
```
### Frontend

O frontend foi construído com NextJS(a documentação do React sugere criar uma aplicação com alguns frameworks e o nextjs foi o que escolhi). Instale as dependências e inicie o servidor de desenvolvimento:

```bash
cd frontend
npm install
npm run dev
```
