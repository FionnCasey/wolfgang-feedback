import styled from 'styled-components';
import { colours } from '../utils';

const SmallText = styled.span`
  font-size: 12px;
  color: ${colours.greyscale[3]};
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  color: ${colours.secondary[1]};
  margin: 0 0 2px 0;
`;

export {
  Title,
  SmallText
};
