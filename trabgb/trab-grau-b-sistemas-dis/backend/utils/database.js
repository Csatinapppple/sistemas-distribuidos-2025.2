const fs = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json')

async function initializeDatabase() {
  try {
    await fs.access(USERS_FILE)
  } catch {
    const initialUsers = [
      {
        id: '1',
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        email: 'admin@example.com',
      },
      {
        id: '2',
        username: 'user',
        password: await bcrypt.hash('user123', 10),
        email: 'user@example.com',
      },
    ]
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true })
    await fs.writeFile(USERS_FILE, JSON.stringify(initialUsers, null, 2))
    console.log('✓ Database initialized with default users')
  }
}

// Read all users
async function getAllUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users:', error)
    return []
  }
}

// Find user by username
async function findUserByUsername(username) {
  const users = await getAllUsers()
  return users.find((u) => u.username === username)
}

// Find user by ID
async function findUserById(id) {
  const users = await getAllUsers()
  return users.find((u) => u.id === id)
}

// Verify password
async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword)
}

module.exports = {
  initializeDatabase,
  getAllUsers,
  findUserByUsername,
  findUserById,
  verifyPassword,
}
