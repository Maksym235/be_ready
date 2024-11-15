export interface IErrorAlertType {
  errorCode: number;
  message: string;
}

export interface IToggleEquipItemType {
  tourId: string;
  equipItemId: string;
}

export interface IRenameTripType {
  newName: string;
  tripId: string;
}

export interface IChangeDurationType {
  duration: number;
  tripId: string;
}

export interface IDeleteTripType {
  tripId: string;
}

export interface INewTripType {
  name: string;
  listType: number;
  duration: number;
  customData: string;
}

export interface IAddNewUserToTripType {
  tripId: string;
  userId: string;
  invite: boolean;
}

export interface IAddNewCategoryType {
  listId: string;
  categoryName: string;
}

export interface IAddNewItemToCategoryType {
  listId: string;
  itemData: {
    category: string;
    name: string;
    description: string;
  };
}

export interface IUpdateListType {
  equipId: string;
  newList: any;
}

export interface IDeleteCategoryType {
  listId: string;
  categoryName: string;
}

export interface IDeleteListItemType {
  listId: string;
  itemId: string;
  category: string;
}

export interface IUpdateCountType {
  listId: string;
  count: number;
  category: string;
  equipId: string;
}
