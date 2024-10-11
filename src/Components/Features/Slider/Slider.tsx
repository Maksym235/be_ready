import { FC } from 'react';
// import styles from "./Slider.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import { cards_data } from './CardsData';
import { SliderCard } from './SliderCard/SliderCard';
import styles from './Slider.module.css';
export const SliderWrapper: FC = () => {
  return (
    <Swiper
      className={styles.slider_container}
      modules={[Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={50}
      slidesPerView={1}
    >
      {cards_data.map((card, index: number) => (
        <SwiperSlide key={index}>
          <SliderCard title={card.title} content={card.content} />
        </SwiperSlide>
      ))}
      {/* <SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide> */}
    </Swiper>
  );
};
