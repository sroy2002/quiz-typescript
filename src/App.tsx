import React, { useState } from "react";
import { QuestionState, Difficulty, fetchQuizQuestions } from "./API";
import QuestionCard from "./Components/QuestionCard";
import "./App.css";

const TOTAL = 10;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameOver] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL, Difficulty.EASY));
  console.log(questions);
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL,
      Difficulty.EASY
    )
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false)
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameover){
      //user answers
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[number].correct_answer===answer;
      //add score if correct
      if(correct) {
        setScore(prev=>prev+1);
      }
      //save answer in the array for the user answers
      const answerObject = {
        question: questions[number].question,
       answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev)=>[...prev,answerObject]);
    }



  };
  const nextQuestion = () => {
    const nextQuestion = number+1;
    if(nextQuestion==TOTAL){
      setGameOver(true);
    }
    else{
      setNumber(nextQuestion);
    }
  };
  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameover || userAnswers.length===TOTAL ? (<button className="start" onClick={startTrivia}>
        Start
      </button>) : null}
     {!gameover ? ( <p>Score: {score}</p>):null}
     {loading ? <p>Loading Questions...</p> : null}
     {!loading && !gameover && (<QuestionCard 
      questionNo={number+1}
      totalQuestions={TOTAL}
      question={questions[number].question}
      answers={questions[number].answer}
      userAnswer={userAnswers ? userAnswers[number]:undefined}
      callback={checkAnswer}
       />)}
    { !loading &&!gameover && userAnswers.length===number+1 && number!=TOTAL-1 && 
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>}
    </div>
  );
}

export default App;
