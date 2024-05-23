import { SampleType } from "@/DTOs/sample.DTO";
import api from "../utils/api";

const fetchSampleList = async (): Promise<SampleType[]> => {
  try {
    const response = await api.get("/sample");
    return response.data.sampleList;
  } catch (error) {
    console.error("Error fetching sample list:", error);
    return [];
  }
};

export default fetchSampleList;
