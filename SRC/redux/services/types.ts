/**
 * Props and types are defined here for the entire Application.
 */

export type askType = {
  _id?: string;
  userInfo: {user_id: string; username: string; photo?: string};
  message: string;
  categories: string[];
  image?: string;
  expiry: number;
  status: {
    hidden: boolean;
    hiddenDate?: string;
  };
  createdAt?: any;
  updatedAt?: any;
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
  createdAt: string;
  updatedAt: string;
};

export type askAsyncState = {
  loading: boolean;
  asks: askType[];
  error: string;
};

export type userAsyncState = {
  loading: boolean;
  user: userType;
  error: string;
};
