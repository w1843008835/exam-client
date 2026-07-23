import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, User } from 'lucide-react';
import { useExamStore } from '../store/examStore';
import './Header.css';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const user = useExamStore((state) => state.user);
  const logout = useExamStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={onMenuToggle}>
          <Menu size={24} />
        </button>
        <h1 className="system-name">在线考试系统</h1>
      </div>
      <div className="header-right">
        <div className="user-info">
          <User size={18} />
          <span className="username">{user?.username}</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} />
          <span>退出</span>
        </button>
      </div>
    </header>
  );
};

export default Header;