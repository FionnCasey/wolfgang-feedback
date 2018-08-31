import React from 'react';
import styled from 'styled-components';
import { colour } from '../../utils';
import Card from '../Card';
import UserBox from '../UserBox';
import ButtonBar from '../ButtonBar';
import TextEditor from '../TextEditor';
import Comment from '../Comment';

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
  padding: 25px;
`;

const Title = styled.div`
  margin-left: 10px;
`;

const Body = styled.div`
  padding: 5px 15px 5px 15px;
  line-height: 1.5;
  margin-top: 5px;
`;

export default ({ post: { title, text, _author, createdAt, _children, _votes } }) => (
  <Wrapper>
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
      <ButtonBar secondary comments={_children} votes={_votes} isPost/>
    </Card>
    <TextEditor />
    {
      _children.map(Comment)
    }
  </Wrapper>
);