/**
 * Props and types are defined here for the entire Application.
 */

export type askType = {
  _id: string;
  userInfo: {user_id: string; username: string; photo?: string};
  message: string;
  categories: string[];
  image?: string;
  expiry: number;
  status: {
    hidden: boolean;
    hiddenDate?: string;
  };
};
export type userType = {
  _id: string;
  username: string;
  interests: string[];
  status: {banned: boolean; bannedDate?: string};
  telephone: number;
  email?: string;
  whatsapp?: number;
  photo?: string;
};

export type askAsyncState = {
  loading: boolean;
  asks: askType[];
  error: string;
};

export type userAsyncState = {
  loading: boolean;
  users: userType[];
  error: string;
};
