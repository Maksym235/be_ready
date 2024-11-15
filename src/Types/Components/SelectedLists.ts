import { Location } from 'react-router-dom';
import { IUser } from './Home';

export interface IPersons {
  _id: string;
  name: string;
  count: number;
}
export interface ICategoryItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  persons: IPersons[];
}

export interface ICategoryItemProps {
  user: IUser;
  item: ICategoryItem;
  handleCheckedItem: (item: ICategoryItem) => void;
  handleShowInfo: (item: ICategoryItem) => void;
  isEditing: boolean;
  listId: string;
  refetch: any;
  category: string;
}

export interface ICategoryTitleProps {
  category: string;
  equipList: any;
  opensCategories: string[];
  toggleOpenCategory: (category: string) => void;
  isEditing: boolean;
  refetch: any;
  listId: string;
}

export interface IFootersContentProps {
  changeFooterState: (state: string) => void;
}
export interface IDefaultFooterProps extends IFootersContentProps {
  isHidden: boolean;
  toggleIsHidden: () => void;
  setModal: (key: string) => void;
  toggleModal: () => void;
}
export interface ISelectedListFooter {
  toggleIsEditing: () => void;
  toggleIsEditMenu: any;
  isHidden: boolean;
  toggleIsHidden: () => void;
  setModal: (key: string) => void;
  toggleModal: () => void;
}

export interface ISelectedListHeaderProps {
  location: Location;
  listId: string;
  isEditing: boolean;
  listOwner: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
  setCurrentModal: (key: string) => void;
  toggleOpen: () => void;
}
