import React from 'react';
import { BookOpen, Layers } from 'lucide-react';
import ExamCard from '../components/ExamCard';
import { exams } from '../mock/data';
import './ExamListPage.css';

const ExamListPage: React.FC = () => {
  return (
    <div className="exam-list-container">
      <div className="page-header">
        <div className="header-info">
          <div className="header-icon">
            <BookOpen size={32} />
          </div>
          <div>
            <h2 className="page-title">题库列表</h2>
            <p className="page-subtitle">选择一个题库开始答题</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <Layers size={20} />
            <span className="stat-value">{exams.length}</span>
            <span className="stat-label">题库总数</span>
          </div>
        </div>
      </div>

      <div className="exam-grid">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </div>
  );
};

export default ExamListPage;