import { IShow, ICreateShow } from "@/types/showsTypes";
import { api } from "../api"

export const showsApi = {
  async test() {
    const response = await api.get('/shows/test');

    return response.data;
  },

  async getShows(): Promise<IShow[]> {
    const response = await api.get('/shows');

    return response.data;
  },

  async createShow(data: ICreateShow) {
    const response = await api.post('/shows', data);
  }
}