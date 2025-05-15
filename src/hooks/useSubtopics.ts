import { OptionData } from "@/features/admin/add-content-to-subject/Client";
import { getSubtopics } from "@/queries/subtopics";
import { useState, useCallback } from "react";
import { toast } from "sonner"; // or your toast lib

export function useSubtopics() {
  const [subtopics, setSubtopics] = useState<OptionData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSubtopics = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await getSubtopics(id);

      if (response.success) {
        setSubtopics(
          response.data.data.map((subtopic) => ({
            label: subtopic.name,
            value: subtopic._id,
          })),
        );
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching subtopics:", error);
      toast.error("Failed to fetch subtopics");
    } finally {
      setLoading(false);
    }
  }, []);

  return { subtopics, fetchSubtopics, loading };
}
