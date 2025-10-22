# String Analyzer API 🔍

A RESTful API service that analyzes strings and stores their computed properties including length, palindrome detection, unique character count, word count, SHA-256 hashing, and character frequency mapping.

## 🚀 Live Demo

**Production URL:** `https://string-analyzer-api-production-4bf5.up.railway.app`

**GitHub Repository:** `https://github.com/calltrum/string-analyzer-api`

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## ✨ Features

- **String Analysis**: Automatically computes 6 different properties for each string
- **Palindrome Detection**: Case-insensitive palindrome checking
- **SHA-256 Hashing**: Unique identification and duplicate prevention
- **Advanced Filtering**: Filter strings by multiple criteria
- **Natural Language Queries**: Query strings using human-readable language
- **RESTful Design**: Standard HTTP methods and status codes
- **Error Handling**: Comprehensive error responses with appropriate status codes
- **In-Memory Storage**: Fast data access (Map-based storage)

## 🛠️ Tech Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Storage**: In-memory (JavaScript Map)
- **Deployment**: Railway
- **Version Control**: Git & GitHub

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Postman** (optional, for testing) - [Download](https://www.postman.com/downloads/)

Verify installations:
```bash
node --version
npm --version
git --version
```

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/calltrum/string-analyzer-api.git
cd string-analyzer-api
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- `express` - Web framework
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management
- `nodemon` - Development auto-restart (dev dependency)

### 3. Create Environment File

Create a `.env` file in the root directory:
```bash
touch .env  # Mac/Linux
type nul > .env  # Windows
```

Add the following content:
```env
PORT=3000
```

## 🚀 Running Locally

### Development Mode (with auto-restart)
```bash
npm run dev
```

The server will start on `http://localhost:3000` and automatically restart when you save changes.

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` without auto-restart.

### Verify Server is Running

Open your browser and navigate to:
```
http://localhost:3000
```

You should see:
```json
{
  "message": "String Analyzer API is running!",
  "version": "1.0.0",
  "endpoints": {
    "create": "POST /strings",
    "get_one": "GET /strings/:string_value",
    "get_all": "GET /strings",
    "filter": "GET /strings/filter-by-natural-language?query=...",
    "delete": "DELETE /strings/:string_value"
  }
}
```

## 📚 API Documentation

### Base URL

- **Local**: `http://localhost:3000`
- **Production**: `https://string-analyzer-api-production-4bf5.up.railway.app`

---

### 1. Create/Analyze String

Analyzes a string and stores its computed properties.

**Endpoint:** `POST /strings`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "value": "string to analyze"
}
```

**Success Response (201 Created):**
```json
{
  "id": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
  "value": "string to analyze",
  "properties": {
    "length": 18,
    "is_palindrome": false,
    "unique_characters": 14,
    "word_count": 3,
    "sha256_hash": "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
    "character_frequency_map": {
      "s": 2,
      "t": 2,
      "r": 2,
      "i": 1,
      "n": 2,
      "g": 1,
      " ": 2,
      "o": 1,
      "a": 2,
      "l": 1,
      "y": 1,
      "z": 1,
      "e": 1
    }
  },
  "created_at": "2025-10-21T12:00:00.000Z"
}
```

**Error Responses:**

- **400 Bad Request**: Missing "value" field
```json
  {
    "error": "Bad Request",
    "message": "Missing \"value\" field"
  }
```

- **409 Conflict**: String already exists
```json
  {
    "error": "Conflict",
    "message": "String already exists in the system"
  }
```

- **422 Unprocessable Entity**: Invalid data type
```json
  {
    "error": "Unprocessable Entity",
    "message": "Invalid data type for \"value\" (must be string)"
  }
