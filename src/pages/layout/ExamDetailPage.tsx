import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import Question from '../../components/Question';
import AnswerCard from '../../components/AnswerCard';
import { useExamStore } from '../../store/examStore';
import '@/pages/style/ExamDetailPage.css';

const ExamDetailPage: React.FC = () => {
  const navigate = useNavigate();

  // exam / questionDetail / answerCard 由 ExamCard 点击【开始答题】时请求后写入 store
  // questionDetail.userAnswer 由后端返回，用于 Question 内部判断 showResult
  const { exam, questionDetail } = useExamStore();

  const handleBack = () => {
    navigate('/home/exam-list');
  };

  if (!exam || !questionDetail) {
    return (
      <div className="exam-detail-container">
        <div className="loading-state">
          <FileText size={48} />
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-detail-container">
      <div className="detail-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          <span>返回</span>
        </button>
        <h2 className="exam-title">{exam.title}</h2>
      </div>

      <div className="detail-content">
        <div className="question-section">
          <Question
            question={questionDetail}
            questionNumber={questionDetail.sort}
            totalQuestions={exam.questionCount}
          />
        </div>

        <div className="sidebar-section">
          <AnswerCard />
        </div>
      </div>
    </div>
  );
};

export default ExamDetailPage;
