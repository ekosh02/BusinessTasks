type UserPublicType = {
  uid: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  avatar: any,
  email: string | undefined;
};

type UserEditType = {
  name: string;
  surname: string;
  email: string;
  avatar: any,
};

type UserType = {
  uid: string | undefined;
  avatar: any,
  name: string | undefined;
  surname: string | undefined;
  accCreated: number | undefined;
  email: string | undefined;
};

export type {UserType, UserPublicType, UserEditType};
