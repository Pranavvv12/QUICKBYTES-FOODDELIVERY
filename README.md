# QUICKBYTES-FOODDELIVERY

QuickBytes is a full-stack food delivery application that allows customers to browse menus, place orders, and track deliveries. The platform includes separate sections for customers, administrators, and the backend for managing data and handling business logic.

---



## Installation

To get started with the QuickBytes Food Delivery project, follow the steps below:

### Clone the repository

```bash
git clone https://github.com/Pranavvv12/QUICKBYTES-FOODDELIVERY.git
cd QUICKBYTES-FOODDELIVERY

##Backend Setup
Navigate to the backend directory:
bash
Copy
cd backend
Install the backend dependencies:
bash
Copy
npm install

##Frontend Setup
Navigate to the frontend directory:
bash
Copy
cd ../frontend
Install the frontend dependencies:
bash
Copy
npm install

##Admin Panel Setup
Navigate to the admin directory:
bash
Copy
cd ../admin
Install the admin panel dependencies:
bash
Copy
npm install
Features
Customer Section:

Browse menus by category.
Place orders for food.
Track your order status in real-time.
User authentication (login/sign-up).
Admin Panel:

Manage food items (add, update, delete).
View and manage customer orders.
User management (admin control).
Backend:

##REST API to manage data and business logic.
Handles user authentication, orders, and menu management.
Tech Stack
Frontend: React.js, CSS, HTML
Backend: Node.js, Express.js
Database: MongoDB (or your choice of database)
Authentication: JWT (JSON Web Tokens)
Admin Panel: React.js (or custom admin setup)
Version Control: Git, GitHub
Folder Structure
bash
Copy
##QUICKBYTES-FOODDELIVERY/
├── backend/          # Backend server files and API routes
├── frontend/         # React frontend
├── admin/            # Admin panel
├── .gitignore        # Files to be ignored by git
└── README.md         # Project documentation

##Usage
Backend: Once the backend server is running, it will expose API endpoints for user authentication, managing menus, and handling orders. You can test these endpoints using tools like Postman or by interacting with the frontend application.

Frontend: The customer-facing part of the application is available at http://localhost:3000. It will allow users to browse food items, place orders, and track their orders in real-time.

Admin Panel: The admin panel at http://localhost:4000 will allow administrators to manage food items, view and manage customer orders, and perform user management tasks.
