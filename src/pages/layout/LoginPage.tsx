import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, AlertCircle } from 'lucide-react';
import { useExamStore } from '../../store/examStore';
import '@/pages/style/LoginPage.css';
import {login} from '@/service/authService';
import {LoginDTO} from '@/types/index'
import { useForm } from "react-hook-form"
import { toast } from "@/utils/toast"
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 const form = useForm<LoginDTO>({
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));
  try {
    const result = await login({"username":username, "password":password});
    useExamStore.getState().login(result.userName, result.token);
    navigate('/home');
  } catch (error) {
    toast.error("登录失败");
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

      
        </form>
      </div>
    </div>
  );
};

export default LoginPage;