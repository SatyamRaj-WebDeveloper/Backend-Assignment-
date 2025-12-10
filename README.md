# Restaurant Search Backend

A specialized backend service built with **Node.js** and **MySQL** that allows users to search for restaurants based on dish names and price filters. This project was built to satisfy a backend developer assessment.

## 🚀 Live Deployment
**Base URL:** `[PASTE_YOUR_RAILWAY_URL_HERE]`
*(Example: https://web-production-1234.up.railway.app)*

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL (Hosted on Railway)
* **Library:** mysql2 (Database connector)

## ⚙️ Features
* **Search by Dish:** Find restaurants serving a specific dish (e.g., "Biryani").
* **Price Filtering:** Mandatory `minPrice` and `maxPrice` filters to refine searches.
* **Ranked Results:** Returns top 10 restaurants sorted by the highest order volume for that dish.
* **Cloud Ready:** Configured for seamless deployment on Railway.

---

## 💻 Local Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-link>
cd <folder-name>
