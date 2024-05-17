import {TextStyle} from 'react-native';
import {setFontStyles} from './../utils';
import {FontGraph} from '../constants';

type GraphType = keyof typeof FontGraph;

interface Font {
  [index: string]: TextStyle;
}

const typography = (graph: GraphType) => {
  const font: Font = {
    [FontGraph.big]: {
      fontSize: 40,
      fontWeight: '500',
    },
    [FontGraph.bigBold]: {
      fontSize: 40,
      fontWeight: '600',
    },
    [FontGraph.headings]: {
      fontSize: 24,
      fontWeight: '500',
    },
    [FontGraph.headingsBold]: {
      fontSize: 24,
      fontWeight: '600',
    },
    [FontGraph.rounded]: {
      fontSize: 18,
      fontWeight: '400',
    },
    [FontGraph.roundedBold]: {
      fontSize: 18,
      fontWeight: '500',
    },
    [FontGraph.content]: {
      fontSize: 16,
      fontWeight: '400',
    },
    [FontGraph.contentBold]: {
      fontSize: 16,
      fontWeight: '500',
    },
    [FontGraph.mediumContent]: {
      fontSize: 14,
      fontWeight: '400',
    },
    [FontGraph.mediumContentBold]: {
      fontSize: 14,
      fontWeight: '500',
    },
  };

  return setFontStyles(font[graph].fontSize, font[graph].fontWeight);
};

export default typography;
