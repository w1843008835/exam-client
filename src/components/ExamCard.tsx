import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { Exam } from '../types';
import './ExamCard.css';

interface ExamCardProps {
  exam: Exam;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/home/exam-detail/${exam.id}`);
  };

  return (
    <div className="exam-card" onClick={handleClick}>
      <div className="card-image">
        <img src={exam.coverImage} alt={exam.title} />
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{exam.title}</h3>
          <div className="question-count">
            <FileText size={16} />
            <span>{exam.questionCount}题</span>
          </div>
        </div>
        <p className="card-description">{exam.description}</p>
        <button className="card-button">
          <span>开始答题</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ExamCard;