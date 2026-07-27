import React, { useState, useEffect } from 'react';
import { BookOpen, Layers, Loader2 } from 'lucide-react';
import ExamCard from '../../components/ExamCard';
import { getExamList } from '@/service/examService';
import type { Exam } from '@/types';
import '@/pages/style/ExamListPage.css';

const ExamListPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExamList()
      .then(setExams)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="exam-list-container flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

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