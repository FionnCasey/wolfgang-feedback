import { keyframes } from 'styled-components';

export default {
   fadeIn: keyframes`
      0% {
         opacity: 0;
      }
   `,
   fadeOut: keyframes`
      100% {
         opacity: 0;
      }
   `,
   scale: keyframes`
      0% {
         transform: scale(0);
      }
   `,
   rotate: keyframes`
      100% {
        transform: rotate(360deg);
      }
   `,
   slideFadeLeft: keyframes`
     100% {
       transform: translateX(-10px);
       opacity: 0;
     }
   `,
   pulse: keyframes`
     50% {
       transform: scale(1.15);
     },
     100% {
       transform: scale(1);
     }
   `
 };
