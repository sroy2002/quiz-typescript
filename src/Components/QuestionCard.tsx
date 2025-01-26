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
    <div className=" flex flex-col justify-center items-center rosarivo-regular bg-white mx-[20rem]">
      <div className=" flex gap-4 items-center justify-center">
        <p className="text-xl px-8 py-2">
          Question: {questionNo} / {totalQuestions}
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: question }}
          className="text-lg px-8 py-2 rounded-lg"
        />
      </div>
      <div>
        {answers.map((answer) => (
          <div key={answer}>
            <button
              type="button"
              value={answer}
              disabled={!!userAnswer}
              onClick={(e) => callback(e, answer)}
              aria-label={answer}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
