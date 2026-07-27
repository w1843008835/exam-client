import React from 'react';
import { RotateCcw, Trophy, XCircle, HelpCircle, Percent } from 'lucide-react';
import { useExamStore } from '../store/examStore';
import './Statistics.css';

interface StatisticsProps {
  onRetake: () => void;
}

const Statistics: React.FC<StatisticsProps> = ({ onRetake }) => {
  const { getStatistics, isCompleted,answerCard } = useExamStore();
  const { correct, wrong, unanswered, accuracy } = getStatistics();

  return (
    <div className="statistics-container">
      <div className="stats-grid">
        <div className="stat-card correct">
          <div className="stat-icon">
            <Trophy size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{answerCard.correct}</span>
            <span className="stat-label">答对</span>
          </div>
        </div>

        <div className="stat-card wrong">
          <div className="stat-icon">
            <XCircle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{answerCard.incorrect}</span>
            <span className="stat-label">答错</span>
          </div>
        </div>

        <div className="stat-card unanswered">
          <div className="stat-icon">
            <HelpCircle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{answerCard.undo}</span>
            <span className="stat-label">未答</span>
          </div>
        </div>

      </div>

      {isCompleted && (
        <button className="retake-button" onClick={onRetake}>
          <RotateCcw size={18} />
          <span>重新答题</span>
        </button>
      )}
    </div>
  );
};

export default Statistics;