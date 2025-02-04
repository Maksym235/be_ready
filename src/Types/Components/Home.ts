export interface IFriendsRequests {
  id: string;
  name: string;
  avatar: string;
}

export interface IFriend {
  _id: string;
  name: string;
  avatar: string;
}

export interface ISliderCardProps {
  title: string;
  content: string;
}

export interface IUser {
  email: string;
  id: string;
  language: string;
  password: string;
  name: string;
  theme: string;
  avatarURL: string;
  avatarName: string;
  friends: IFriendsRequests[];
}
export interface IFriendsListProps {
  user: IUser;
  refetch: any;
}
