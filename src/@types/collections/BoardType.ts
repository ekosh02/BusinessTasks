import {UserPublicType} from './UserType';

type CheckBoxesType = {
  name: string;
  status: boolean;
};

type BoardType = {
  name: string;
  description: string;
  createdAt: number;
  expiresAt: number | null;
  creater: UserPublicType;
  checkboxes: CheckBoxesType[] | []
  members: UserPublicType[] | []
};

export type {BoardType, CheckBoxesType};
