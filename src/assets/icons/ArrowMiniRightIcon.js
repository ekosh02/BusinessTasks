import {Path, Svg} from 'react-native-svg';

const ArrowMiniRightIcon = ({color = 'gray', size = '24'}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/Svg">
      <Path
        d="M10 16L14 12L10 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowMiniRightIcon;
