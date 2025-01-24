import React from 'react';
import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from './MovieCard';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const MovieSlider = ({ movies = [] }) => {
    if (!Array.isArray(movies) || movies.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full px-1">
            <Swiper
                modules={[Autoplay, Navigation, EffectCoverflow]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                navigation
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView={Math.min(3, movies.length)}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                loop={movies.length > 3}
                className="py-8"
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie._id } className="flex items-center justify-center">
                        <div className="transition-transform duration-300 transform scale-90 hover:scale-100">
                            <MovieCard movie={movie} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieSlider;

