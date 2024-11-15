export interface IAllListBelowProps {
  list: string;
  id: string;
}
export interface IDownloadListProps {
  listId: string;
  tripName: string;
}

export interface IEmptyListsProps {
  list: string;
}

export interface IFirstChecklistProps {
  toggleModal: () => void;
}

export interface IShortDescProps {
  toggleModal: () => void;
}

export interface ITogglerListsProps {
  toggle: (key: string) => void;
  requests: {
    friends: string[];
    trips: string[];
  };
}
