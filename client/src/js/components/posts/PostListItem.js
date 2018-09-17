import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card';
import { GridItem } from 'styled-grid-responsive';
import { colour, animation } from '../../utils';
import ButtonBar from '../ButtonBar';
import UserBox from '../UserBox';
import withContext from '../../context';

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
  line-height: 1.2;
  height: 100px;
  overflow: hidden;

  p {
    margin: 0;
  }

  @media only screen and (max-width: 768px) {
    height: 120px;
  }

  @media only screen and (max-width: 640px) {
    height: 160px;
  }
`;

const Wrapper = styled.div`
  animation: ${props => props.animation} .2s ease-in-out;
  animation-fill-mode: forwards;
`;

const Title = styled.div`
  margin-left: 10px;
`;

class PostListItem extends Component {
  state = {
    mouseover: false
  };

  setMouseOver = mouseover => {
    this.setState({ mouseover });
  };

  render() {
    const { 
      open, submitVote, index,
      post: { _id, title, text, _author, createdAt, _children, _votes },
      context: { user }
    } = this.props;

    const animate = this.state.mouseover && animation.raise;
 
    const userVote = _votes.find(n => n._user === user.id);
    const vote = userVote ? userVote.value : 0;

    return (
      <GridItem media={{ phone: 1, tablet: 1/2 }} col={1/3}>
        <Wrapper animation={animate} onMouseOver={() => this.setMouseOver(true)} onMouseOut={() => this.setMouseOver(false)}>
          <Card
            fadeIn
            pointer
            border={getBorder(index)}
            borderRadius='1px'
            padding='0'
            boxShadow='0 2px 4px 0 rgba(0,0,0,0.2)'
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
            <ButtonBar
              secondary={index % 2 === 0}
              vote={vote}
              comments={_children} 
              votes={_votes} 
              submitVote={submitVote} 
              id={_id}
            />
          </Card>
        </Wrapper>
      </GridItem>
    );
  }
}

export default withContext(PostListItem);