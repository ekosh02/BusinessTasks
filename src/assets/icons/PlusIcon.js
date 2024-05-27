import { Path, Svg } from "react-native-svg";

 const PlusIcon = ({color = 'gray', size = '24', strokeWidth = '1.5'}) => {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/Svg">
        <Path
          d="M6.34314 12H17.6568"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 6.34315V17.6569"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };

  export default PlusIcon