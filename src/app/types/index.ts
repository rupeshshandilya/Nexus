export interface Resource {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  userId: string;
  tag: string[];
  createdAt?: string;
  updatedAt?: string;
  user?: {
    userName: string;
  };
}
