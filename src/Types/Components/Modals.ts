import { ReactNode } from 'react';
import { IUserDataToUpdate } from '../api/home';
import { ICategoryItem } from './SelectedLists';
import { IUser } from './Home';

interface IModalMainProps {
  toggleModal: () => void;
  isOpen: boolean;
}
export interface IModalContainerProps extends IModalMainProps {
  children: ReactNode;
  title: string;
}

export interface IAddNewCategoryProps extends IModalMainProps {
  listId: string;
}

export interface IAddNewFriendProps extends IModalMainProps {}

export interface IAddNewItemToCategoryProps extends IModalMainProps {
  category: string;
  listId: string;
  cleanCategory: () => void;
}

export interface IAddUsersToTripProps extends IModalMainProps {
  setModal: (key: string) => void;
  listId: string;
  tripName: string;
}

export interface IBurgerMenuProps {
  toggleBurger: () => void;
  isOpen: boolean;
}

export interface IChangeTripDurationProps extends IModalMainProps {
  tripId: string;
  tripDuraition: number;
}

export interface ICreateListProps extends IModalMainProps {
  setCurrentModal: (key: string) => void;
  changeTripName: (name: string) => void;
}

export interface IDeleteTripProps extends IModalMainProps {
  tripId: string;
}

export interface IEditUserEmailProps extends IModalMainProps {
  submit: (data: IUserDataToUpdate) => void;
}

export interface IEditUserNameProps extends IModalMainProps {
  submit: (data: IUserDataToUpdate) => void;
}

export interface IEditUserPasswordProps extends IModalMainProps {
  submit: (data: IUserDataToUpdate) => void;
}

export interface IModalContainerCreateListProps extends IModalMainProps {
  children: ReactNode;
  currentStep: string;
  title: string;
}

export interface IRenameTripProps extends IModalMainProps {
  tripId: string;
  tripName: string;
}

export interface ISelectNewUserFromFriendsProps extends IModalMainProps {
  tripId: string;
}

export interface ISetRecOrEmptyProps extends IModalMainProps {
  setCurrentModal: (key: string) => void;
  submit: (type: string, data: unknown) => void;
}

export interface ISetTripDurationProps extends IModalMainProps {
  setCurrentModal: (key: string) => void;
  changeTripDuration: (duration: string) => void;
}

export interface ISetTripTypeProps extends IModalMainProps {
  setCurrentModal: (key: string) => void;
  // changeTripType: (type: string) => void;
}

export interface IShowInfoCategoryItemProps extends IModalMainProps {
  tripName: string;
  listId: string;
  item: ICategoryItem | null;
  user: IUser;
  owner: string;
}
export interface IUsersInTripProps extends IModalMainProps {
  tripId: string;
}

export interface IAuthModalProps extends IModalMainProps {
  setCurrentModal: (key: string) => void;
}
