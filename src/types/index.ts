export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor";
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  published_at: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PostFormData {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: File;
  status: "draft" | "published";
}
