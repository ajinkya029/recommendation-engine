# 🚀 Recommendation Engine

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/REST_API-005571?style=for-the-badge&logo=fastapi&logoColor=white" alt="REST API" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

A personalized **Recommendation Engine REST API** built with the MERN backend stack. It recommends relevant items to users based on their preferences, item categories, tags, popularity, ratings, and interaction history.

The project provides a modular backend that can be integrated with a React frontend for applications such as e-commerce platforms, content discovery systems, learning platforms, and product recommendation dashboards.

## ✨ Features

- 🎯 **Personalized Recommendations** — Rank items according to user interests and preferences.
- 🧠 **Content-Based Recommendation Algorithm** — Calculate explainable recommendation scores using tags, categories, popularity, and ratings.
- 👤 **User Management** — Create users and retrieve user profiles.
- ⚙️ **Preference Management** — Update user interests to personalize recommendations.
- 📦 **Item Management** — Create, retrieve, filter, and search catalog items.
- ❤️ **Interaction Tracking** — Track views, likes, dislikes, purchases, and ratings.
- 💡 **Recommendation Explanations** — Return a reason explaining why an item was recommended.
- 📄 **Pagination** — Paginate item listings for efficient browsing.
- 🔒 **Security Middleware** — Helmet and configurable CORS.
- 🌱 **Sample Data Seeding** — Populate MongoDB with example items and a demo user.
- 🧩 **Modular Architecture** — Separate routes, controllers, models, middleware, and recommendation logic.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| JavaScript | Application logic |
| REST API | Client-server communication |
| dotenv | Environment variable management |
| Helmet | HTTP security headers |
| CORS | Cross-origin request handling |
| Morgan | HTTP request logging |
| Nodemon | Development server auto-restart |

## 🏗️ Project Structure

```text
recommendation-engine/
├── scripts/
│   └── seed.js
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── itemController.js
│   │   ├── recommendationController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Interaction.js
│   │   ├── Item.js
│   │   └── User.js
│   ├── routes/
│   │   ├── itemRoutes.js
│   │   ├── recommendationRoutes.js
│   │   └── userRoutes.js
│   └── utils/
│       └── recommendationEngine.js
├── docs/
│   └── API_EXAMPLES.md
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database
- npm (included with Node.js)
- Git (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/mern-recommendation-engine.git
cd recommendation-engine
```

Replace `YOUR_USERNAME` with your GitHub username and update the repository URL if your repository has a different name.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**

```bash
cp .env.example .env
```

Update your `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/recommendation_engine
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

For MongoDB Atlas, replace the local MongoDB URI with your Atlas connection string.

### 4. Seed Sample Data

Make sure MongoDB is running, then execute:

```bash
npm run seed
```

The script inserts sample catalog items and creates a demo user if one does not already exist.

It prints the demo user's ID. Save this ID for testing the recommendation endpoint.

### 5. Start the Server

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The API will be available at:

```text
http://localhost:5000
```

### 6. Verify the API

Send a GET request to:

```http
GET http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "recommendation-engine-api",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

The timestamp will reflect the actual time of the request.

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check API health |
| POST | `/users` | Create a user |
| GET | `/users/:id` | Retrieve a user profile |
| PATCH | `/users/:id/preferences` | Update user preferences |
| POST | `/items` | Create an item |
| GET | `/items` | List and filter items |
| GET | `/items/:id` | Retrieve an item |
| POST | `/items/:id/interactions` | Record an interaction |
| GET | `/recommendations/:userId` | Get personalized recommendations |

### Query Parameters

The item listing endpoint supports:

- `category` — Filter by category.
- `tag` — Filter by tag.
- `q` — Search item text.
- `page` — Page number.
- `limit` — Results per page, up to 100.

The recommendation endpoint supports:

- `limit` — Number of recommendations, up to 50.
- `category` — Restrict recommendations to a category.

## 🧪 API Usage Examples

You can test these endpoints using [Postman](https://www.postman.com/) or another API client.

### Create a User

**POST** `/api/users`

```json
{
  "name": "Demo User",
  "email": "demo2@example.com",
  "preferences": [
    "technology",
    "javascript",
    "backend"
  ]
}
```

Save the `_id` returned in the response.

### Create an Item

**POST** `/api/items`

```json
{
  "title": "Node.js API Development",
  "description": "Learn how to build scalable REST APIs.",
  "category": "technology",
  "tags": [
    "nodejs",
    "express",
    "backend"
  ],
  "popularity": 25,
  "averageRating": 4.5
}
```

### Update User Preferences

**PATCH** `/api/users/USER_ID/preferences`

```json
{
  "preferences": [
    "javascript",
    "react",
    "technology"
  ]
}
```

Replace `USER_ID` with a valid MongoDB user ID.

### Record a User Interaction

**POST** `/api/items/ITEM_ID/interactions`

```json
{
  "userId": "USER_ID",
  "type": "like"
}
```

Supported interaction types:

- `view`
- `like`
- `dislike`
- `purchase`
- `rating`

For a rating interaction, provide a numeric value between 1 and 5:

```json
{
  "userId": "USER_ID",
  "type": "rating",
  "value": 5
}
```

### Get Personalized Recommendations

**GET** `/api/recommendations/USER_ID?limit=10`

Example response structure:

```json
{
  "success": true,
  "data": [
    {
      "_id": "example-item-id",
      "title": "JavaScript Algorithms",
      "category": "technology",
      "tags": [
        "javascript",
        "algorithms",
        "coding"
      ],
      "recommendation": {
        "score": 35.4,
        "reason": "Matches your interests: javascript"
      }
    }
  ],
  "meta": {
    "userId": "example-user-id",
    "count": 1,
    "algorithm": "content-based-baseline"
  }
}
```

The IDs and scores above are illustrative. Actual results depend on the records stored in MongoDB.

## 🧠 How the Recommendation Engine Works

The current engine uses a **content-based scoring approach**.

1. **Preference matching:** Compare a user's interests with item categories and tags.
2. **Category relevance:** Give additional weight to items in preferred categories.
3. **Popularity:** Boost items with higher popularity values.
4. **Ratings:** Consider each item's average rating.
5. **Interaction history:** Penalize items already viewed or liked and items explicitly disliked.
6. **Ranking:** Sort active items by score and return the highest-ranked results with an explanation.

Recommendation scores are ranking signals, not probabilities.

This implementation is an explainable baseline and does not currently use a trained machine learning model or collaborative filtering.

## 🔐 Security Notes

This project includes basic security middleware, but it is not yet production-ready.

Before deploying, consider adding:

- JWT-based authentication and authorization.
- Request schema validation and input sanitization.
- Rate limiting and abuse protection.
- Automated tests and error monitoring.
- Access controls to prevent users from changing other users' data.
- Secure management of database credentials and environment variables.

Never commit your `.env` file or expose database credentials publicly.

## 🚀 Future Improvements

- JWT authentication and role-based access control.
- React frontend for browsing and recommendations.
- Collaborative filtering based on user-item interactions.
- Recommendation feedback and click-through tracking.
- Advanced ranking and recommendation evaluation.
- Automated unit and integration tests.
- Docker support and CI/CD pipeline.
- Production deployment and monitoring.

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a pull request.

## 📄 License

This project is available for learning and portfolio development. Add a `LICENSE` file to specify the license terms you choose.

## 👨‍💻 Author

**Ajinkya Dhatrak**

GitHub: [ajinkya029](https://github.com/ajinkya029)

---

<p align="center">
  Built with ❤️ using Node.js, Express.js, and MongoDB.
</p>
