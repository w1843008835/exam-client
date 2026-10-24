import React, { useState } from 'react';
import { useExamStore } from '@/store/examStore';
import { CheckCircle, XCircle, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import './AnswerCard.css';
import {ANSWER_STATUS_UNDO,ANSWER_STATUS_CORRECT,ANSWER_STATUS_WRONG,USER_ID} from '@/constant/const';
import type { QuestionDetailDto } from '@/types';

const AnswerCard: React.FC = () => {
  const { answerCard, exam, questionDetail, fetchQuestionDetail } = useExamStore();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (!answerCard || !exam) {
    return null;
  }

  const toggle = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 点击题号：与"下一题"共用同一个接口（POST /api/exam/question），只是 questionNumber 不同
  const handleJump = (num: number) => {
    const param: QuestionDetailDto = {
      userId: Number(localStorage.getItem(USER_ID)),
      examType: exam.examType,
      userAnswer: null,
      questionNumber: num,
    };
    fetchQuestionDetail(param);
  };

  const totalQuestions = exam.questionCount;

let correctList = [];
let wrongList = [];
let unansweredList = [];

answerCard.options.forEach(item => {
  const num = item.questionNumber;
  switch (item.isCorrect) {
    case ANSWER_STATUS_CORRECT:
      correctList.push(num);
      break;
    case ANSWER_STATUS_WRONG:
      wrongList.push(num);
      break;
    case ANSWER_STATUS_UNDO:
      unansweredList.push(num);
      break;
  }
});
  const sections = [
    {
      key: 'correct',
      label: '正确',
      Icon: CheckCircle,
      iconClass: 'icon-correct',
      count: correctList.length,
      list: correctList,
      itemClass: 'item-correct',
    },
    {
      key: 'wrong',
      label: '错误',
      Icon: XCircle,
      iconClass: 'icon-wrong',
      count: wrongList.length,
      list: wrongList,
      itemClass: 'item-wrong',
    },
    {
      key: 'unanswered',
      label: '未答',
      Icon: HelpCircle,
      iconClass: 'icon-unanswered',
      count: unansweredList.length,
      list: unansweredList,
      itemClass: 'item-unanswered',
    },
  ];

  return (
    <div className="answer-card">
      <h3 className="answer-card-title">答题统计</h3>
      {sections.map(section => {
        const isOpen = !!expanded[section.key];
        return (
          <div key={section.key} className={`stat-section ${section.key}`}>
            <div className="stat-header" onClick={() => toggle(section.key)}>
              <section.Icon size={18} className={section.iconClass} />
              <span className="stat-label">{section.label}</span>
              <span className="stat-count">{section.count}</span>
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            {isOpen && (
              <div className="stat-body">
                {section.list.length > 0 ? (
                  <div className="stat-list">
                    {section.list.map(num => (
                      <span
                        key={num}
                        className={`stat-item ${section.itemClass} ${num === questionDetail?.sort ? 'current' : ''}`}
                        onClick={() => handleJump(num)}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="stat-empty">暂无</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnswerCard;
