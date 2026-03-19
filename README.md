# Card Collector Game 🃏

A full-stack collectible card game where users can open card packs, build their collection, and manage their inventory. Features include user authentication, pack opening mechanics, and a comprehensive collection management system.

![Card Collector Demo](./screenshots/demo.gif)

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
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Custom styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Better Auth** - Authentication system
- **bcrypt** - Password hashing
- **JWT** - Token-based authentication
- **node-pg** - PostgreSQL client

### Development
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 📸 Screenshots

### Collection View
![Collection](./screenshots/collection.png)

### Pack Opening
![Pack Opening](./screenshots/pack-opening.png)

### User Dashboard
![Dashboard](./screenshots/dashboard.png)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

**Clone the repository**
```bash
git clone https://github.com/manosnik5/cards_react.git
cd cards_react
```

**Install dependencies**
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

**Environment Variables**

Create `.env` in `/server`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/cards_game

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

**Run the application**
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