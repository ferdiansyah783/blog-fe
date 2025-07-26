import api from "../lib/axios";

type Post = {
  title: string;
  content: string;
  excerpt?: string;
  status: "draft" | "published";
};

export const adminApi = {
  async getPosts(page: number = 1, search: string = "") {
    const response = await api.get(`/api/admin/posts?page=${page}&search=${search}`);

    return response.data;
  },

  async getPost(postId: number) {
    const response = await api.get(`/api/admin/posts/${postId}`);

    return response.data;
  },

  async createPost(data: Post) {
    const response = await api.post(`/api/admin/posts`, data);

    return response.data;
  },

  async updatePost(id: number, data: Post) {
    const response = await api.put(`/api/admin/posts/${id}`, data);

    return response.data;
  },

  async deletePost(id: number) {
    const response = await api.delete(`/api/admin/posts/${id}`);

    return response.data;
  },

  async getPostsCount(status: string) {
    const response = await api.get(`/api/admin/summary/count/${status}`)

    return response.data
  }
};
