type UserPublicType = {
  uid: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
};

type UserType = {
  uid: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  accCreated: number | undefined;
  email: string | undefined;
};

export type {UserType, UserPublicType};
