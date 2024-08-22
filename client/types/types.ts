export interface BlogBanner {
  public_id: string;
  url?: string;
  secure_url?: string;
}

export interface Blog {
  _id: string;
  banner: BlogBanner;
  createdAt: string;
  description: string;
  owner: string;
  tag: string;
  title: string;
  updatedAt: string;
  __v: number;
}

export interface BlogResponse {
  blogs: Blog[];
  success: boolean;
}
