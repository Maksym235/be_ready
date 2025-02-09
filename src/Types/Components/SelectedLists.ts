import { IUser } from './Home';
export type PesonsType = {
  _id: string;
  name: string;
  count: number;
};

export type EquipListItemType = {
  _id: string;
  name: string;
  description: string;
  category: string;
  persons: PesonsType[];
};

export type EquipListCategoryType = Record<string, EquipListItemType[]>;

export type TripType = {
  id: string;
  name: string;
  users: string[];
  owner: string;
  duration: number;
  equipListId: string;
  equipList: EquipListCategoryType;
};
export type QueryDataType = {
  code: number;
  trip: TripType;
};

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
  category: string;
}

export interface ICategoryTitleProps {
  category: string;
  opensCategories: string[];
  toggleOpenCategory: (category: string) => void;
  isEditing: boolean;
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
  isEditing: boolean;
  isOpen: boolean;
  toggleIsOpen: () => void;
  setCurrentModal: (key: string) => void;
  toggleOpen: () => void;
}
export type ISelectedListModalsPropsType = {
  currentModal: string;
  isOpen: boolean;
  toggleModal: () => void;
  data: QueryDataType | undefined;
  user: IUser;
  currentCategory: string;
  cleanCategory: () => void;
  handleSetCurrentModal: (key: string) => void;
  infoItem: EquipListItemType | null;
};
