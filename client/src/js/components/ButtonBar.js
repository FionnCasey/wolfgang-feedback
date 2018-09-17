import React from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';
import { arrayUtils, colour } from '../utils';
import withContext from '../context';

const Wrapper = styled.ul`
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0 12px 0 12px;
  margin: 10px 0 10px 0;

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

const Comments = styled.div`
  border-radius: 15px;
  font-size: 14px;
  padding: 5px 12px 5px 12px;
  top: -5px;
  position: relative;
  background: ${props => (props.secondary ? colour.secondary : colour.primary)};
  color: ${props => (props.secondary ? colour.grey[0] : '#FFF')};
`;

const ButtonBar = ({ secondary, comments, votes, isPost, context, id, vote }) => {
  const { up, down } = arrayUtils.countVotes(votes);
  const commentCount = arrayUtils.countChildren(comments);
  const { submitVote } = context;

  return (
    <Wrapper>
      <Item margin={isPost && '77%'}>
        <Comments secondary={secondary}>{ commentCount } Comments</Comments>
      </Item>
      <Item margin={isPost ? '30px' : '35%'}>
        <IconButton icon='like' size={20} secondary={secondary} onClick={submitVote} id={id} isPost={true} vote={vote} />
      </Item>
      <Item margin='4px' top='-4px'>
        { up }
      </Item>
      <Item margin='10px'>
        <IconButton icon='dislike' secondary={secondary} size={20} onClick={submitVote} id={id} isPost={true} vote={vote}/>
      </Item>
      <Item margin='4px' top='-4px'>
        { down }
      </Item>
    </Wrapper>
  );
};

export default withContext(ButtonBar);