```

---

### 2. Get Specific String

Retrieves a previously analyzed string by its value.

**Endpoint:** `GET /strings/{string_value}`

**Example:**
```
GET /strings/hello world
```

**Success Response (200 OK):**
```json
{
  "id": "b94d27b9934d3e08...",
  "value": "hello world",
  "properties": {
    "length": 11,
    "is_palindrome": false,
    "unique_characters": 8,
    "word_count": 2,
    "sha256_hash": "b94d27b9934d3e08...",
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
  "created_at": "2025-10-21T12:00:00.000Z"
}
```

**Error Response:**

- **404 Not Found**: String does not exist
```json
  {
    "error": "Not Found",
    "message": "String does not exist in the system"
  }
```

---

### 3. Get All Strings (with optional filtering)

Retrieves all stored strings with optional filter parameters.

**Endpoint:** `GET /strings`

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `is_palindrome` | boolean | Filter by palindrome status | `true` or `false` |
| `min_length` | integer | Minimum string length | `5` |
| `max_length` | integer | Maximum string length | `20` |
| `word_count` | integer | Exact word count | `2` |
| `contains_character` | string | Single character to search for | `a` |

**Examples:**
```
GET /strings
GET /strings?is_palindrome=true
GET /strings?min_length=5&max_length=10
GET /strings?word_count=2&contains_character=a
GET /strings?is_palindrome=true&word_count=1
```

**Success Response (200 OK):**
```json
{
  "data": [
    {
      "id": "hash1",
      "value": "racecar",
      "properties": {
        "length": 7,
        "is_palindrome": true,
        "unique_characters": 4,
        "word_count": 1,
        "sha256_hash": "hash1",
        "character_frequency_map": {
          "r": 2,
          "a": 2,
          "c": 2,
          "e": 1
        }
      },
      "created_at": "2025-10-21T12:00:00.000Z"
    },
    {
      "id": "hash2",
      "value": "madam",
      "properties": { /* ... */ },
      "created_at": "2025-10-21T12:05:00.000Z"
    }
  ],
  "count": 2,
  "filters_applied": {
    "is_palindrome": "true",
    "word_count": "1"
  }
}
```

**Error Response:**

- **400 Bad Request**: Invalid query parameters
```json
  {
    "error": "Bad Request",
    "message": "Invalid query parameter values or types",
    "details": [
      "min_length must be a non-negative integer"
    ]
  }
```

---

### 4. Natural Language Filtering

Query strings using natural language instead of filter parameters.

**Endpoint:** `GET /strings/filter-by-natural-language`

**Query Parameter:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Natural language query |

**Supported Query Patterns:**

| Natural Language | Parsed Filters | Example |
|------------------|----------------|---------|
| "single word palindromes" | `word_count=1, is_palindrome=true` | "racecar", "level" |
| "longer than 10 characters" | `min_length=11` | strings with 11+ chars |
| "shorter than 5 characters" | `max_length=4` | strings with 4 or fewer chars |
| "containing the letter z" | `contains_character=z` | "pizza", "buzz" |
| "palindromic strings that contain the first vowel" | `is_palindrome=true, contains_character=a` | "kayak", "madam" |

**Examples:**
```
GET /strings/filter-by-natural-language?query=all single word palindromic strings
GET /strings/filter-by-natural-language?query=strings longer than 10 characters
GET /strings/filter-by-natural-language?query=strings containing the letter z
```

**Success Response (200 OK):**
```json
{
  "data": [
    {
      "id": "hash1",
      "value": "racecar",
      "properties": { /* ... */ },
      "created_at": "2025-10-21T12:00:00.000Z"
    }
  ],
  "count": 1,
  "interpreted_query": {
    "original": "all single word palindromic strings",
    "parsed_filters": {
      "word_count": 1,
      "is_palindrome": true
    }
  }
}
```

**Error Responses:**

- **400 Bad Request**: Unable to parse query
```json
  {
    "error": "Bad Request",
    "message": "Unable to parse natural language query"
  }
```

- **422 Unprocessable Entity**: Conflicting filters
```json
  {
    "error": "Unprocessable Entity",
    "message": "Query parsed but resulted in conflicting filters",
    "parsed_filters": {
      "min_length": 20,
      "max_length": 10
    }
  }
```

---

### 5. Delete String

Removes a string from the system.

**Endpoint:** `DELETE /strings/{string_value}`

**Example:**
```
DELETE /strings/hello world
```

**Success Response (204 No Content):**

Empty response body with status code 204.

**Error Response:**

- **404 Not Found**: String does not exist
```json
  {
    "error": "Not Found",
    "message": "String does not exist in the system"
  }
```

---

## 🧪 Testing

### Using Postman

1. **Import Collection** (optional):
   - Create a new collection named "String Analyzer API"
   - Add requests for each endpoint

2. **Test Endpoints**:

   **Create a string:**
```
   POST http://localhost:3000/strings
   Body: {"value": "hello world"}
```

   **Get the string:**
```
   GET http://localhost:3000/strings/hello world
```

   **Filter palindromes:**
```
   GET http://localhost:3000/strings?is_palindrome=true
```

   **Natural language query:**
```
   GET http://localhost:3000/strings/filter-by-natural-language?query=single word palindromes
```

   **Delete the string:**
```
   DELETE http://localhost:3000/strings/hello world
```

### Using cURL
```bash
# Create a string
curl -X POST http://localhost:3000/strings \
  -H "Content-Type: application/json" \
  -d '{"value":"hello world"}'

# Get a string
curl http://localhost:3000/strings/hello%20world

# Get all palindromes
curl "http://localhost:3000/strings?is_palindrome=true"

# Natural language query
curl "http://localhost:3000/strings/filter-by-natural-language?query=single%20word%20palindromes"

# Delete a string
curl -X DELETE http://localhost:3000/strings/hello%20world
```

### Test Checklist

- [ ] Root endpoint returns welcome message
- [ ] POST creates string with correct properties
- [ ] POST detects palindromes correctly
- [ ] POST returns 409 for duplicates
- [ ] POST returns 400 for missing field
- [ ] POST returns 422 for wrong data type
- [ ] GET retrieves specific string
- [ ] GET returns 404 for non-existent string
- [ ] GET returns all strings without filters
- [ ] Filter by is_palindrome works
- [ ] Filter by word_count works
- [ ] Filter by min_length and max_length works
- [ ] Filter by contains_character works
- [ ] Multiple filters work together (AND logic)
- [ ] Natural language parsing works
- [ ] DELETE removes string successfully
- [ ] DELETE returns 404 for non-existent string

## 🚀 Deployment

### Deploying to Railway

1. **Push to GitHub:**
```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/calltrum/string-analyzer-api.git
   git push -u origin main
```

2. **Deploy on Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `string-analyzer-api` repository
   - Railway will auto-detect Node.js and deploy
   - Click "Generate Domain" to get your public URL

3. **Environment Variables:**
   - Railway automatically sets the `PORT` variable
   - No additional configuration needed

4. **Verify Deployment:**
```bash
   curl https://string-analyzer-api-production-4bf5.up.railway.app
```

### Other Deployment Options

- **Heroku**: Similar process with GitHub integration
- **AWS EC2**: Requires more configuration
- **DigitalOcean App Platform**: Similar to Railway
- **Render**: Alternative platform (not allowed for this project)

## 📁 Project Structure
```
string-analyzer-api/
├── src/
│   ├── controllers/
│   │   └── stringController.js    # Endpoint business logic
│   ├── routes/
│   │   └── stringRoutes.js        # API route definitions
│   ├── utils/
│   │   ├── stringAnalyzer.js      # String analysis functions
│   │   ├── storage.js             # In-memory data storage
│   │   ├── filters.js             # Filter application logic
│   │   └── naturalLanguageParser.js  # NL query parsing
│   └── server.js                  # Express app entry point
├── .env                           # Environment variables (not in repo)
├── .gitignore                     # Git ignore rules
├── package.json                   # Project dependencies
├── package-lock.json              # Dependency lock file
└── README.md                      # This file
```

### File Descriptions

| File | Purpose |
|------|---------|
| `server.js` | Main entry point, configures Express app |
| `stringRoutes.js` | Defines URL routes and maps to controllers |
| `stringController.js` | Contains logic for each API endpoint |
| `stringAnalyzer.js` | Functions to compute string properties |
| `storage.js` | In-memory storage using JavaScript Map |
| `filters.js` | Functions to filter arrays of strings |
| `naturalLanguageParser.js` | Parses natural language into filters |

## 🔐 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `3000` | No |

**Note:** Railway automatically provides the `PORT` variable in production.

## 💡 Examples

### Example 1: Analyzing a Palindrome

**Request:**
```bash
POST /strings
{
  "value": "A man a plan a canal Panama"
}
```

**Response:**
```json
{
  "id": "...",
  "value": "A man a plan a canal Panama",
  "properties": {
    "length": 30,
    "is_palindrome": true,
    "unique_characters": 10,
    "word_count": 6,
    "sha256_hash": "...",
    "character_frequency_map": {
      "A": 1,
      " ": 5,
      "m": 2,
      "a": 10,
      "n": 3,
      "p": 2,
      "l": 2,
      "c": 1,
      "P": 1
    }
  },
  "created_at": "2025-10-21T12:00:00.000Z"
}
```

### Example 2: Complex Filtering

**Request:**
```bash
GET /strings?is_palindrome=true&min_length=5&max_length=10&word_count=1
```

This returns:
- Only palindromes
- With length between 5 and 10 characters
- That are single words

**Example matches:**
- "racecar" (7 chars, palindrome, 1 word) ✅
- "level" (5 chars, palindrome, 1 word) ✅
- "madam" (5 chars, palindrome, 1 word) ✅

**Example non-matches:**
- "hi" (too short) ❌
- "hello world" (not palindrome, 2 words) ❌
- "a man a plan a canal panama" (palindrome but 6 words) ❌

### Example 3: Natural Language Query

**Request:**
```bash
GET /strings/filter-by-natural-language?query=palindromic strings that contain the first vowel
```

**Interpreted As:**
```json
{
  "is_palindrome": true,
  "contains_character": "a"
}
```

**Returns:**
- "racecar" ✅ (palindrome with 'a')
- "kayak" ✅ (palindrome with 'a')
- "madam" ✅ (palindrome with 'a')
- "level" ❌ (palindrome but no 'a')

## ⚠️ Error Handling

The API uses standard HTTP status codes:

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET request |
| 201 | Created | Successful POST request |
| 204 | No Content | Successful DELETE request |
| 400 | Bad Request | Invalid request format or parameters |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Entity | Invalid data type |
| 500 | Internal Server Error | Unexpected server error |

All error responses follow this format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

## 🔄 Data Persistence

**Important Note:** This API uses **in-memory storage** (JavaScript Map). This means:

- ✅ **Pros**: Very fast, no database setup needed
- ❌ **Cons**: Data is lost when server restarts

For production applications, consider migrating to:
- PostgreSQL
- MongoDB
- Redis
- MySQL

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Callum Trace**

- GitHub: [@calltrum](https://github.com/calltrum)
- Email: bbabyboy115@gmail.com
- LinkedIn: [Omeje Chidera](http://linkedin.com/in/omeje-chidera-3682161ab/)

## 🙏 Acknowledgments

- Built as part of the HNG Internship Stage 1 Backend Challenge
- Thanks to the HNG team for the opportunity
- Learn more about HNG: [https://hng.tech/internship](https://hng.tech/internship)



## 🔗 Related Links

- [HNG Internship](https://hng.tech/internship)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Railway Documentation](https://docs.railway.app/)

---

**Made with ❤️ for the HNG Internship Program**