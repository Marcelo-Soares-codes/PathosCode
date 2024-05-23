import { AnatType } from "@/DTOs/anat.DTO";
import api from "@/utils/api";

const fetchAnatById = async (id: string): Promise<AnatType> => {
  const response = await api.get(`/anat/id=${id}`);
  const data = await response.data.anat;
  return data;
};

export default fetchAnatById;
