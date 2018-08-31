import { keyframes } from 'styled-components';

export default {
  fadeOut: keyframes`
    100% {
      opacity: 0;
      visibility: hidden;
    }
  `,
  fadeIn: keyframes`
    0% {
      opacity: 0;
    }
  `,
  scale: keyframes`
     100% {
       transform: scale(1.2);
     }
  `,
  raise: keyframes`
     100% {
      transform: translateY(-5px);
     }
  `
};
