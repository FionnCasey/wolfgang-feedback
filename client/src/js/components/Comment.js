import React from 'react';
import styled from 'styled-components';
import { colour } from '../utils';
import Card from './Card';
import UserBox from './UserBox';

const Body = styled.div`
  padding: 5px 15px 5px 15px;
  line-height: 1.5;
  margin-top: 5px;
`;

export default ({ _id, text, _author, createdAt, _votes }) => (
  <Card
    key={_id}
    fadeIn
    border={`2px solid ${colour.secondary}`}
    borderRadius='2px'
    padding='0'
  >
    <UserBox secondary user={_author} createdAt={createdAt} maxWidth='300px' />
    <Body dangerouslySetInnerHTML={{ __html: text }}/>
  </Card>
);