import React from 'react';
import styled from 'styled-components';

const ProfileImageWrapper = styled.img`
  border-radius: 50%;
  height: 25px;
`;

export default ({ children }) => {
  return <ProfileImageWrapper src={children} />;
}
