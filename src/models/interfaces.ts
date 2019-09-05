export type Post = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
};

export type CreatePostInput = Omit<Post, 'id'>;
