import React, { useState, useEffect } from 'react'
import { logout, getSessionInfo } from '../services/api'
import './Dashboard.css'

function Dashboard({ user, onLogout }) {
  const [sessionInfo, setSessionInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSessionInfo()
  }, [])

  const loadSessionInfo = async () => {
    try {
      const data = await getSessionInfo()
      setSessionInfo(data)
    } catch (err) {
      console.error('Failed to load session info:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      onLogout()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Bem-vindo, {user.username}! 👋</h1>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </div>

        <div className="info-card">
          <h2>Informações do Usuário</h2>
          <div className="info-row">
            <span className="info-label">ID do Usuário:</span>
            <span className="info-value">{user.id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Nome de Usuário:</span>
            <span className="info-value">{user.username}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
        </div>

        <div className="info-card redis-card">
          <h2>Informações da Sessão Redis</h2>
          {loading ? (
            <p>Carregando dados da sessão...</p>
          ) : sessionInfo ? (
            <>
              <div className="info-row">
                <span className="info-label">ID da Sessão:</span>
                <span className="info-value code">{sessionInfo.sessionId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Armazenado em:</span>
                <span className="info-value">Banco Redis</span>
              </div>
              <div className="info-row">
                <span className="info-label">Expira em:</span>
                <span className="info-value">
                  {sessionInfo.cookie && sessionInfo.cookie.expires
                    ? new Date(sessionInfo.cookie.expires).toLocaleString(
                        'pt-BR'
                      )
                    : 'Não especificado'}
                </span>
              </div>
              <div className="redis-explanation">
                <p>
                  <strong>Como funciona:</strong> Sua sessão está armazenada no
                  Redis, um banco de dados em memória. Isso permite buscas
                  rápidas de sessão e escalabilidade horizontal fácil entre
                  múltiplos servidores.
                </p>
              </div>
            </>
          ) : (
            <p className="error">Falha ao carregar informações da sessão</p>
          )}
        </div>

        <div className="info-card benefits-card">
          <h2>Benefícios do Redis para Sessões</h2>
          <ul className="benefits-list">
            <li>
              <strong>Alta Performance:</strong> Armazenamento em memória
              fornece latência de microssegundos para recuperação de sessões
            </li>
            <li>
              <strong>Escalabilidade:</strong> Múltiplos servidores de aplicação
              podem compartilhar a mesma instância Redis
            </li>
            <li>
              <strong>Persistência:</strong> Sessões sobrevivem a
              reinicializações da aplicação
            </li>
            <li>
              <strong>Expiração Automática:</strong> Redis gerencia o TTL (Time
              To Live) das sessões automaticamente
            </li>
            <li>
              <strong>Recursos Integrados:</strong> Suporta replicação e alta
              disponibilidade
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
