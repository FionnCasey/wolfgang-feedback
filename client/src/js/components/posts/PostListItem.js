import React from 'react';
import styled from 'styled-components';
import Card from '../Card';
import { GridItem } from 'styled-grid-responsive';
import { colour } from '../../utils';

const MAX_CHARS_HEAD = 40;
const MAX_CHARS_BODY = 80;

const clipText = (text, isHeader = false) => {
  if (isHeader) {
    return text.length > MAX_CHARS_HEAD ? `${text.slice(0, MAX_CHARS_HEAD - 3)}...` : text;
  } else {
    return text.length > MAX_CHARS_BODY ? `${text.slice(0, MAX_CHARS_BODY - 3)}...` : text;
  }
};

const getBorder = i => i % 2 === 0 ? `2px solid ${colour.primary}` : `2px solid ${colour.secondary}`;

const Header = styled.div`
  border-radius: 3px 3px 0 0;
  height: 40px;
  color: ${props => props.darkText ? '#333' : '#fff'};
  background: ${props => props.background || 'white'};
  margin: 0;
  margin-top: -2px;
  width: 100%;
`;

const Body = styled.p`

`;

const List = styled.ul`
  margin: 0;
`;

export default ({ index, post: { _id, title, text, user, createdAt, comments, votes } }) => (
  <GridItem media={{ phone: 1/2 }} col={1/3}>
    <Card
      border={getBorder(index)}
      borderRadius='3px'
      margin='0 20px 20px 20px'
      padding='0'
      boxShadow='0 2px 4px 0 rgba(0,0,0,0.3)'
    >
      <Header
        background={index % 2 === 0 ? colour.primary : colour.secondary}
        darkText={index % 2 !== 0}
      >
        <List><li>{ clipText(title, true) }</li></List>
      </Header>
      <Body>
        { clipText(text) }
      </Body>
    </Card>
  </GridItem>
);