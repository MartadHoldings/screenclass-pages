import { QuizAction, QuizProps } from "@/types";

export const quizInitialState: QuizProps = {
  title: "",
  duration: 0,
  isPublished: true,
  subTopicId: "",
  questions: [],
};

export function quizReducer(state: QuizProps, action: QuizAction): QuizProps {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_SUBTOPIC_ID":
      return { ...state, subTopicId: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "ADD_QUESTION":
      return {
        ...state,
        questions: [...state.questions, action.payload], // Adds new question to the end
      };
    case "REMOVE_QUESTION":
      return {
        ...state,
        questions: state.questions.filter((q, index) => q.id !== action.index),
      };
    case "RESET_FORM":
      return quizInitialState;
    default:
      return state;
  }
}
