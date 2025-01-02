
# **Projeto Node.js Automatizado**

Este projeto automatiza a criação de uma estrutura de servidor Node.js com Express, configurando pastas, arquivos, e dependências essenciais de forma automática.

---

## **Pré-requisitos**
Certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)

---

## **Como usar**

### **1. Clone ou copie o projeto**

```bash
git clone <url_do_repositorio>
cd <nome_do_projeto>
```

### **2. Execute o script inicial**
No terminal, execute:
```bash
node app.js
```

Esse comando criará automaticamente a estrutura do projeto, arquivos iniciais e instalará as dependências.

---

## **Estrutura do Projeto**
Após rodar o script, a seguinte estrutura será gerada:

```
.
├── .gitignore
├── ormConfig.js
├── package.json
├── src
│   ├── config
│   ├── database
│   │   └── migrations
│   ├── error
│   │   └── AppError.js
│   ├── middlewares
│   ├── modules
│   │   └── exempleAccounts
│   │       ├── dtos
│   │       ├── entities
│   │       ├── repositories
│   │       └── useCases
│   ├── routes
│   │   └── index.js
│   ├── server.js
│   ├── utils
└── .env

```

---

## **Configurações**

### **1. Configurar variáveis de ambiente**
Edite o arquivo `.env` com as informações do banco de dados:

```env
TYPEORM_CONNECTION=postgres
TYPEORM_PORT=5432
TYPEORM_DATABASE=nome_do_banco
TYPEORM_HOST=localhost
TYPEORM_USERNAME=usuario
TYPEORM_PASSWORD=senha
TYPEORM_MIGRATIONS=./src/database/migrations
TYPEORM_ENTITIES=./src/modules/exempleAccounts/entities/*.ts
```

### **2. Configurar o TypeORM**
O arquivo `ormConfig.js` é gerado automaticamente com a seguinte configurações padrão:

```javascript
import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "usuario",
    password: "senha",
    database: "nome_do_banco",
    entities: ["./src/modules/exempleAccounts/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
    synchronize: true,
})

AppDataSource.initialize()
    .then(() => console.log("Data source inicializado"))
```

---

## **Comandos Disponí­veis**

### **Iniciar o servidor**
Para iniciar o servidor com recarregamento automático: 

```bash
npm run dev
```

---

## **Endpoints**

### **GET /**
Rota principal que retorna uma mensagem de boas-vindas:
- **URL:** `http://localhost:2908/`
- **Resposta:**
  ```json
  {
      "message": "Hello World",
      "statusCode": 200
  }
  ```

---

### **Porta em uso**
Se a porta `2908` estiver em uso, altere-a no arquivo `src/server.js`:
```javascript
app.listen(3000, "localhost", () => console.table({ URL: "http://localhost:3000/" }));
```

### **Author**
 [Bernardino Leite](https://bernardinoleite.netlify.app) 

<img src="https://bernardinoleite.netlify.app/perfil.JPG" width="100" >

