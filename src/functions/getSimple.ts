import axios from "axios";

type ApiResponse = {
  success: boolean;
  status: number;
  sampleList: { id: number; name: string }[];
};

const fetchSampleList = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      "http://localhost:3000/api/sample"
    );
    return response.data.sampleList;
  } catch (error) {
    console.error("Error fetching sample list:", error);
    return [];
  }
};
