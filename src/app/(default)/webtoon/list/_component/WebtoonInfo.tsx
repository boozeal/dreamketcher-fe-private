'use client';

import Image from 'next/image';
import Button from '@/app/_component/Button';
import DefaultImage from '@/app/_component/DefaultImage';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export enum Tag {
  SCARED = '괴담',
  ROMANCE = '로맨스',
  HORROR = '호러',
}

type webtoonDataProps = {
  webtoon: fetchWebtoonDetail.Model.WebtoonDetailUnit;
};

const WebtoonInfo: React.FC<webtoonDataProps> = ({ webtoon }) => {
  const {
    webtoonId,
    webtoonTitle,
    webtoonThumbnail,
    interestCount,
    webtoonStory,
    genreName,
    AuthorNickname,
  } = webtoon;

  const [interest, setInterest] = useState<{
    active: boolean;
    count: number;
  }>({
    active: false,
    count: interestCount,
  });

  const { data: isFavotire } = useQuery<{ webtoonId: number }[]>({
    queryKey: [webtoonId],
    queryFn: () =>
      fetchWebtoonDetail.favoriteWebtoon({ param: { id: String(webtoonId) } }),
  });

  useEffect(() => {
    setInterest((i) => ({ active: !!isFavotire, count: i.count }));
  }, [isFavotire]);

  const handleLikeToggle = async () => {
    try {
      if (interest.active) {
        await fetchWebtoonDetail.deleteFavoriteWebtoon({
          param: { id: String(webtoonId) },
        });

        setInterest((i) => ({
          active: false,
          count: Math.max(i.count - 1, 0),
        }));
      } else {
        await fetchWebtoonDetail.postFavoriteWebtoon({
          param: { id: String(webtoonId) },
        });
        setInterest((i) => ({
          active: true,
          count: i.count + 1,
        }));
      }
    } catch (error) {
      console.error('요청 중 에러 발생:', error);
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr] gap-[14px]">
      <DefaultImage
        src={webtoonThumbnail}
        alt={webtoonTitle}
        width={200}
        height={300}
        rounded={'rounded-[10px]'}
      />
      <div className="flex flex-col gap-[10px] relative leading-[1.2]">
        <div className="text-[22px] font-medium text-titleBlack">
          {webtoonTitle}
        </div>
        <div className="flex gap-[5px] items-center text-[16px] text-[#888]">
          <div className="text-[#3f3f3f]">{AuthorNickname}</div>
          <div className="text-[#888] mr-[7px]">글/ 그림</div>
          <div className="mr-[7px]">|</div>
          <div> {genreName}</div>
        </div>
        <div className="text-sm text-[#3f3f3f]">{webtoonStory}</div>
        <div className="text-sm flex gap-1">
          <div className="bg-brand-gray rounded-sm px-2 py-0.5 text-[#888888] text-xs">
            {genreName}
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-[7px] absolute w-full bottom-0">
          <Button
            props={{
              size: 'S',
              variant: interest.active ? 'transparent' : 'brand-yellow',
              containerStyles: 'border border-brand-yellow text-brand-yellow',
              handleClick: handleLikeToggle,
            }}
          >
            <div className="flex gap-[2px] items-center justify-center text-[18px]">
              <Image
                src={'/assets/icon/inspector.svg'}
                alt={'관심 추가 이미지'}
                width={30}
                height={30}
              />
              관심 {interest.count}
            </div>
          </Button>

          <Button props={{ size: 'S', variant: 'brand-gray-light' }}>
            <Link
              href={{
                pathname: '/webtoon/detail',
                query: { titleId: webtoonId, no: '1' },
              }}
            >
              <div className="flex gap-2 items-center justify-center text-[18px]">
                첫 화 보기
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebtoonInfo;
