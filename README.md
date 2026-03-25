# Web3 Shield 🛡️

A blockchain security toolkit for safer Web3 interactions. Analyze wallets, decode transactions, and detect phishing — all with a real-time **0–100 risk scoring** engine.

## Features

- **👛 Wallet Risk Scanner** — Analyze any Ethereum address for scam interactions, dust attacks, and suspicious activity
- **🔍 Transaction Analyzer** — Decode on-chain transactions and flag risky recipients or abnormal gas usage
- **🛡️ Phishing URL Checker** — Verify URLs against blocklists, typosquatting detection, and domain intelligence
- **📊 Risk Scoring (0–100)** — Weighted flag system with 8+ threat signals across all modules

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | Node.js + Express |
| Blockchain | Ethers.js + Etherscan API |
| Database | MongoDB + Mongoose |

## Project Structure

```
web3-shield/
├── frontend/          # Next.js app (port 3000)
│   └── src/
│       ├── app/       # Pages: dashboard, wallet, transactions, phishing
│       ├── components/  # Navbar, WalletConnect, RiskScore, etc.
│       └── lib/       # API client + Ethers.js helpers
│
├── backend/           # Express API (port 5000)
│   └── src/
│       ├── routes/        # wallet, transaction, phishing routes
│       ├── controllers/   # Request handlers
│       ├── services/      # Etherscan, risk scoring, phishing logic
│       ├── models/        # Mongoose schemas
│       └── middleware/    # Error handler, rate limiter, validation
│
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Etherscan API key ([get one free](https://etherscan.io/apis))

### 1. Backend

```bash
cd backend
npm install

# Edit .env with your values
cp .env.example .env

npm run dev
# → http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/wallet/analyze` | Analyze wallet risk |
| GET | `/api/wallet/history/:address` | Get past scans |
| POST | `/api/transactions/analyze` | Analyze a transaction |
| POST | `/api/phishing/check` | Check URL for phishing |
| GET | `/api/health` | Health check |

## Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/web3shield
ETHERSCAN_API_KEY=your_key_here
CORS_ORIGIN=http://localhost:3000
```

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Risk Scoring

Each module produces a **0–100** score using weighted flags:

| Score | Level | Color |
|-------|-------|-------|
| 0–24 | LOW | 🟢 Green |
| 25–49 | MEDIUM | 🟡 Orange |
| 50–74 | HIGH | 🔴 Red |
| 75–100 | CRITICAL | 🔴 Pulsing Red |

---

Built with ❤️ for safer Web3.
