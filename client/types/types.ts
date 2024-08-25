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

export interface BlogInterface {
  banner: { public_id: string; url: string };
  title: string;
  description: string;
  _id: string;
  tag?: string;
  createdAt: string;
  owner?: string;
}

export interface BlogResponse {
  blogs: BlogInterface[];
}

export interface Tag {
  _id: string;
  tag: string;
  count: number;
}
