"use client";
import "@ant-design/v5-patch-for-react-19";
import QuizSection from "@/components/QuizContainer";
import { useParams } from "next/navigation";
import { getTopicsUnderSubject } from "@/queries/subjects";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { VideoData } from "@/types/queries";
import AddSubTopic from "./add-subtopic";
import { Card } from "antd";

export type OptionData = {
  label: string;
  value: string;
};

const tabList = [
  {
    key: "tab1",
    tab: "Create new sub topic",
  },
  {
    key: "tab2",
    tab: "Upload Quizes to sub topic",
  },
];

export const Client = ({ videosData }: { videosData: VideoData | null }) => {
  const [topics, setTopics] = useState<OptionData[] | null>(null);
  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");
  const params = useParams();

  const contentList: Record<string, React.ReactNode> = {
    tab1: <AddSubTopic topics={topics} videosData={videosData} />,
    tab2: <QuizSection topics={topics} />,
  };

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  const fetchTopicsViaParams = async () => {
    try {
      const response = await getTopicsUnderSubject(params.slug as string);

      if (response.success) {
        setTopics(
          response.data.data.map((topic) => ({
            label: topic.name,
            value: topic._id,
          })),
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopicsViaParams();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-[1.3rem] font-semibold">Add content</h2>{" "}
        <p className="mt-3 font-medium text-slate-500">
          Here you can create and add content to like sub topics , videos,
          quizes to topic
        </p>
      </div>

      <Card
        style={{ width: "100%", marginTop: "30px" }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  );
};
