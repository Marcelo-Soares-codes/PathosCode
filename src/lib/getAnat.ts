import { AnatType } from "@/DTOs/anat.DTO";
import api from "../utils/api";

const fetchAnatList = async (): Promise<AnatType[]> => {
  try {
    const response = await api.get("/anat");
    return response.data.anatList;
  } catch (error) {
    console.error("Error fetching anat list:", error);
    return [];
  }
};

export default fetchAnatList;
