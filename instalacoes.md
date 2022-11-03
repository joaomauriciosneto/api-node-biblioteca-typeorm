# Criando uma API com Node, Typescript e TypeORM

# Instalações:
### 1. npm init -y
### 2. npm i -D typescript nodemon ts-node @types/express @types/node
### 3. npm i express pg typeorm dotenv reflect-metadata (bibliotecas de produção)
### 4. npm i cors
### 5. npm i --save-dev @types/cors
### 6. npx tsc --init

# Criando as tabelas:
### Criar o banco de dados no postgres e configurar o data-source.ts
### Depois de configurar o "script" no package.json, digitar a seguinte linha de código: npm run migration:generate (lembrar de rodar esse comando depois de criar a migration)
### Depois de todas as migrations criadas, digitar: npm run migration:run (a mágica acontece)

---

# Configurando o Swagger (Documentação e uso da API)

## Endereço: http://localhost:3333/nomedaapi/

# PASSO 1

# Instalações:
### 1. npm install swagger-ui-express
### 2. npm i @types/swagger-ui-express -D

# PASSO 2

### 1. Importação no arquivo do server: import swaggerUi from 'swagger-ui-express';
### 2. Criar arquivo .json: swagger.json (dentro da pasta /src);
### 3. Importar o arquivo .json: import swaggerDocs from './swagger.json';
### 4. Adicionar esse "use": app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
### 5. No use das rotas, é padrão colocar a raíz das rotas como "v1" (versão 1), então adiciona: 
###    app.use("/v1", routes);

# PASSO 3 (Configuração do arquivo .json)

### 1. Criar as rotas.





