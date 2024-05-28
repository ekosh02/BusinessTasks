import {UserPublicType} from './UserType';

type CheckBoxesType = {
  name: string;
  status: boolean;
};

type BoardFirestoreType = {
  _data: BoardType;
  _exists: boolean;
  _metadata: any[];
  _ref: {
    _documentPath: string;
    _firestore: string;
  };
};

type BoardType = {
  id: string,
  name: string;
  description: string;
  createdAt: number;
  expiresAt: number;
  creater: UserPublicType;
  checkboxes: CheckBoxesType[] | [];
  members: UserPublicType[] | [];
};

export type {BoardType, CheckBoxesType, BoardFirestoreType};
