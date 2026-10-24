import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Question as QuestionType } from '../types';
import { useExamStore } from '../store/examStore';
import './Question.css';
import { getAnswerCard } from '@/service/examService';
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
    fetchQuestionDetail,
  } = useExamStore();

   const [questionDetailParam, setQuestionDetailParam] = useState<QuestionDetailDto>(() => ({
    userId: Number(localStorage.getItem(USER_ID)),
    examType: exam.examType,
    userAnswer: null,
    questionNumber: 1,
  }));

  const [choices, setChoices] = useState<string>('');

  const userAnswer = userAnswers.find(a => a.questionId === questionDetail.questionId);
  const isMultipleChoice = questionDetail.questionType === '多选题';

  // 切换题目时：恢复该题本地已保存的答案
  useEffect(() => {
    setChoices(userAnswer ? userAnswer.selectedOption.join(',') : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionDetail.questionId]);

  // 以后端返回的 userAnswer 为准：null/undefined/空 → false（未作答），有值 → true
  const showResult = Boolean(questionDetail.userAnswer);

  // 结果态高亮后端返回的答案，与 showResult 保持同源
  const savedAnswerArr = questionDetail.userAnswer
    ? questionDetail.userAnswer.split(',').filter(Boolean)
    : [];

  const optionKeys = Object.keys(question.options);

  const currentChoices = choices ? choices.split(',') : [];
  const isOptionSelected = (key: string) => {
    if (showResult) {
      return savedAnswerArr.includes(key);
    }
    return currentChoices.includes(key);
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

    const selectedArr = newChoices ? newChoices.split(',') : [];
    const correctArr = (questionDetail.correctAnswer || '').split(',').filter(Boolean);
    const isCorrect = checkAnswer(selectedArr, correctArr);

    // ▼ 每次点击都更新 store 中的 userAnswers（已答过则覆盖，未答过则追加）
    addUserAnswer(questionDetail.questionId, selectedArr, isCorrect);

    // 多选题：点击选项只记录本地，等【提交回答】时才提交到后端
    if (isMultipleChoice) return;

    const currentIndex = questionDetail.sort;
    if (currentIndex > 1) {
      const newParam = {
        ...questionDetailParam,
        userAnswer: newChoices,  // ← 直接用新值，不等 state 更新
      };
      setQuestionDetailParam(newParam);
      console.log("newParam",newParam)
      await fetchQuestionDetail(newParam);

      const newAnswers = await getAnswerCard(exam.examType);
      useExamStore.getState().setAnswerCard(newAnswers);
    }
  };

  // 多选题点击"提交回答"：确认最终答案并出结果
  const handleSubmit = async() => {
    if (!choices) return;

    const selectedArr = choices.split(',');
    const correctArr = (questionDetail.correctAnswer || '').split(',').filter(Boolean);
    const isCorrect = checkAnswer(selectedArr, correctArr);

    addUserAnswer(questionDetail.questionId, selectedArr, isCorrect);

    // 提交答案并刷新题目详情：后端返回 userAnswer 后 showResult 自动变为 true
    const newParam = {
      ...questionDetailParam,
      questionNumber: questionDetail.sort,
      userAnswer: choices,
    };
    setQuestionDetailParam(newParam);
    await fetchQuestionDetail(newParam);

    const newAnswers = await getAnswerCard(exam.examType);
    useExamStore.getState().setAnswerCard(newAnswers);
  };

  const handlePrev = async () => {
    const currentIndex = questionDetail.sort;
    if (currentIndex > 1) {
      const newParam = {
        ...questionDetailParam,
        questionNumber: currentIndex - 1,
         userAnswer:null
      };
      setQuestionDetailParam(newParam);
      await fetchQuestionDetail(newParam);
    }
  };

  const handleNext = async () => {
    const currentIndex = questionDetail.sort;
    if (currentIndex < exam.questionCount) {
      const newParam = {
        ...questionDetailParam,
        questionNumber: currentIndex + 1,
        userAnswer:null
      };
      setQuestionDetailParam(newParam);
      await fetchQuestionDetail(newParam);
    }
  }
  const getOptionClass = (key: string) => {
    const classes = ['option-item'];
    
    if (isOptionSelected(key)) {
      classes.push('selected');
    }
    
    if (showResult) {
      if (questionDetail.correctAnswer.includes(key)) {
        classes.push('correct');
      } else if (isOptionSelected(key) && !questionDetail.correctAnswer.includes(key)) {
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
            {showResult && questionDetail.correctAnswer.includes(item.label) && (
              <CheckCircle size={20} className="option-icon correct-icon" />
            )}
            {showResult && isOptionSelected(item.label) && !questionDetail.correctAnswer.includes(item.label) && (
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
              {
                questionDetail.correctAnswer === questionDetail.userAnswer ? (
              <span className="answer-value correct">{questionDetail.userAnswer}</span>
            ) : (
              <span className="answer-value wrong">{questionDetail.userAnswer}</span>
            )
              }           
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
            disabled={!choices}
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