import { SampleType } from "@/DTOs/sample.DTO";
import api from "@/utils/api";

const fetchSampleById = async (id: string): Promise<SampleType> => {
  const response = await api.get(`/sample/id=${id}`);
  const data = await response.data.sample;
  return data;
};

export default fetchSampleById;
