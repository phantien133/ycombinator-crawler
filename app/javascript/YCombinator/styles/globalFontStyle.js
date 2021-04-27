import { css } from 'styled-components';

import HelveticaNeueLightTtf from './fonts/HelveticaNeue-Light.ttf';
import HelveticaNeueLightEot from './fonts/HelveticaNeue-Light.eot';
import HelveticaNeueLightWoff from './fonts/HelveticaNeue-Light.woff';

import HelveticaNeueMediumTtf from './fonts/HelveticaNeue-Medium.ttf';
import HelveticaNeueMediumEot from './fonts/HelveticaNeue-Medium.eot';
import HelveticaNeueMediumWoff from './fonts/HelveticaNeue-Medium.woff';

import HelveticaNeueUltraLightTtf from './fonts/HelveticaNeue-UltraLight.ttf';
import HelveticaNeueUltraLightEot from './fonts/HelveticaNeue-UltraLight.eot';
import HelveticaNeueUltraLightWoff from './fonts/HelveticaNeue-UltraLight.woff';

export default css`
  @font-face {
    font-family: 'HelveticaNeue-Light';
    font-style: normal;
    font-weight: normal;
    src: url(${HelveticaNeueLightTtf}) format('ttf'),
         url(${HelveticaNeueLightEot}) format('eot'),
         url(${HelveticaNeueLightWoff}) format('woof2');
  }

  @font-face {
    font-family: 'HelveticaNeue-Medium';
    font-style: normal;
    font-weight: normal;
    src: url(${HelveticaNeueMediumTtf}) format('ttf'),
         url(${HelveticaNeueMediumEot}) format('eot'),
         url(${HelveticaNeueMediumWoff}) format('woof2');
  }

  @font-face {
    font-family: 'HelveticaNeue-UltraLight';
    font-style: normal;
    font-weight: normal;
    src: url(${HelveticaNeueUltraLightTtf}) format('ttf'),
         url(${HelveticaNeueUltraLightEot}) format('eot'),
         url(${HelveticaNeueUltraLightWoff}) format('woof2');
  }
`;
