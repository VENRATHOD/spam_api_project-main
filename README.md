# Spam Detector REST API

A production-ready REST API built with **Node.js**, **Express.js**, and **Sequelize ORM** using **MySQL** to help users detect spam numbers and search contact info by phone or name.

---

## Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MySQL (Relational DB)
- **ORM:** Sequelize
- **Authentication:** JWT (Bearer Token)
- **Password Hashing:** bcryptjs
- **Utilities:** dotenv, nodemon, faker

---

## Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/SHYPATIL/REST-api.git
cd REST-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File



---

##  .env.example

```env
PORT=5000
DB_NAME=spamdb
DB_USER=root
DB_PASSWORD=Shy#2002
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
```

---

## Database Setup

1. **Create a MySQL Database:**

```sql
CREATE DATABASE spamdb;
```

2. **Run Migrations:**

```bash
npx sequelize-cli db:migrate
```

3.  Populate with Sample Data:

```bash
node src/utils/seed.js
```

---

## How to Run the App

```bash
npm run dev
```

Server will run at:  
`http://localhost:5000`

---

##  Postman API Collection

###  1. Register

**POST** `/api/auth/register`  
**Body:**
```json
{
  "name": "SHYPATIL",
  "phone": "9742256134",
  "email": "PATILS3427@gmail.com",
  "password": "Shy#2002"
}
```

---

###  2. Login

**POST** `/api/auth/login`  
**Body:**
```json
{
  "phone": "9742256134",
  "password": "Shy#2002"
}
```

 Response contains `token`

---

###  3. Mark a Number as Spam

**POST** `/api/spam/mark`  
**Headers:**
```
Authorization: Bearer <your_token>
```
**Body:**
```json
{
  "phone": "9742256134"
}
```

---

###  4. Search by Name

**GET** `/api/spam/search-by-name?name=shy`  
**Headers:**
```
Authorization: Bearer <your_token>
```

---

###  5. Search by Phone

**GET** `/api/spam/search-by-phone?phone=9742256134`  
**Headers:**
```
Authorization: Bearer <your_token>
```

---

##  Dependencies Installed via NPM

```bash
npm install express sequelize mysql2 dotenv jsonwebtoken bcryptjs faker cors
npm install --save-dev nodemon
npm install --save sequelize-cli
```

---

##  Notes

- Ensure MySQL server is running.
- Use tools like Postman or Thunder Client to test endpoints.
- This project is backend-only; you can plug this into any mobile or frontend application.

---


