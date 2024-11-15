import { FC, useRef } from 'react';
import { ModalContainerCreateList } from '../ModalContainerCreateList/ModalContainerCreateList';
import styles from './SetRecOrEmpty.module.css';
import { ISetRecOrEmptyProps } from '../../../Types/Components/Modals';

export const SetRecOrEmpty: FC<ISetRecOrEmptyProps> = ({
  isOpen,
  toggleModal,
  setCurrentModal,
  submit,
}) => {
  const inputFileRef: any = useRef();
  const handleNextPage = (type: string, data: any) => {
    submit(type, data);
  };
  const onImageSelect = () => {
    inputFileRef.current.click();
    // if (e.target.files && e.target.files[0]) {
    // 	let img = e.target.files[0];
    // 	const formData = new FormData();
    // 	formData.append("avatar", img);
    // 	console.log(formData);
    // }
  };
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        //@ts-ignore
        const content = JSON.parse(e.target.result);
        console.log('File content:', content);
        handleNextPage('custom', content);
      } catch (error) {
        console.error('Invalid JSON file', error);
      }
    };
    if (file) {
      reader.readAsText(file);
    }
  };

  // Функція для відправки JSON-даних на сервер
  return (
    <ModalContainerCreateList
      isOpen={isOpen}
      toggleModal={toggleModal}
      title='New packing list'
      currentStep='setRecOrEmpty'
    >
      <div className={styles.container}>
        <p className={styles.title}>
          Do you want to get our recommended lists for your trip or start from
          scratch?
        </p>
        <div className={styles.btn_wrapper}>
          <button
            onClick={() => handleNextPage('rec', null)}
            className={styles.recomend}
          >
            I WANT RECOMMENDATIONS
          </button>

          <button
            onClick={() => handleNextPage('empty', null)}
            className={styles.empty_back}
          >
            CREATE EMPTY LIST
          </button>
          <button onClick={onImageSelect} className={styles.empty_back}>
            Upload custom packing list
          </button>
          <input
            hidden
            ref={inputFileRef}
            onChange={handleFileChange}
            className={styles.empty_back}
            placeholder='select custom'
            type='file'
            accept='.json'
          />

          <button
            onClick={() => setCurrentModal('setTripDuration')}
            className={styles.empty_back}
          >
            BACK
          </button>
        </div>
      </div>
    </ModalContainerCreateList>
  );
};
