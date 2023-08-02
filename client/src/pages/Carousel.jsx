import { useState, useCallback, useEffect } from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import './Global.css';

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleIndicatorClick(index) {
    setCurrentIndex(index);
  }

  const nextImage = useCallback(() => {
    setCurrentIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images]);

  useEffect(() => {
    const timer = setTimeout(() => nextImage(), 3000);
    return () => clearTimeout(timer);
  }, [nextImage]);

  return (
    <div>
      <div className="rotating-banner relative mx-auto flex w-full items-center justify-center p-3">
        <Icons currentIndex={currentIndex} images={images} />
        <Indicators
          currentIndex={currentIndex}
          images={images}
          onClick={handleIndicatorClick}
        />
      </div>
    </div>
  );
}

function Icons({ images, currentIndex }) {
  return (
    <div className="images align-center relative flex w-full justify-center">
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className={`indicator-image h-72 rounded-xl border object-cover ${
            index === currentIndex ? 'active' : 'hidden'
          }`}
        />
      ))}
    </div>
  );
}

function Indicators({ currentIndex, images, onClick }) {
  return (
    <div className="indicators absolute bottom-[7%] left-auto flex">
      {images.map((_, index) => (
        <span
          key={index}
          className={`fa-dot cursor-pointer  ${
            index === currentIndex ? 'active' : ''
          }`}
          onClick={() => onClick(index)}>
          {index === currentIndex ? (
            <FaCircle color={'#7c2d12'} />
          ) : (
            <FaRegCircle color={'#7c2d12'} />
          )}
        </span>
      ))}
    </div>
  );
}
