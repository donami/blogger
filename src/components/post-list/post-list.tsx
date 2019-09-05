import React, { useContext } from 'react';
import { Styled } from './post-list.styles';
import { AppContext } from '../../context/app-context';
import { observer } from 'mobx-react';
import PostListItem from './post-list-item';

type Props = {};
const PostList: React.FC<Props> = () => {
  const { postStore } = useContext(AppContext);

  return (
    <Styled.PostList>
      <h3>PostList</h3>

      {postStore.posts.map((doc: any) => (
        <PostListItem key={doc.id} dataId={doc.id} data={doc.data()} />
      ))}
    </Styled.PostList>
  );
};

export default observer(PostList);
