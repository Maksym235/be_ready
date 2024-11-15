import styles from './DownloadList.module.css';
import download_icon from '../../assets/download.svg';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '../Spinner/Spinner';
import { downloadList } from '../../Pages/Lists/api';
import { FC } from 'react';
import { IDownloadListProps } from '../../Types/Components/Lists';

const download = (json: string, name: string) => {
  const jsonString = JSON.stringify(json);

  const blob = new Blob([jsonString], { type: 'application/json' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${name}-list.json`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export const DownloadList: FC<IDownloadListProps> = ({ listId, tripName }) => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: downloadList,
    onSuccess: (data): any => {
      download(data.list, tripName);
    },
  });
  if (isPending) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const handleDownloadFile = () => {
    mutate(listId);
  };

  return (
    <>
      <button onClick={handleDownloadFile} className={styles.download}>
        Download list
        <img width={24} height={24} src={download_icon} alt='download list' />
      </button>
    </>
  );
};
