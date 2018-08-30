import React from 'react';
import styled from 'styled-components';
import Card from '../Card';
import { GridItem } from 'styled-grid-responsive';
import { colour } from '../../utils';
import ButtonBar from '../ButtonBar';
import UserBox from '../UserBox';

const MAX_CHARS_HEAD = 80;
const MAX_CHARS_BODY = 160;



const clipText = (text, isHeader = false) => {
  if (isHeader) {
    return text.length > MAX_CHARS_HEAD ? `${text.slice(0, MAX_CHARS_HEAD - 3)} ...` : text;
  } else {
    return text.length > MAX_CHARS_BODY ? `${text.slice(0, MAX_CHARS_BODY - 3)} ... read more` : text;
  }
};

const getBorder = i => i % 2 === 0 ? `2px solid ${colour.secondary}` : `2px solid ${colour.primary}`;

const Header = styled.div`
  border-radius: 1px 2px 0 0;
  height: 50px;
  color: ${props => props.darkText ? colour.grey[0] : '#fff'};
  background: ${props => props.background || 'white'};
  margin: 0;
  margin-top: -2px;
  width: 100%;
  align-items: center;
  display: flex;
  padding: 10px 15px 10px 15px;
`;

const Body = styled.div`
  padding: 5px 15px 5px 15px;
  line-height: 1.5;
  height: 100px;

  @media only screen and (max-width: 768px) {
    height: 120px;
  }

  @media only screen and (max-width: 640px) {
    height: 160px;
  }
`;

const Title = styled.div`
  margin-left: 10px;
`;

export default ({ open, index, post: { _id, title, text, _author, createdAt, _children, _votes } }) => (
  <GridItem media={{ phone: 1, tablet: 1/2 }} col={1/3}>
    <Card
      border={getBorder(index)}
      borderRadius='1px'
      padding='0'
      boxShadow='0 1px 2px 0 rgba(0,0,0,0.2)'
      onClick={open}
    >
      <Header
        background={index % 2 === 0 ? colour.secondary : colour.primary}
        darkText={index % 2 === 0}
      >
        &#9679;<Title>{ clipText(title, true) }</Title>
      </Header>
      <UserBox user={_author} secondary={index % 2 === 0} createdAt={createdAt} />
      <Body dangerouslySetInnerHTML={{ __html: clipText(text) }}/>
      <ButtonBar secondary={index % 2 === 0} comments={_children} votes={_votes}/>
    </Card>
  </GridItem>
);