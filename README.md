# Task Management Application
### Task Mart

## 🚀 Live Demo
[Live App](#) (Replace with actual deployed link)

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

## 📂 Folder Structure
```
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── main.jsx
│   ├── public/
│
├── README.md
├── package.json
```

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

### 3️⃣ Setup Environment Variables
Create a `.env` file inside the **backend** folder and add:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
FIREBASE_API_KEY=your_firebase_api_key
JWT_SECRET=your_jwt_secret
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

## 📌 API Endpoints
| Method | Endpoint        | Description                    |
|--------|----------------|--------------------------------|
| POST   | /tasks         | Add a new task                 |
| GET    | /tasks         | Get all tasks for a user       |
| PUT    | /tasks/:id     | Update task details            |
| DELETE | /tasks/:id     | Delete a task                  |

## 📝 Notes
- Ensure MongoDB is running before starting the backend.
- Make sure the `.env` file contains correct Firebase and MongoDB credentials.
- For real-time updates, ensure WebSockets are properly configured.

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---
Feel free to update the README with additional details based on your implementation. 🚀
