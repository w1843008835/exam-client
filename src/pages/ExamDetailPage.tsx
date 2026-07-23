import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import Question from '../components/Question';
import AnswerCard from '../components/AnswerCard';
import Statistics from '../components/Statistics';
import { useExamStore } from '../store/examStore';
import { getExamById, getQuestionsByExamId } from '../mock/data';
import './ExamDetailPage.css';

const ExamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    currentExam,
    setCurrentExam,
    questions,
    setQuestions,
    currentQuestionIndex,
    resetExam
  } = useExamStore();

  useEffect(() => {
    if (id) {
      const exam = getExamById(id);
      const examQuestions = getQuestionsByExamId(id);
      
      if (exam && examQuestions.length > 0) {
        setCurrentExam(exam);
        setQuestions(examQuestions);
        resetExam();
      }
    }
  }, [id, setCurrentExam, setQuestions, resetExam]);

  const handleBack = () => {
    navigate('/home/exam-list');
  };

  const handleRetake = () => {
    resetExam();
  };

  if (!currentExam || questions.length === 0) {
    return (
      <div className="exam-detail-container">
        <div className="loading-state">
          <FileText size={48} />
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="exam-detail-container">
      <div className="detail-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          <span>返回</span>
        </button>
        <h2 className="exam-title">{currentExam.title}</h2>
      </div>

      <div className="detail-content">
        <div className="question-section">
          <Question
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </div>

        <div className="sidebar-section">
          <AnswerCard questions={questions} />
          <Statistics onRetake={handleRetake} />
        </div>
      </div>
    </div>
  );
};

export default ExamDetailPage;