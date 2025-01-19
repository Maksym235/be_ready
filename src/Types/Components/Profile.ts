import { IFriendsRequests, IUser } from './Home';

export type ListType = {
  _id: string;
  name: string;
  users: string[];
  owner: string;
  duration: number;
  equipList: string;
};
export interface IPackingListProps {
  lists: {
    code: number;
    personal: ListType[];
    connected: ListType[];
  };
}

export interface IPersonalItemProps {
  name: string;
}
export interface IUserInformationProps {
  name: string;
  email: string;
  curPassword: string;
  password: string;
}

export interface IUserImageProps {
  refetch: any;
  user: IUser;
}

export interface IUserDataProps {
  openModal: (key: string) => void;
  user: IUser;
}

export interface IUserFriendsProps {
  refetchRequest: any;
  requests: {
    friends: IFriendsRequests[];
    trips: any[];
  };
}
export interface ITextAndIdProps {
  user: IUser;
}
export interface IFriendRequestsListProps {
  refetch: any;
  requests: {
    friends: any[];
    trips: any[];
  };
  refetchRequest: any;
}
