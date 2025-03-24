'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import WebtoonThumbnail from './WebtoonThumbnail';

interface WebtoonSliderProps {
  webtoons: IWebtoon[];
}

const CustomWebtoonSlider: React.FC<WebtoonSliderProps> = ({ webtoons }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY * 0.5;
    };

    slider.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      slider.removeEventListener('wheel', preventScroll);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft ?? 0));
    setScrollLeft(sliderRef.current?.scrollLeft ?? 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft ?? 0);
    const walk = x - startX;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    const scrollAmount = 300; // 스크롤할 픽셀 양 (조절 가능)
    const newScrollLeft =
      direction === 'left'
        ? sliderRef.current.scrollLeft - scrollAmount
        : sliderRef.current.scrollLeft + scrollAmount;

    sliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full max-w-[870px] relative group">
      {/* 왼쪽 화살표 버튼 */}
      <button
        onClick={() => handleScroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 
                 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                 hover:bg-gray-100"
        aria-label="이전"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* 기존 슬라이더 */}
      <div
        ref={sliderRef}
        className="flex gap-[30px] overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:h-[2px] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-gray-100 pb-[23px]"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollBehavior: 'smooth',
          transition: 'all 0.2s ease-out',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {webtoons.length > 0 ? (
          webtoons.map((webtoon, index) => (
            <div key={index} className="flex-shrink-0 snap-start">
              <WebtoonThumbnail webtoon={webtoon} ranking={index + 1} />
            </div>
          ))
        ) : (
          <div className="flex h-[311px]">
            <p className="text-red">데이터가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 오른쪽 화살표 버튼 */}
      <button
        onClick={() => handleScroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 
                 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                 hover:bg-gray-100"
        aria-label="다음"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default CustomWebtoonSlider;
