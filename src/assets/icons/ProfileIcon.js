import {Path, Svg} from 'react-native-svg';

export const ProfileIcon = ({
  active = false,
  activeColor = '#00f',
  passiveColor = '#666',
}) => {
  if (active) {
    return (
      <Svg
        width="34"
        height="34"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.7561 5.55585C21.8306 7.63032 21.8306 10.9937 19.7561 13.0682C17.6817 15.1426 14.3183 15.1426 12.2438 13.0682C10.1694 10.9937 10.1694 7.63032 12.2438 5.55585C14.3183 3.48138 17.6817 3.48138 19.7561 5.55585Z"
          fill={activeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 18.6772C22.072 18.6772 28 21.2999 28 25.3332V26.6666C28 27.4026 27.4027 27.9999 26.6667 27.9999H5.33333C4.59733 27.9999 4 27.4026 4 26.6666V25.3332C4 21.2986 9.928 18.6772 16 18.6772Z"
          fill={activeColor}
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
        d="M19.7561 5.55585C21.8306 7.63032 21.8306 10.9937 19.7561 13.0682C17.6817 15.1426 14.3183 15.1426 12.2438 13.0682C10.1694 10.9937 10.1694 7.63032 12.2438 5.55585C14.3183 3.48138 17.6817 3.48138 19.7561 5.55585"
        stroke={passiveColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 18.6772C22.072 18.6772 28 21.2999 28 25.3332V26.6666C28 27.4026 27.4027 27.9999 26.6667 27.9999H5.33333C4.59733 27.9999 4 27.4026 4 26.6666V25.3332C4 21.2986 9.928 18.6772 16 18.6772"
        stroke={passiveColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
