import React, { useContext } from 'react';
import DefaultLayout from '../components/layout/default-layout';
import { AppContext } from '../context/app-context';
import CreatePost from '../components/create-post';
import PostList from '../components/post-list/post-list';
import { CreatePostInput } from '../models/interfaces';

type Props = {};
const PostPage: React.FC<Props> = () => {
  const state = useContext(AppContext);

  const handleCreatePost = async (data: CreatePostInput) => {
    await state.postStore.createPost(data);
  };

  return (
    <DefaultLayout>
      <h3>Posts</h3>
      <CreatePost onSubmit={handleCreatePost} />
      <PostList />
    </DefaultLayout>
  );
};

export default PostPage;
