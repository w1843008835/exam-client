import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, X } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    id: 'exam-list',
    label: '题库',
    icon: BookOpen,
    path: '/home/exam-list'
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">导航菜单</span>
          <button className="sidebar-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.path)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;