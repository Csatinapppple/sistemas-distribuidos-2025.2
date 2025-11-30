const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis').default
const { createClient } = require('redis')
const cors = require('cors')
const authRoutes = require('./routes/auth')

const app = express()
const PORT = 3001

// Redis client setup
const redisClient = createClient({
  url: 'redis://localhost:6379',
})

redisClient.connect().catch(console.error)

redisClient.on('connect', () => {
  console.log('Connected to Redis')
})

redisClient.on('error', (err) => {
  console.error('Redis error:', err)
})

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())

// Session configuration Redis store
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
)

// Routes
app.use('/api/auth', authRoutes)

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', redis: redisClient.isReady })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Redis session store enabled`)
})
