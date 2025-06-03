# 🏥 e-Pharmacy – Microservices-Based System

**e-Pharmacy** is a simplified microservices-based backend system for managing pharmaceutical products, users, orders, payments, and notifications. Built using **NestJS**, it follows modern service separation and asynchronous communication patterns using **RabbitMQ**.

---

## ⚙️ Technologies Used

- **NestJS** – Modular backend framework
- **PostgreSQL** – Relational database
- **RabbitMQ** – Message broker for async communication
- **Docker + Docker Compose** – Containerization & orchestration
- **Swagger** – API documentation
- **JWT** – Authentication
- **bcrypt** – Password hashing

---

## 📁 Microservices Overview

### 1️⃣ `user-service`
Handles user registration, login, and authentication with roles (`user`, `admin`).

- JWT authentication
- Role-based access
- Password hashing using bcrypt

**Endpoints:**
- `POST /auth/register`
- `POST /auth/login`
- `GET /users/:id`

---

### 2️⃣ `category-service`
Admin-controlled service to manage drug categories.

- CRUD operations on categories
- Access restricted to `admin` users

**Endpoints:**
- `POST /categories`
- `GET /categories`
- `PATCH /categories/:id`
- `DELETE /categories/:id`

---

### 3️⃣ `pills-service`
Handles management of pharmaceutical products.

- Each pill belongs to a category and has `added_by` user ID
- CRUD operations for pills

**Fields:**
- `name`, `description`, `category_id`, `price`, `stock`, `added_by`

**Endpoints:**
- `POST /pills`
- `GET /pills`
- `PATCH /pills/:id`
- `DELETE /pills/:id`

---

### 4️⃣ `order-service`
Manages creation and tracking of orders by users.

- Users can place orders for available pills
- Each order stores pill reference, quantity, and user ID
- Sends message to `payment-service` and `notification-service`

**Fields:**
- `user_id`, `pill_id`, `quantity`, `total_price`, `status`

**Endpoints:**
- `POST /orders`
- `GET /orders/user/:userId`
- `PATCH /orders/:id/status`

---

### 5️⃣ `payment-service`
Handles payment processing and status updates.

- Tracks payment for each order
- Payment methods: `cash`, `card`, `online`
- Triggers notifications on success

**Fields:**
- `order_id`, `amount`, `payment_method`, `status`

**Endpoints:**
- `POST /payments`
- `GET /payments/order/:orderId`

---

### 6️⃣ `notification-service`
Sends email or SMS notifications to users.

- Listens to events from `order-service` and `payment-service`
- Can send confirmation, status updates, etc.
- Uses `RabbitMQ` consumer logic

**Endpoints (for testing):**
- `POST /notify/email`
- `POST /notify/sms`

---

## 🧬 Database Tables (Simplified)

| Table          | Key Columns                                                  |
|----------------|--------------------------------------------------------------|
| `users`        | id, full_name, phone, role, password                         |
| `categories`   | id, name, created_by                                          |
| `pills`        | id, name, description, category_id, price, stock, added_by   |
| `orders`       | id, user_id, pill_id, quantity, total_price, status          |
| `payments`     | id, order_id, amount, method, status                         |
| `notifications`| id, type (email/sms), message, user_id, status               |

---

## 📨 RabbitMQ Communication

| Exchange         | Queue                 | Purpose                           |
|------------------|------------------------|------------------------------------|
| `order.topic`     | `order.created`        | Notifies other services on order   |
| `payment.topic`   | `payment.success`      | Used by notification-service       |
| `notification.topic` | `email.queue`     | Handles email delivery             |
| `notification.topic` | `sms.queue`       | Handles SMS delivery               |

---

## 🚀 Running the Project

### Prerequisites:
- Docker & Docker Compose installed
- Node.js v18+

### Step 1: Start RabbitMQ & PostgreSQL via Docker

```bash
docker-compose up -d
