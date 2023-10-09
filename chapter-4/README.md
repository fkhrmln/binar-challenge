# Chapter 4

Create a RESTful API with Express JS and PostgreSQL as a Database

## Getting Started

### Prerequisites

- Git
- Visual Studio Code
- Google Chrome
- Node JS
- NPM
- PostgreSQL
- Postman

### Dependencies

- express v4.18.2
- uuid v9.0.0
- cors v2.8.5
- pg v8.11.3
- pg-hstore v2.3.4
- sequelize v6.33.0
- sequelize-cli v6.6.1
- multer v1.4.5-lts.1

### Installing

- Open Terminal
- Clone this repository with the following command

```
git clone https://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@github.com/fkhrmln/binar-challenge.git
```

### Executing program

- Open chapter-4 using Visual Studio Code with this command

```
code binar-challenge/chapter-4/
```

- Install all the required dependecies with this command

```
npm install
```

- Open config/config.json and change username and password to your postgres username and password

```
"development": {
    "username": "your-username",
    "password": "your-password",
    "database": "binar-car-rental",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
```

- Create binar-car-rental database with this command

```
npx sequelize-cli db:create
```

- Create Cars table with this command

```
npx sequelize-cli db:migrate
```

- Insert some data with this command

```
npx sequelize-cli db:seed:all
```

- Run the server with this command

```
npm run start
```

### ERD

![ERD](./erd.png)

### API Documentation

#### GET /

> http://localhost:5000/

This endpoint is useful for testing whether the server is running well by providing a response like the one below

```
{ message: 'Ping Successfully' }
```

#### GET /cars

> http://localhost:5000/cars

This endpoint will provide a response list of car objects

```
[
  {
    "id": "b26077fd-0f34-427f-b884-711a9e0d264f",
    "name": "Toyota Avanza",
    "type": "small",
    "image": "./avanza.png",
    "capacity": 2,
    "rentPerDay": 1000000,
    "description": "Toyota Avanza is a versatile and compact MPV (Multi-Purpose Vehicle) that combines style, space, and practicality. With its sleek design, comfortable interior, and advanced features, the Avanza is the perfect choice for families and individuals alike.",
    "availableAt": "2023-10-08T14:34:17.062Z",
    "createdAt": "2023-10-08T14:34:17.062Z",
    "updatedAt": "2023-10-08T14:34:17.062Z"
  },
  ...
]
```

#### GET /cars/:id

> http://localhost:5000/cars/:id

This endpoint requires a car id as request params and this endpoint will provide a car response object with that id

```
{
  "id": "b26077fd-0f34-427f-b884-711a9e0d264f",
  "name": "Toyota Avanza",
  "type": "small",
  "image": "./avanza.png",
  "capacity": 2,
  "rentPerDay": 1000000,
  "description": "Toyota Avanza is a versatile and compact MPV (Multi-Purpose Vehicle) that combines style, space, and practicality. With its sleek design, comfortable interior, and advanced features, the Avanza is the perfect choice for families and individuals alike.",
  "availableAt": "2023-10-08T14:34:17.062Z",
  "createdAt": "2023-10-08T14:34:17.062Z",
  "updatedAt": "2023-10-08T14:34:17.062Z"
}
```

#### POST /cars

> http://localhost:5000/cars

This endpoint requires a request body of a car object to be saved as new data and the endpoint will provide a response to the car object that has just been created

##### Request Body

Open postman and you can send the data below as form data or use yours

| Key         | Value                                                                                                                                                                                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | Toyota Avanza                                                                                                                                                                                                                                               |
| type        | medium                                                                                                                                                                                                                                                      |
| image       | _select any car image_                                                                                                                                                                                                                                      |
| capacity    | 6                                                                                                                                                                                                                                                           |
| rentPerDay  | 500000                                                                                                                                                                                                                                                      |
| description | Toyota Avanza is a versatile and compact MPV (Multi-Purpose Vehicle) that combines style, space, and practicality. With its sleek design, comfortable interior, and advanced features, the Avanza is the perfect choice for families and individuals alike. |
| availableAt | 2023-10-05T08:18:32.600Z                                                                                                                                                                                                                                    |

##### Response

```
{
  "id": "b26077fd-0f34-427f-b884-711a9e0d264f",
  "name": "Toyota Avanza",
  "type": "small",
  "image": "./avanza.png",
  "capacity": 2,
  "rentPerDay": 1000000,
  "description": "Toyota Avanza is a versatile and compact MPV (Multi-Purpose Vehicle) that combines style, space, and practicality. With its sleek design, comfortable interior, and advanced features, the Avanza is the perfect choice for families and individuals alike.",
  "availableAt": "2023-10-08T14:34:17.062Z",
  "createdAt": "2023-10-08T14:34:17.062Z",
  "updatedAt": "2023-10-08T14:34:17.062Z"
}
```

#### PUT /cars/:id

> http://localhost:5000/cars/:id

This endpoint requires an id as request params and several car object properties that you want to change as request body and will provide a response to the car object that has just been changed

##### Request Body

Open postman and you can send the data below as form data or use yours

| Key  | Value          |
| ---- | -------------- |
| name | Daihatsu Xenia |

##### Response

```
{
  "id": "b26077fd-0f34-427f-b884-711a9e0d264f",
  "name": "Daihatsu Xenia",
  "type": "medium",
  "image": "1696776922697.jpeg",
  "capacity": 6,
  "rentPerDay": 500000,
  "description": "Toyota Avanza is a versatile and compact MPV (Multi-Purpose Vehicle) that combines style, space, and practicality. With its sleek design, comfortable interior, and advanced features, the Avanza is the perfect choice for families and individuals alike.",
  "availableAt": "2023-10-05T08:18:32.600Z",
  "createdAt": "2023-10-08T14:55:22.779Z",
  "updatedAt": "2023-10-08T14:56:34.121Z"
}
```

#### DELETE /cars/:id

> http://localhost:5000/cars/:id

This endpoint requires a car id as a request params and will delete the car object with that id and provide a response of the car object that was just deleted.

```
{
  "id": "b26077fd-0f34-427f-b884-711a9e0d264f",
  "name": "Daihatsu Xenia",
  "type": "medium",
  "image": "1696778839891.jpeg",
  "capacity": 6,
  "rentPerDay": 500000,
  "description": "Toyota Avanza is a versatile and compact MPV (Multi-Purpose Vehicle) that combines style, space, and practicality. With its sleek design, comfortable interior, and advanced features, the Avanza is the perfect choice for families and individuals alike.",
  "availableAt": "2023-10-05T08:18:32.600Z",
  "createdAt": "2023-10-08T15:27:19.926Z",
  "updatedAt": "2023-10-08T15:27:55.733Z"
}
```
