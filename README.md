# Card Collector Game 🃏

A full-stack collectible card game where users can open card packs, build their collection, and manage their inventory. Features include user authentication, pack opening mechanics, and a comprehensive collection management system.

## ✨ Features

- 🎴 **Card Collection System** - Collect and manage unique cards
- 📦 **Pack Opening Mechanics** - Open packs to discover new cards
- 🔐 **User Authentication** - Secure login and registration with Better Auth
- 📊 **Collection Dashboard** - View all unlocked and locked cards
- 🎨 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔍 **Card Search & Filter** - Find cards easily in your collection

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **JavaScript** - Programming language
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework for API routes
- **PostgreSQL (Neon)** - Serverless PostgreSQL database
- **Better Auth** - Authentication system
- **bcrypt** - Password hashing
- **JWT** - Token-based authentication

### Development Tools
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Neon Database account
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/manosnik5/cards_react.git
cd cards_react
```

2. **Install dependencies**
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. **Database Setup (Neon)**

- Go to [neon.tech](https://neon.tech)
- Create a new project
- Create a database named `cards_game`
- Copy the connection string

Create the database schema:
```bash
# Connect to your Neon database
psql "postgresql://user:password@host.neon.tech/cards_game?sslmode=require"

# Run your schema file (if you have one)
\i database/schema.sql
```

4. **Environment Variables**

Create `.env` in `/server`:
```env
# Server Configuration
PORT=5000
SERVER_PORT=5000
NODE_ENV=development

# Database (Neon)
DATABASE_URL=postgresql://neondb_owner:password@host.neon.tech/cards_game?sslmode=require

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Client
CLIENT_URL=http://localhost:5173
```

Create `.env` in `/client`:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

5. **Seed Database (Optional)**

Add sample cards:
```bash
cd server
npm run seed
```

6. **Run the application**
```bash
# Backend (from /server)
npm run dev

# Frontend (from /client) - in a new terminal
npm run dev
```

Visit `http://localhost:5173`

## 🎮 How It Works

1. **Register/Login** - Create an account or sign in
2. **Open Packs** - Purchase and open card packs
3. **Build Collection** - Unlock cards and track progress
5. **Manage Cards** - Organize and filter your collection

## 🔮 Future Enhancements

- [ ] Achievements and badges
- [ ] Add currency for packs
- [ ] Leaderboards
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Manos Nikolaou**
- GitHub: [@manosnik5](https://github.com/manosnik5)