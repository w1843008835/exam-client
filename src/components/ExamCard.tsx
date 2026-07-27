import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { Exam, QuestionDetailDto } from '@/types';
import { useExamStore } from '@/store/examStore';
import { getExamDetail, getAnswerCard } from '@/service/examService';
import './ExamCard.css';
import { USER_ID } from '@/constant/const';

interface ExamCardProps {
  exam: Exam;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const questionDetailParam: QuestionDetailDto = {
      userId: Number(localStorage.getItem(USER_ID)),
      examType: exam.examType,
      userAnswer: null,
      questionNumber: 1,
    };

    const [answerCard, questionDetail] = await Promise.all([
      getAnswerCard(exam.examType),
      getExamDetail(questionDetailParam),
    ]);

    useExamStore.getState().setAnswerCard(answerCard);
    useExamStore.getState().setQuestionDetail(questionDetail);
    useExamStore.getState().setExam(exam);

    navigate(`/home/exam-detail/${exam.id}`);
  };

  return (
    <div className="exam-card" onClick={handleClick}>
      <div className="card-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
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