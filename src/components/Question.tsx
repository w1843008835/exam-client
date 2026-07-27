import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Question as QuestionType } from '../types';
import { useExamStore } from '../store/examStore';
import './Question.css';

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

  const handleOptionSelect = (optionKey: string) => {
    if (showResult) return;
    
    if (isMultipleChoice) {
      setTempSelected(prev => {
        if (prev.includes(optionKey)) {
          return prev.filter(key => key !== optionKey);
        } else {
          return [...prev, optionKey];
        }
      });
    } else {
      const newSelected = [optionKey];
      const isCorrect = checkAnswer(newSelected, question.correctAnswer);
      addUserAnswer(question.id, newSelected, isCorrect);
    }
  };

  const handleSubmit = () => {
    if (tempSelected.length === 0) return;
    const isCorrect = checkAnswer(tempSelected, question.correctAnswer);
    addUserAnswer(question.id, tempSelected, isCorrect);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

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
      <div key={idx}>
        {item.label}:{item.value}
     
      </div>
    ))
        /* {questionDetail.options.map((item) => (
          <button
            key={item.key}
            className={getOptionClass(item.key)}
            onClick={() => !showResult && handleOptionSelect(item.key)}
            disabled={showResult}
          >
            <span className="option-label">{item.key}</span>
            <span className="option-text">{item[item.key]}</span>
            {showResult && question.correctAnswer.includes(item.key) && (
              <CheckCircle size={20} className="option-icon correct-icon" />
            )}
            {showResult && isOptionSelected(item.key) && !question.correctAnswer.includes(item.key) && (
              <XCircle size={20} className="option-icon wrong-icon" />
            )}
          </button>
        ))} */}
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
          disabled={currentQuestionIndex === 0}
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