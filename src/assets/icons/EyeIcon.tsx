import React from 'react';
import {Path, Svg} from 'react-native-svg';

interface EyeIconProps {
  size?: string;
  color?: string;
  open?: any;
}

const EyeIcon = ({size = '24', color = 'gray', open = false}: EyeIconProps) =>
  open ? (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 8.11177C11.632 8.11752 11.2667 8.17598 10.9153 8.28538C11.0778 8.57125 11.1644 8.89403 11.1667 9.22288C11.1667 9.47823 11.1164 9.73108 11.0187 9.96699C10.9209 10.2029 10.7777 10.4173 10.5971 10.5978C10.4166 10.7784 10.2022 10.9216 9.96632 11.0193C9.73041 11.117 9.47757 11.1673 9.22222 11.1673C8.89336 11.165 8.57059 11.0785 8.28471 10.9159C8.05917 11.6982 8.08546 12.5315 8.35985 13.298C8.63425 14.0644 9.14284 14.7251 9.8136 15.1865C10.4843 15.6478 11.2832 15.8864 12.0971 15.8685C12.911 15.8505 13.6987 15.577 14.3484 15.0865C14.9982 14.5961 15.4772 13.9137 15.7176 13.1359C15.958 12.3581 15.9475 11.5244 15.6877 10.7528C15.428 9.98131 14.932 9.31107 14.2702 8.83706C13.6083 8.36306 12.8141 8.10931 12 8.11177ZM21.8792 11.4937C19.9962 7.81975 16.2684 5.33398 12 5.33398C7.73159 5.33398 4.00276 7.82149 2.12081 11.4941C2.04138 11.6512 2 11.8248 2 12.0008C2 12.1769 2.04138 12.3505 2.12081 12.5076C4.0038 16.1816 7.73159 18.6673 12 18.6673C16.2684 18.6673 19.9972 16.1798 21.8792 12.5073C21.9586 12.3501 22 12.1765 22 12.0005C22 11.8244 21.9586 11.6508 21.8792 11.4937ZM12 17.0007C8.57465 17.0007 5.43436 15.0909 3.73853 12.0007C5.43436 8.91038 8.5743 7.00065 12 7.00065C15.4257 7.00065 18.5656 8.91038 20.2615 12.0007C18.566 15.0909 15.4257 17.0007 12 17.0007Z"
        fill={color}
      />
    </Svg>
  ) : (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.6989 16.0475C20.8252 14.15 22.0002 12 22.0002 12C22.0002 12 18.2502 5.125 12.0002 5.125C10.7997 5.12913 9.61276 5.37928 8.5127 5.86L9.4752 6.82375C10.2845 6.52894 11.1389 6.3771 12.0002 6.375C14.6502 6.375 16.8489 7.835 18.4602 9.44625C19.2356 10.2259 19.9308 11.0814 20.5352 12C20.4627 12.1088 20.3827 12.2288 20.2914 12.36C19.8727 12.96 19.2539 13.76 18.4602 14.5538C18.2539 14.76 18.0389 14.9638 17.8139 15.1613L18.6989 16.0475Z"
        fill={color}
      />
      <Path
        d="M16.1212 13.469C16.4002 12.6888 16.4518 11.8454 16.2702 11.037C16.0885 10.2286 15.6811 9.48839 15.0952 8.9025C14.5093 8.31662 13.7691 7.90915 12.9607 7.72752C12.1523 7.54588 11.3089 7.59753 10.5287 7.87648L11.5575 8.90523C12.0378 8.83647 12.5276 8.88053 12.988 9.03393C13.4484 9.18733 13.8668 9.44585 14.2099 9.78899C14.5531 10.1321 14.8116 10.5505 14.965 11.0109C15.1184 11.4713 15.1625 11.9611 15.0937 12.4415L16.1212 13.469ZM12.4425 15.0927L13.47 16.1202C12.6898 16.3992 11.8464 16.4508 11.038 16.2692C10.2296 16.0876 9.48936 15.6801 8.90348 15.0942C8.3176 14.5083 7.91013 13.7681 7.72849 12.9597C7.54685 12.1513 7.59851 11.3079 7.87746 10.5277L8.90621 11.5565C8.83745 12.0369 8.88151 12.5267 9.03491 12.9871C9.18831 13.4475 9.44682 13.8658 9.78997 14.209C10.1331 14.5521 10.5515 14.8106 11.0119 14.964C11.4723 15.1174 11.9621 15.1615 12.4425 15.0927Z"
        fill={color}
      />
      <Path
        d="M6.1875 8.83664C5.9625 9.03664 5.74625 9.23914 5.54 9.44539C4.76456 10.225 4.0694 11.0806 3.465 11.9991L3.70875 12.3591C4.1275 12.9591 4.74625 13.7591 5.54 14.5529C7.15125 16.1641 9.35125 17.6241 12 17.6241C12.895 17.6241 13.7375 17.4579 14.525 17.1741L15.4875 18.1391C14.3874 18.6198 13.2005 18.87 12 18.8741C5.75 18.8741 2 11.9991 2 11.9991C2 11.9991 3.17375 9.84789 5.30125 7.95164L6.18625 8.83789L6.1875 8.83664ZM19.0575 19.9416L4.0575 4.94164L4.9425 4.05664L19.9425 19.0566L19.0575 19.9416Z"
        fill={color}
      />
    </Svg>
  );

export default EyeIcon;
