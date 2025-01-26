import React from "react";
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>, answer: string) => void;
  userAnswer: AnswerObject | undefined;
  questionNo: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQuestions,
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className=" flex flex-col justify-center items-center rosarivo-regular bg-white w-[28%] py-4 rounded-2xl">
        <div className=" flex flex-col gap-4 items-center justify-center  ">
          <p className="text-xl mt-5 montserrat-400">
            Question: {questionNo} / {totalQuestions}
          </p>
          <p
            dangerouslySetInnerHTML={{ __html: question }}
            className="text-lg px-8 py-2 font-bold text-center"
          />
        </div>
        <div className="w-full px-8">
          {answers.map((answer) => {
            let buttonClasses = " border-2 py-3 px-4 w-full rounded-lg transition-all duration-300 ease-in-out";
            if(userAnswer){
              if(answer === userAnswer.correctAnswer){
                buttonClasses += " bg-green-500 text-white border-green-500";
              }
              else if(answer === userAnswer.answer && !userAnswer.correct){
                buttonClasses += " bg-red-500 text-white border-red-500"; 
              }
              else{
                buttonClasses +=
                " border-gray-300 bg-gray-300 disabled:transition-none";
              }
            }
            else{
              buttonClasses+="border-blue-400 hover:bg-cyan-500 hover:text-white";
            }
            return (
              <div key={answer} className="w-full my-3 ">
                <button
                  type="button"
                  value={answer}
                  disabled={!!userAnswer}
                  onClick={(e) => callback(e, answer)}
                  aria-label={answer}
                  className={buttonClasses}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
