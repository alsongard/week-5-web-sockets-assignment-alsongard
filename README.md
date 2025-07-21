# ChatApp

A real-time chat application built with Vite, React, TailwindCSS, Express, Node.js, and MongoDB. This project demonstrates bidirectional communication using Socket.io on the server and Socket.io-client on the front-end. User registration details are securely stored in MongoDB. There are no chat rooms; users can send messages directly to each other.

## Features

- Real-time messaging with Socket.io
- User registration and authentication
- User details stored in MongoDB
- Bidirectional communication (users can send and receive messages)
- Modern UI with React and TailwindCSS
- Built with Vite for fast development

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Socket.io-client
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB (Mongoose)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas or local MongoDB instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install server dependencies:**
   ```bash
   cd CHATAPP/server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**
   - In `CHATAPP/server`, create a `.env` file with your MongoDB credentials:
     ```env
     MONGO_USR=your_mongodb_username
     MONGO_SCRT=your_mongodb_password
     PORT_NUMBER=5000
     ```

5. **Start the server:**
   ```bash
   cd CHATAPP/server
   npm start
   ```

6. **Start the client:**
   ```bash
   cd ../client
   npm run dev
   ```

7. **Open the app:**
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Register a new user.
- Log in with your credentials.
- Start chatting in real time with other users.

## Project Structure

```
CHATAPP/
  client/      # React front-end (Vite + TailwindCSS)
  server/      # Express + Socket.io + MongoDB backend


socketio-chat/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── socket/         # Socket.io client setup
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Node.js back-end
│   ├── models/             # Data models
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## License

This project is for educational purposes.