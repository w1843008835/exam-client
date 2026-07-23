import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Question as QuestionType } from '../types';
import { useExamStore } from '../store/examStore';
import './AnswerCard.css';

interface AnswerCardProps {
  questions: QuestionType[];
}

const AnswerCard: React.FC<AnswerCardProps> = ({ questions }) => {
  const { currentQuestionIndex, setCurrentQuestionIndex, getAnswerStatus } = useExamStore();

  const handleQuestionClick = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="answer-card">
      <div className="card-header">
        <HelpCircle size={20} />
        <h3 className="card-title">答题卡</h3>
      </div>

      <div className="card-grid">
        {questions.map((question, index) => {
          const status = getAnswerStatus(question.id);
          const isCurrent = index === currentQuestionIndex;
          
          return (
            <button
              key={question.id}
              className={`card-item ${status} ${isCurrent ? 'current' : ''}`}
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="card-legend">
        <div className="legend-item">
          <span className="legend-dot correct"></span>
          <span className="legend-text">正确</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot wrong"></span>
          <span className="legend-text">错误</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot unanswered"></span>
          <span className="legend-text">未答</span>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;