const express = require('express')
const router = express.Router()
const {
  findUserByUsername,
  findUserById,
  verifyPassword,
  initializeDatabase,
} = require('../utils/database')

// Initialize database on startup
initializeDatabase()

// Middleware
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Não autenticado' })
  }
  next()
}

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' })
    }

    const user = await findUserByUsername(username)

    if (!user) {
      return res.status(401).json({ error: 'Credenciais Inválidas' })
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return res.status(401).json({ error: 'Credenciais Inválidas' })
    }

    // Create session in Redis
    req.session.userId = user.id
    req.session.username = user.username

    // Save session
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err)
        return res.status(500).json({ error: 'Falha ao criar sessão' })
      }

      console.log(`✓ Session created in Redis for user: ${user.username}`)

      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      })
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Logout endpoint
router.post('/logout', (req, res) => {
  const username = req.session.username

  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err)
      return res.status(500).json({ error: 'Falha ao sair' })
    }

    console.log(`✓ Session destroyed in Redis for user: ${username}`)
    res.clearCookie('connect.sid')
    res.json({ success: true, message: 'Logout realizado com sucesso' })
  })
})

// Check session endpoint
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await findUserById(req.session.userId)

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Session info endpoint
router.get('/session-info', requireAuth, (req, res) => {
  res.json({
    sessionId: req.sessionID,
    userId: req.session.userId,
    username: req.session.username,
    cookie: req.session.cookie,
    message: 'Session data stored in Redis',
  })
})

module.exports = router
