import {Path, Svg} from 'react-native-svg';

export const TaskIcon = ({
  active = false,
  activeColor = '#00f',
  passiveColor = '#666',
}) => {
  if (active) {
    return (
      <Svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.2587 29.3334H6.81467C5.26 29.3334 4 28.0734 4 26.5187V12.4441C4 10.8894 5.26 9.62939 6.81467 9.62939H15.2587C16.8133 9.62939 18.0733 10.8894 18.0733 12.4441V26.5187C18.0747 28.0734 16.8133 29.3334 15.2587 29.3334Z"
          fill={activeColor}
          stroke={activeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.0027 9.62936L14.308 4.75336C14.7107 3.25203 16.2547 2.36003 17.756 2.76269L25.912 4.94803C27.4134 5.35069 28.3054 6.89336 27.9027 8.39603L24.26 21.9907C23.8574 23.492 22.3147 24.384 20.8134 23.9814L18.0734 23.248"
          stroke={activeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2587 29.3334H6.81467C5.26 29.3334 4 28.0734 4 26.5187V12.4441C4 10.8894 5.26 9.62939 6.81467 9.62939H15.2587C16.8133 9.62939 18.0733 10.8894 18.0733 12.4441V26.5187C18.0747 28.0734 16.8133 29.3334 15.2587 29.3334Z"
        stroke={passiveColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.0027 9.62936L14.308 4.75336C14.7107 3.25203 16.2547 2.36003 17.756 2.76269L25.912 4.94803C27.4133 5.35069 28.3053 6.89336 27.9027 8.39603L24.26 21.9907C23.8573 23.492 22.3147 24.384 20.8133 23.9814L18.0733 23.248"
        stroke={passiveColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TaskIcon;
