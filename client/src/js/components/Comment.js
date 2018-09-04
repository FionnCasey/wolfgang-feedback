import React from 'react';
import styled from 'styled-components';
import { colour, arrayUtils } from '../utils';
import Card from './Card';
import UserBox from './UserBox';
import IconButton from './IconButton';
import { withContext } from '../context';

const Body = styled.div`
  padding: 5px 15px 5px 15px;
  line-height: 1.5;
  margin-top: 5px;
`;

const List = styled.ul`
  width: 100%;
  list-style-type: none;
  margin: 0 0 5px -5px;
  padding: 0 12px 0 20px;

  @media only screen and (max-width: 768px) {
    padding: 0 6px 0 6px;
  }
`;

const Item = styled.li`
  display: inline-block;
  margin-left: ${props => props.margin};
  position: relative;
  top: ${props => props.top};

  @media only screen and (max-width: 1212px) {
    margin-left: 5px;
  }

  @media only screen and (max-width: 768px) {
    margin-left: 5px;
  }
`;

const Comment = ({
  comment: { _id, text, _author, createdAt, _votes },
  context: { user },
  submitVote
}) => {
  const { up, down } = arrayUtils.countVotes(_votes);
  const userVote = _votes.find(n => n._user === user.id);
  const vote = userVote ? userVote.value : 0;

  return (
    <Card
      fadeIn
      border={`2px solid ${colour.secondary}`}
      borderRadius='2px'
      padding='0'
    >
      <UserBox secondary user={_author} createdAt={createdAt} maxWidth='300px' />
      <Body dangerouslySetInnerHTML={{ __html: text }}/>
      <List>
        <Item margin='-5px'>
          <IconButton icon='like'
            secondary size={20}
            onClick={submitVote} 
            id={_id}
            isPost={false} 
            vote={vote} 
          />
        </Item>
        <Item top='-4px' margin='4px'>{ up }</Item>
        <Item margin='5px'>
          <IconButton icon='dislike'
            secondary size={20}
            onClick={submitVote} 
            id={_id}
            isPost={false} 
            vote={vote} 
          />
        </Item>
        <Item top='-4px' margin='4px'>{ down }</Item>
      </List>
    </Card>
  ); 
};

export default withContext(Comment);