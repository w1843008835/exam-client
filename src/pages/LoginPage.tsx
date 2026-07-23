import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, AlertCircle } from 'lucide-react';
import { useExamStore } from '../store/examStore';
import { mockLogin } from '../mock/data';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useExamStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const result = mockLogin(username, password);

    if (result.success) {
      login(result.user!.username, result.token);
      navigate('/home');
    } else {
      setError('用户名或密码错误');
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">在线考试系统</h1>
          <p className="login-subtitle">请登录您的账户</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                placeholder="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>

          <div className="login-hint">
            <span>提示：用户名 admin，密码 123456</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;