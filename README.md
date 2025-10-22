# 🌐 NGO Connect

**NGO Connect** is a MERN-based web platform designed to **bridge the communication gap between NGOs, their volunteers, and the community**.  
It enables NGOs to manage events, connect with volunteers, and share their initiatives effectively — all in one place.

---

## 🚀 Features

- 🔐 **Authentication & Authorization** – Secure login, signup, and JWT-based session management.
- 🧑‍🤝‍🧑 **Role-based Access** – Separate dashboards for NGO owners, members, and volunteers.
- 📅 **Event Management** – Create, update, and manage NGO events with ease.
- 🏢 **NGO Profiles** – Showcase NGO details, activities, and impact stories.
- 🖼️ **Cloud Image Uploads** – Integrated with **Cloudinary** for uploading logos, banners, and avatars.
- 📱 **Responsive Design** – Built with Tailwind CSS for seamless use across all devices.
- ⚡ **Real-time Updates** – React-powered UI for smooth navigation and dynamic updates.

---

## 🛠️ Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React, React Router, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | JWT, bcrypt |
| **File Uploads** | Cloudinary |
| **State Management** | React Context API |

---

## 📂 Folder Structure

```bash
NGO-Connect/
├── backend/    # express.js + MongoDB API Server
├── frontend/   # React client application
└── README.md   # You are reading this here!
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/sumitchhablani21/NGOConnect.git
cd NGOConnect
```

2.  **Setup backend**
```bash
cd backend
npm install
```

Create a .env file inside the server/ directory and add:
```bash
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=your-access-token-expiry
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRY=your-refresh-token-expiry

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:
```bash
npm run dev
```

2.  **Setup frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## 📬 Contact

Feel free to reach out to me for collaboration or questions!  

- 📧 Email: [sumitchhablani20@gmail.com](mailto:sumitchhablani20@gmail.com)  
- 💼 LinkedIn: [Click Here](https://www.linkedin.com/in/sumit-chhablani)  
- 🐙 GitHub: [Click Here](https://github.com/sumitchhablani21)   