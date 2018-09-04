import React from 'react';
import styled from 'styled-components';
import { colour } from '../utils';
import { Lightbulb } from 'styled-icons/fa-regular';
import { Info, Filter } from 'styled-icons/fa-solid';

const Wrapper = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: space-evenly;
`;

const Button = styled.div`
  background: ${colour.grey[1]};
  color: #FFF;
  letter-spacing: 2px;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  display: inline-block;
  width: 200px;
  text-align: center;
  border-radius: 27px;
  transition: all .3s ease-in-out;

  &:hover {
    background: ${colour.primary};
  }
`;

const IdeaIcon = styled(Lightbulb)`
  position: relative;
  top: 2px;
  left: -12px;
`;

const InfoIcon = styled(Info)`
  position: relative;
  top: 2px;
  left: -12px;
`;

const FilterIcon = styled(Filter)`
  position: relative;
  top: 2px;
  left: -12px;
`;

export default props => (
  <Wrapper>
    <Button>
      <IdeaIcon size={22}/>
      POST IDEA
    </Button>
    <Button>
      <InfoIcon size={20}/>
      LOW-DOWN
    </Button>
    <Button>
      <FilterIcon size={20}/>
      FILTER
    </Button>
  </Wrapper>
);
