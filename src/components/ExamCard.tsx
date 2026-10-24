import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, RotateCcw, Loader2 } from 'lucide-react';
import { Exam, QuestionDetailDto } from '@/types';
import { useExamStore } from '@/store/examStore';
import { getExamDetail, getAnswerCard, resetExam } from '@/service/examService';
import { toast } from '@/utils/toast';
import './ExamCard.css';
import { USER_ID } from '@/constant/const';

interface ExamCardProps {
  exam: Exam;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const navigate = useNavigate();
  const [resetOpen, setResetOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

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

  const handleConfirmReset = async () => {
    setResetting(true);
    try {
      await resetExam({
        userId: Number(localStorage.getItem(USER_ID)),
        examType: exam.examType,
      });

      // 清空后刷新答题卡，让列表上的统计回到初始状态
      const newAnswerCard = await getAnswerCard(exam.examType);
      useExamStore.getState().setAnswerCard(newAnswerCard);

      toast.success('已清空答题记录，可以重新作答');
      setResetOpen(false);
    } catch {
      // request.ts 已统一弹出后端错误信息，这里不再重复提示
    } finally {
      setResetting(false);
    }
  };

  return (
    <>
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

          <div className="card-actions">
            <button className="card-button">
              <span>开始答题</span>
              <ArrowRight size={16} />
            </button>
            <button
              className="card-button card-button-danger"
              onClick={(e) => {
                e.stopPropagation(); // 阻止冒泡到卡片，避免误触发进入答题
                setResetOpen(true);
              }}
            >
              <RotateCcw size={16} />
              <span>清空重做</span>
            </button>
          </div>
        </div>
      </div>

      {/* 确认框与卡片平级：放在卡片 div 外，点击不会冒泡触发进入答题 */}
      {resetOpen && (
        <div
          className="confirm-mask"
          onClick={() => !resetting && setResetOpen(false)}
        >
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <h4 className="confirm-title">确认清空重做？</h4>
            <p className="confirm-desc">
              将清空「{exam.title}」的全部答题记录，此操作不可恢复。
            </p>
            <div className="confirm-actions">
              <button
                className="dialog-btn"
                onClick={() => setResetOpen(false)}
                disabled={resetting}
              >
                取消
              </button>
              <button
                className="dialog-btn dialog-btn-danger"
                onClick={handleConfirmReset}
                disabled={resetting}
              >
                {resetting && <Loader2 size={16} className="spin" />}
                {resetting ? '清空中...' : '确认清空'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExamCard;
