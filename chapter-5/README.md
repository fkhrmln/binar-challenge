# Chapter 4

Create a RESTful API with Express JS, PostgreSQL and JWT Authentication

## Getting Started

### Prerequisites

- Git
- Visual Studio Code
- Google Chrome
- Node JS
- NPM
- PostgreSQL

### Dependencies

- express v4.18.2
- uuid v9.0.0
- cors v2.8.5
- pg v8.11.3
- pg-hstore v2.3.4
- sequelize v6.33.0
- sequelize-cli v6.6.1
- multer v1.4.5-lts.1
- bcrypt v5.1.1
- cookie-parser v1.4.6
- dotenv v16.3.1
- jsonwebtoken v9.0.2
- swagger-ui-express v5.0.0

### Installing

- Open Terminal
- Clone this repository with the following command

```
git clone https://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@github.com/fkhrmln/binar-challenge.git
```

### Executing program

- Open chapter-5 using Visual Studio Code with this command

```
code binar-challenge/chapter-5/
```

- Install all the required dependecies with this command

```
npm install
```

- Open .env file and change DB_USERNAME and DB_PASSWORD to your postgres username and password

```
DB_USERNAME = your-username
DB_PASSWORD = your-password
```

- Create binar-car-rental database with this command

```
npx sequelize-cli db:create
```

- Create Users table with this command

```
npx sequelize-cli db:migrate --name 20231012182228-create-user.js
```

- Create Users table with this command

```
npx sequelize-cli db:migrate --name 20231004154310-create-car.js
```

- Insert superadmin user with this command

```
npx sequelize-cli db:seed --seed 20231012182907-demo-user.js
```

- Insert some cars data with this command

```
npx sequelize-cli db:seed --seed 20231004155721-demo-car.js
```

- Run the server with this command

```
npm run start
```

### Super Admin

```
Email : superadmin@gmail.com
Password : superadmin
```

### API Documentation

This endpoint will take you to the API Documentation Page

```
http://localhost:5000/api-docs
```

### ERD

![ERD](./erd.png)
