import api from "../lib/axios";

export const postsApi = {
  async getPosts() {
    const response = await api.get("/api/v1/posts");

    return response.data;
  },


  async getPost(slug: string) {
    const response = await api.get(`/api/v1/posts/${slug}`);

    return response.data;
  }
};
