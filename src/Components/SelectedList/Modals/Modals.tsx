import { FC, ReactNode, useMemo } from 'react';
import { ISelectedListModalsPropsType } from '../../../Types/Components/SelectedLists';
import {
  AddNewCategory,
  AddNewItemToCategory,
  AddUsersToTrip,
  ChangeTripDuration,
  DeleteTrip,
  RenameTrip,
  SelectNewUserFromFriends,
  ShowInfoCategoryItem,
  UsersInTrip,
} from '../../Modals';

export const Modals: FC<ISelectedListModalsPropsType> = ({
  currentModal,
  isOpen,
  toggleModal,
  data,
  user,
  currentCategory,
  cleanCategory,
  handleSetCurrentModal,
  infoItem,
}) => {
  const modals: Record<string, ReactNode> = useMemo(
    () => ({
      newCategory: (
        <AddNewCategory
          listId={data?.trip?.equipListId ?? ''}
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
      ),
      newItem: (
        <AddNewItemToCategory
          category={currentCategory}
          listId={data?.trip?.equipListId ?? ''}
          isOpen={isOpen}
          toggleModal={toggleModal}
          cleanCategory={cleanCategory}
        />
      ),
      renameTrip: (
        <RenameTrip
          tripId={data?.trip?.id ?? ''}
          tripName={data?.trip?.name ?? ''}
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
      ),
      changeDuration: (
        <ChangeTripDuration
          tripId={data?.trip?.id ?? ''}
          tripDuraition={data?.trip?.duration ?? 0}
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
      ),
      deleteTrip: (
        <DeleteTrip
          tripId={data?.trip?.id ?? ''}
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
      ),
      shareTrip: (
        <AddUsersToTrip
          listId={data?.trip?.equipListId ?? '-'}
          tripName={data?.trip?.name ?? '-'}
          isOpen={isOpen}
          toggleModal={toggleModal}
          setModal={handleSetCurrentModal}
        />
      ),
      shareTripSelectFromFriends: (
        <SelectNewUserFromFriends
          tripId={data?.trip?.id ?? ''}
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
      ),
      usersInTrip: (
        <UsersInTrip
          tripId={data?.trip?.id ?? ''}
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
      ),
      ShowInfoCategoryItem: (
        <ShowInfoCategoryItem
          listId={data?.trip?.equipListId ?? '-'}
          tripName={data?.trip?.name ?? '-'}
          item={infoItem}
          isOpen={isOpen}
          toggleModal={toggleModal}
          user={user}
          owner={data?.trip?.owner ?? '-'}
        />
      ),
    }),
    [
      data,
      isOpen,
      toggleModal,
      currentCategory,
      cleanCategory,
      handleSetCurrentModal,
      infoItem,
      user,
    ]
  );

  return modals[currentModal] ?? null;
};
