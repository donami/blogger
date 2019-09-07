import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  dataId: string;
  data: {
    title: string;
    content: string;
  };
};
const PostListItem: React.FC<Props> = ({ dataId, data }) => {
  const { title } = data;
  return (
    <div>
      <Link to={`/post/${dataId}`}>{title}</Link>
    </div>
  );
};

export default PostListItem;
