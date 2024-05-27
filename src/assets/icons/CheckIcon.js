import {Path, Svg} from 'react-native-svg';

const CheckIcon = ({color = 'gray', size = '14'}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M11.6663 3.5L5.24967 9.91667L2.33301 7"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CheckIcon;
