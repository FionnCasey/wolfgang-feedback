import React from 'react';
import styled from 'styled-components';
import { SmallText } from './Generics';
import { formatDate, capitaliseWord, colours, sumVotes } from '../utils';
import UserIcon from './UserIcon';

const Wrapper = styled.div`
  margin: 0 0 5px 0;
  padding: 0;
  display: inline-block;
  width: 100%;
  color: ${colours.grey_2};
`;

export default ({ username, votes, createdAt }) => (
  <Wrapper>
    <UserIcon />
    { capitaliseWord(username) }
    <SmallText>{ sumVotes(votes) } points</SmallText>
    <SmallText>{ formatDate(createdAt) }</SmallText>
  </Wrapper>
);
