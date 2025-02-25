# Task Management Application
### Task Mart

## 🚀 Live Website Link
[Live Link](https://task--mangement-app.web.app/) 

## 📜 Description
This is a **Task Management Application** where users can add, edit, delete, and reorder tasks using a **drag-and-drop** interface. The tasks are categorized into three sections: **To-Do, In Progress, and Done**. Changes are saved instantly to the database, ensuring real-time updates.

## ✨ Features
- **Authentication**: Google sign-in using Firebase Authentication.
- **Task Management**:
  - Add, edit, delete, and reorder tasks.
  - Drag-and-drop tasks between categories.
  - Tasks persist in the database.
- **Real-time Updates**:
  - Tasks remain in their last known order on refresh/reopen.
  - WebSockets/MongoDB Change Streams for instant synchronization.
- **Frontend**:
  - Built with **Vite.js + React**.
  - Modern, clean, and responsive UI.
  - Drag-and-drop functionality using `hello-pangea/dnd`.
- **Backend**:
  - Express.js server with MongoDB database.
  - API Endpoints for CRUD operations.
- **Bonus Features** (Optional):
  - Dark mode toggle.
  - Task due dates with color indicators.
  - Activity log for task movements.

## 🛠 Technologies Used
### Frontend:
- React (Vite.js)
- Firebase Authentication
- Tailwind CSS
- `hello-pangea/dnd` for drag-and-drop functionality

### Backend:
- Node.js & Express.js
- MongoDB (Mongoose ORM)
- WebSockets (`socket.io`) for real-time updates

## ⚙️ Installation Steps

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### 2️⃣ Install Dependencies
#### Frontend:
```sh
cd frontend
npm install
```
#### Backend:
```sh
cd backend
npm install
```

### 4️⃣ Start the Application
#### Backend:
```sh
cd backend
npm start
```
#### Frontend:
```sh
cd frontend
npm run dev
```
---
Feel free to update the README with additional details based on your implementation. 🚀
