# Address book

## Description

這是一個作業，了解並熟悉 Nodejs、Typescript、Nestjs、TypeORM，實作了使用者登入、聯絡人的新增、查詢、更新、刪除。

一般使用者可直接查詢所有資料，對內容進行修改則需要登入後取得授權才能進行變動。

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## **User Login**

使用者使用帳號密碼登入系統取得 JWT token。

- **URL**

  /api/users/login

- **Method:**

  `POST`

- **URL Params:**

  NONE

- **Data Params**

  **Required:**

  ```json
  {
    "account": "account",
    "password": "password"
  }
  ```

- **Success Response:**

  - **Code:** 200

    **Content:**

    `{ "token": "jwt.token", "name": "Pinke", "email": "pinke@mail" }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST

    **Content:**

    `{ "statusCode": 400, "message": "password incorrect." }`

## **Add Contact**

使用者登入後，新增聯絡人

- **URL**

  /api/contacts

- **Method:**

  `POST`

- **URL Params:**

  NONE

- **Data Params:**

  **Required:**

  ```json
  {
    "name": "name",
    "phone": "phone"
  }
  ```

- **Success Response:**

  - **Code:** 200

    **Content:**

    `{"id": 1, "name": "pinke_create_name", "phone": "0900-000-888", "createdAt": "2022-01-20T00:27:42.875Z", "updatedAt": "2022-01-20T00:27:42.875Z" }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST

    **Content:**

    `{ "statusCode": 400, "message": "body parameter error." }`

  * **Code:** 401 UNAUTHORIZED

    **Content:**

    `{ "statusCode": 401, "message": "Unauthorized" }`

## **List Contact**

取得列表聯絡人

- **URL**

  /api/contacts

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `page=[integer]`

  `perPage=[integer]`

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200

    **Content:**

    `{"id": 1, "name": "pinke_name", "phone": "0900-000-888", "createdAt": "2022-01-20T00:27:42.875Z", "updatedAt": "2022-01-20T00:27:42.875Z" }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST

    **Content:**

    `{ "statusCode": 400, "message": "contact id type error." }`

  - **Code:** 400 NOT FOUND

    **Content:**

    `{ "statusCode": 400, "message": "contact not found." }`

## **Get Contact**

取得單一聯絡人

- **URL**

  /api/contacts/{contact_id}

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `contact_id=[integer]`

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200

    **Content:**

    `{"id": 1, "name": "pinke_name", "phone": "0900-000-888", "createdAt": "2022-01-20T00:27:42.875Z", "updatedAt": "2022-01-20T00:27:42.875Z" }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST

    **Content:**

    `{ "statusCode": 400, "message": "contact id type error." }`

  - **Code:** 400 NOT FOUND

    **Content:**

    `{ "statusCode": 400, "message": "contact not found." }`

## **Update Contact**

使用者登入後，編輯聯絡人

- **URL**

  /api/contacts/{contact_id}

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `contact_id=[integer]`

- **Data Params**

  **Required:**

  ```json
  {
    "name": "name",
    "phone": "phone"
  }
  ```

- **Success Response:**

  - **Code:** 200

    **Content:**

    `{"id": 1, "name": "pinke_update_name", "phone": "0900-000-888", "createdAt": "2022-01-20T00:27:42.875Z", "updatedAt": "2022-01-20T00:27:42.875Z" }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST

    **Content:**

    `{ "statusCode": 400, "message": "contact id type error." }`

  - **Code:** 400 BAD REQUEST

    **Content:**

    `{ "statusCode": 400, "message": "body parameter error." }`

  - **Code:** 400 NOT FOUND

    **Content:**

    `{ "statusCode": 400, "message": "contact not found." }`

  * **Code:** 401 UNAUTHORIZED

    **Content:**

    `{ "statusCode": 401, "message": "Unauthorized" }`

## **Delete Contact**

使用者登入後，刪除聯絡人

- **URL**

  /api/contacts/{contact_id}

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `contact_id=[integer]`

- **Data Params**

  NONE

- **Success Response:**

  - **Code:** 200

    **Content:**

    `{}`

- **Error Response:**

  - **Code:** 400 BAD REQUEST

    **Content:**

    `{ "statusCode": 400, "message": "contact id type error." }`

  - **Code:** 400 NOT FOUND

    **Content:**

    `{ "statusCode": 400, "message": "contact not found." }`

  - **Code:** 401 UNAUTHORIZED

    **Content:**

    `{ "statusCode": 401, "message": "Unauthorized" }`
