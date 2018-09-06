import React from 'react';
import styled from 'styled-components';
import { colour, arrayUtils } from '../../utils';
import Card from '../Card';
import UserBox from '../UserBox';
import ButtonBar from '../ButtonBar';
import TextEditor from '../TextEditor';
import Comment from '../Comment';
import PostNav from './PostNav';

const Header = styled.div`
  border-radius: 1px 2px 0 0;
  height: 50px;
  color: ${colour.grey[0]};
  background: ${colour.secondary};
  margin: 0;
  margin-top: -2px;
  width: 100%;
  align-items: center;
  display: flex;
  padding: 10px 15px 10px 15px;
`;

const Wrapper = styled.div`
  padding: 10px 25px 25px 25px;
`;

const Title = styled.div`
  margin-left: 10px;
`;

const Body = styled.div`
  padding: 5px 15px 5px 15px;
  line-height: 1;
  margin-top: 5px;

  p {
    margin: 0;
  }
`;

const getUserVoteValue = (id, votes) => {
  const vote = votes.filter(n => n._user === id)[0];
  if (vote) {
    return vote.value;
  }
  return 0;
};

export default ({ 
  submitComment, submitVote, back,
  post: { _id, title, text, _author, createdAt, _children, _votes }
}) => (
  <Wrapper>
    <PostNav back={back} />
   <Card
      fadeIn
      border={`2px solid ${colour.secondary}`}
      borderRadius='1px'
      padding='0'
    >
      <Header
        background={colour.secondary}
      >
        &#9679;<Title>{ title }</Title>
      </Header>
      <UserBox secondary user={_author} createdAt={createdAt} maxWidth='300px' />
      <Body dangerouslySetInnerHTML={{ __html: text }}/>
      <ButtonBar
        id={_id}
        secondary
        comments={_children}
        votes={_votes} 
        isPost 
        submitVote={submitVote}
        vote={getUserVoteValue(_author._id, _votes)}
      />
    </Card>
    <TextEditor submitComment={submitComment} id={_id}/>
    {
      _children.sort(arrayUtils.sortModes.byMostRecent).map(n => (
        <Comment
          key={`comment-${n._id}`}
          comment={n}
          submitVote={submitVote}
        />
      ))
    }
  </Wrapper>
);