/**
 * Props and types are defined here for the entire Application.
 */
/// the complete ask type
export type askType = {
  _id: string;
  user: any;
  message: string;
  categories: string[];
  images: string[];
  expiry: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  status: {
    hidden: boolean;
    hiddenDate?: string;
  };
  createdAt: string;
  updatedAt: string;
};

/// the complete ask type
export type userType = {
  _id: string;
  username: string;
  oAuthId: string;
  oAuthProvider: 'google' | 'facebook';
  interests: string[];
  status: {
    banned: boolean;
    bannedDate: string;
  };
  telephone: number;
  email: string;
  whatsapp: number;
  photo: string;
  createdAt: string;
  updatedAt: string;
};

export type RouteStackParams = {
  Auth: undefined;
  AsksNav: undefined;
  Splash: undefined;
  Interests: undefined;
  Respond: {askId: string};
  Contact: undefined;
  NewAsk: undefined;
  EditAsk: {askId: string};
};

export type tempUserType = {
  isNewUser?: any;
  username: string;
  oAuthId: string;
  oAuthProvider: string;
  whatsapp?: number;
  telephone: number;
  email?: string;
  photo?: string;
  interests: string[];
  status: {banned: boolean; bannedDate: string};
};

export type interestType = {
  _id: string;
  group: string;
  name: string;
};
