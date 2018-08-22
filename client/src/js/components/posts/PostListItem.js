import React from 'react';
import styled from 'styled-components';
import { GridItem } from 'styled-grid-responsive';

const Wrapper = styled.div`

`;

export default ({ post }) => (
  <GridItem media={{ phone: 1 }} col={1/3}>
    <Wrapper>
      <h1>{ post.title }</h1>
    </Wrapper>
  </GridItem>
);