import {strings} from '../localization/localization';

const convertUnixToDate = (unixTimestamp: number) =>
  new Date(unixTimestamp).toLocaleDateString(strings.getLanguage());
export default convertUnixToDate;
