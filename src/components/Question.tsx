import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Question as QuestionType } from '../types';
import { useExamStore } from '../store/examStore';
import './Question.css';
import { getExamDetail, getAnswerCard } from '@/service/examService';
import { USER_ID } from '@/constant/const';
import { Exam, QuestionDetailDto } from '@/types';
interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
}

const Question: React.FC<QuestionProps> = ({ question, questionNumber, totalQuestions }) => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    addUserAnswer,
    answerCard,
    questionDetail,
    exam,
  } = useExamStore();

   const [questionDetailParam, setQuestionDetailParam] = useState<QuestionDetailDto>(() => ({
    userId: Number(localStorage.getItem(USER_ID)),
    examType: exam.examType,
    userAnswer: null,
    questionNumber: 1,
  }));

  const [choices, setChoices]=useState<string>(null)

  const userAnswer = userAnswers.find(a => a.questionId === question.id);
  const isMultipleChoice = questionDetail.questionType === '多选题';

  const [tempSelected, setTempSelected] = useState<string[]>([]);

  useEffect(() => {
    if (userAnswer) {
      setTempSelected(userAnswer.selectedOption);
    } else {
      setTempSelected([]);
    }
  }, [question.id, userAnswer]);

  const selectedOptions = userAnswer?.selectedOption || [];
  const showResult = userAnswer !== undefined && selectedOptions.length > 0;

  const optionKeys = Object.keys(question.options);

  const isOptionSelected = (key: string) => {
    if (showResult) {
      return selectedOptions.includes(key);
    }
    return tempSelected.includes(key);
  };

  const checkAnswer = (selected: string[], correct: string[]) => {
    if (selected.length !== correct.length) return false;
    const sortedSelected = [...selected].sort();
    const sortedCorrect = [...correct].sort();
    return sortedSelected.every((val, idx) => val === sortedCorrect[idx]);
  };

  const handleOptionSelect = async (optionKey: string) => {

    // ▼ 先计算出新的 choices 值，避免 stale closure
    let newChoices = '';
    if (isMultipleChoice) {
      const arr = choices ? choices.split(',') : [];
      if (arr.includes(optionKey)) {
        // 已选中则取消选中
        newChoices = arr.filter(k => k !== optionKey).join(',');
      } else {
        arr.push(optionKey);
        newChoices = arr.join(',');
      }
    } else {
      newChoices = String(optionKey);
    }
    setChoices(newChoices);  // ← 用新计算的值更新 state

    const currentIndex = questionDetail.sort;
    if (currentIndex > 1) {
      const newParam = {
        ...questionDetailParam,
        userAnswer: newChoices,  // ← 直接用新值，不等 state 更新
      };
      setQuestionDetailParam(newParam);
      console.log("newParam",newParam)
      const newQuestionDetail = await getExamDetail(newParam);
      useExamStore.getState().setQuestionDetail(newQuestionDetail);

      const newAnswers = await getAnswerCard(exam.examType);
      useExamStore.getState().setAnswerCard(newAnswers);
    }
  };

  const handleSubmit = async() => {
    const currentIndex = questionDetail.sort;
    if (currentIndex > 1) {
      const newParam = {
        ...questionDetailParam,
        userAnswer: choices,
      };
      setQuestionDetailParam(newParam);
          console.log("questionDetailParam",questionDetailParam)
      const newQuestionDetail = await getExamDetail(newParam);
      useExamStore.getState().setQuestionDetail(newQuestionDetail);

     const newAnswers= await getAnswerCard(exam.examType);
     useExamStore.getState().setAnswerCard(newAnswers);
    }
  };

  const handlePrev = async () => {
    const currentIndex = questionDetail.sort;
    if (currentIndex > 1) {
      const newParam = {
        ...questionDetailParam,
        questionNumber: currentIndex - 1,
      };
      setQuestionDetailParam(newParam);
      const newQuestionDetail = await getExamDetail(newParam);
      useExamStore.getState().setQuestionDetail(newQuestionDetail);
    }
  };

  const handleNext = async () => {
    const currentIndex = questionDetail.sort;
    if (currentIndex < exam.questionCount) {
      const newParam = {
        ...questionDetailParam,
        questionNumber: currentIndex + 1,
      };
      setQuestionDetailParam(newParam);
      const newQuestionDetail = await getExamDetail(newParam);
      useExamStore.getState().setQuestionDetail(newQuestionDetail);
    }
  }
  const getOptionClass = (key: string) => {
    const classes = ['option-item'];
    
    if (isOptionSelected(key)) {
      classes.push('selected');
    }
    
    if (showResult) {
      if (question.correctAnswer.includes(key)) {
        classes.push('correct');
      } else if (isOptionSelected(key) && !question.correctAnswer.includes(key)) {
        classes.push('wrong');
      }
    }
    
    return classes.join(' ');
  };

  const formatAnswer = (answer: string[]) => {
    return answer.sort().join('、');
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <span className="question-badge">第 {questionDetail.sort} / {exam.questionCount} 题</span>
        <span className={`question-type ${isMultipleChoice ? 'multiple' : 'single'}`}>
          {questionDetail.questionType}
        </span>
      </div>

      <div className="question-stem">
        <p>{questionDetail.title}</p>
      </div>

      <div className="options-list">
        
        {
       questionDetail.options.map((item, idx) => (

          <button
            key={item.label}
            className={getOptionClass(item.label)}
            onClick={() => !showResult && handleOptionSelect(item.label)}
            disabled={showResult}
          >
            <span className="option-label">{item.label}</span>
            <span className="option-text">{item.value}</span>
            {showResult && question.correctAnswer.includes(item.label) && (
              <CheckCircle size={20} className="option-icon correct-icon" />
            )}
            {showResult && isOptionSelected(item.label) && !question.correctAnswer.includes(item.key) && (
              <XCircle size={20} className="option-icon wrong-icon" />
            )}
          </button>
        ))} 
       
      
      </div>

      {showResult && (
        <div className="result-section">
          <div className="answer-info">
            <div className="answer-item">
              <span className="answer-label">正确答案：</span>
              <span className="answer-value correct">{questionDetail.correctAnswer}</span>
            </div>
            <div className="answer-item">
              <span className="answer-label">你的答案：</span>
             questionDetail.correctAnswer === questionDetail.userAnswer ? (
              <span className="answer-value correct">{questionDetail.userAnswer}</span>
            ) : (
              <span className="answer-value wrong">{questionDetail.userAnswer}</span>
            )
              
            </div>
          </div>

          <div className="explanation-box">
            <div className="explanation-header">
              <Lightbulb size={18} />
              <span>解析</span>
            </div>
            <p className="explanation-text">{questionDetail.analysis}</p>
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        <button
          className="nav-button prev"
          onClick={handlePrev}
          disabled={questionDetail.sort === 1}
        >
          <ChevronLeft size={20} />
          <span>上一题</span>
        </button>
        
        {isMultipleChoice && !showResult && (
          <button
            className="nav-button submit"
            onClick={handleSubmit}
            disabled={tempSelected.length === 0}
          >
            <span>提交回答</span>
          </button>
        )}
        
        <button
          className="nav-button next"
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          <span>下一题</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Question;