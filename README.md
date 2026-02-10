p# BFHL API

This is a Node.js REST API for the BFHL (Bharat Fools Hostel Limited) task.

## Features

- POST /bfhl: Handles requests for fibonacci, prime, lcm, hcf, and AI queries.
- GET /health: Health check endpoint.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file with:
   ```
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key
   OFFICIAL_EMAIL=your.chitkara.email@chitkara.edu.in
   ```
4. Get Gemini API key from https://aistudio.google.com
5. Run the server: `npm start`

## API Endpoints

### POST /bfhl

Accepts JSON with one of: fibonacci, prime, lcm, hcf, AI.

Examples:

- Fibonacci: `{"fibonacci": 7}` -> `{"is_success": true, "official_email": "...", "data": [0,1,1,2,3,5,8]}`
- Prime: `{"prime": [2,4,7,9,11]}` -> `{"is_success": true, "official_email": "...", "data": [2,7,11]}`
- LCM: `{"lcm": [12,18,24]}` -> `{"is_success": true, "official_email": "...", "data": 72}`
- HCF: `{"hcf": [24,36,60]}` -> `{"is_success": true, "official_email": "...", "data": 12}`
- AI: `{"AI": "What is the capital city of Maharashtra?"}` -> `{"is_success": true, "official_email": "...", "data": "Mumbai"}`

### GET /health

Returns: `{"is_success": true, "official_email": "..."}`

## Deployment

Deploy to Vercel, Railway, or Render.

For Vercel:
1. Push to GitHub.
2. Login → New Project → Import repository
3. Configure runtime
4. Deploy and copy public URL
5. Set environment variables in Vercel dashboard.

## GitHub Repository

Make the repo public and share the URL.
