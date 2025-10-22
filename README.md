# String Analyzer API 🔍

A RESTful API service that analyzes strings and stores their computed properties including length, palindrome detection, character frequency, and SHA-256 hashing.

## 🚀 Live Demo

**API Base URL:** `https://your-app.up.railway.app`

## ✨ Features

- **String Analysis:** Compute length, unique characters, word count, and character frequency
- **Palindrome Detection:** Case-insensitive palindrome checking
- **SHA-256 Hashing:** Unique identification for each string
- **Filtering:** Filter strings by multiple criteria
- **Natural Language Queries:** Query strings using natural language
- **RESTful Design:** Standard HTTP methods and status codes

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Storage:** In-memory (Map)
- **Hosting:** Railway

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## 🔧 Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/string-analyzer-api.git
cd string-analyzer-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the root directory:
```env
PORT=3000
```

### 4. Start the development server
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### 5. For production
```bash
npm start
```

## 📚 API Documentation

### Base URL
```
Local: http://localhost:3000
Production: https://your-app.up.railway.app
```

### Endpoints

#### 1. Create/Analyze String

**POST** `/strings`

Request Body:
```json
{
  "value": "hello world"
}
```

Success Response (201):
```json
{
  "id": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
  "value": "hello world",
  "properties": {
    "length": 11,
    "is_palindrome": false,
    "unique_characters": 8,
    "word_count": 2,
    "sha256_hash": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
    "character_frequency_map": {
      "h": 1,
      "e": 1,
      "l": 3,
      "o": 2,
      " ": 1,
      "w": 1,
      "r": 1,
      "d": 1
    }
  },
  "created_at": "2025-10-20T10:00:00.000Z"
}
```

Error Responses:
- `400` - Missing "value" field
- `409` - String already exists
- `422` - Invalid data type for "value"

---

#### 2. Get Specific String

**GET** `/strings/{string_value}`

Example:
```
GET /strings/hello world
```

Success Response (200):
```json
{
  "id": "...",
  "value": "hello world",
  "properties": { ... },
  "created_at": "..."
}
```

Error Response:
- `404` - String not found

---

#### 3. Get All Strings (with optional filters)

**GET** `/strings?is_palindrome=true&min_length=5&max_length=20&word_count=2&contains_character=a`

Query Parameters:
-