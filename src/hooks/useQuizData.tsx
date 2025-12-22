import { deleteQuestionFromQuiz, getAvailableQuiz } from "@/queries/quizez";
import { QuizProps, QuizQuestion } from "@/types";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export function useQuizData() {
  const [quizObj, setQuizObj] = useState<QuizProps>();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchQuizData = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await getAvailableQuiz(id);
      if (response.success) {
        setQuizObj(response.data.data);
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      toast.error("Failed to fetch existing quiz");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteQuizQuestion = async (quizId: string, questionId: string) => {
    setIsDeleting(true);
    try {
      const response = await deleteQuestionFromQuiz(quizId, questionId);
      if (response.success) {
        toast.success(response.data.message);
        if (quizObj?.subTopicId) {
          fetchQuizData(quizObj.subTopicId);
        }
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    quizObj,
    fetchQuizData,
    loading,
    isDeleting,
    deleteQuizQuestion,
  };
}
