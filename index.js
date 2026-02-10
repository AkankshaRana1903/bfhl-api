require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDAA6lR6X6cXuB1K5wo7RswiDzXlH3HaHg';
const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'akanksha0100.be23@chitkara.edu.in';
function isPrime(num) {
  if (num<=1) return false;
  if (num <= 3) return true;
  if (num % 2===0||num % 3===0) return false;
  for (let i = 5;i*i<=num;i+=6) {
    if (num % i === 0||num % (i + 2)===0) return false;
  }
  return true;
}
function gcd(a, b) {
  while (b!== 0) {
    let t=b;
    b=a % b;
    a=t;
  }
  return a;
}
function lcm(a,b) {
  return (a*b)/gcd(a,b);
}
function fibonacci(n) {
  if (n<=0) return [];
  if (n===1) return [0];
  let series = [0,1];
  for (let i = 2; i < n; i++) {
    series.push(series[i-1] + series[i-2]);
  }
  return series;
}
async function getAIResponse(question) {
  try {
    const prompt = `Answer the following question with a single word: ${question}`;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );
    const answer = response.data.candidates[0].content.parts[0].text.trim();
    return answer;
  } catch (error) {
    throw new Error('AI service unavailable');
  }
}
// Routes
app.post('/bfhl', async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);
    if (keys.length !== 1) {
      return res.status(400).json({ is_success: false, message: 'Exactly one key required' });
    }
    const key = keys[0];
    let data;
    switch (key) {
      case 'fibonacci':
        const n = body.fibonacci;
        if (!Number.isInteger(n) || n <= 0) {
          return res.status(400).json({ is_success: false, message: 'Invalid input for fibonacci' });
        }
        data = fibonacci(n);
        break;
      case 'prime':
        const arr = body.prime;
        if (!Array.isArray(arr) || arr.some(x => !Number.isInteger(x) || x <= 0)) {
          return res.status(400).json({ is_success: false, message: 'Invalid input for prime' });
        }
        data = arr.filter(isPrime);
        break;
      case 'lcm':
        const numsLcm = body.lcm;
        if (!Array.isArray(numsLcm) || numsLcm.length < 2 || numsLcm.some(x => !Number.isInteger(x) || x <= 0)) {
          return res.status(400).json({ is_success: false, message: 'Invalid input for lcm' });
        }
        data = numsLcm.reduce((a, b) => lcm(a, b));
        break;
      case 'hcf':
        const numsHcf = body.hcf;
        if (!Array.isArray(numsHcf) || numsHcf.length < 2 || numsHcf.some(x => !Number.isInteger(x) || x <= 0)) {
          return res.status(400).json({ is_success: false, message: 'Invalid input for hcf' });
        }
        data = numsHcf.reduce((a, b) => gcd(a, b));
        break;
      case 'AI':
        const question = body.AI;
        if (typeof question !== 'string' || question.trim() === '') {
          return res.status(400).json({ is_success: false, message: 'Invalid input for AI' });
        }
        data = await getAIResponse(question);
        break;
      default:
        return res.status(400).json({ is_success: false, message: 'Invalid key' });
    }
    res.json({ is_success: true, official_email: OFFICIAL_EMAIL, data });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});
app.get('/', (req, res) => {
  res.json({ message: 'BFHL API is running. Use /health for health check or /bfhl for operations.' });
});

app.get('/health', (req, res) => {
  res.json({ is_success: true, official_email: OFFICIAL_EMAIL });
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
