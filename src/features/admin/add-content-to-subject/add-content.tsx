import { getVideos } from "@/queries/video";
import { Client } from "./Client";

export const AddContent = async () => {
  const response = await getVideos();

  return (
    <>
      <Client videosData={response.success ? response.data : null} />
    </>
  );
};
