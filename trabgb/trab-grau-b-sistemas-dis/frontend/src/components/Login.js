import React, { useState } from 'react'
import { login } from '../services/api'
import './Login.css'

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await login(username, password)
      console.log('Login successful:', data)
      onLoginSuccess(data.user)
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Demo de Autenticação Redis</h1>
        <p className="subtitle">Gerenciamento de Sessões com Redis</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nome de Usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite o nome de usuário"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Fazendo login...' : 'Entrar'}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Credenciais de Demonstração:</h3>
          <p>
            <strong>Usuário:</strong> admin | <strong>Senha:</strong> admin123
          </p>
          <p>
            <strong>Usuário:</strong> user | <strong>Senha:</strong> user123
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
