'use client';
import React from 'react';
import Image from 'next/image';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter } from 'next/navigation';
import DefaultImage from '@/app/_component/DefaultImage';
import { highlightKeyword } from '@/app/util/highlightKeyword';
import TagList from './TagList';

type SearchResultThumbnailProps = {
  webtoon: IWebtoon;
  keyword: string; // 검색 키워드 추가
};

const SearchResultThumbnail: React.FC<SearchResultThumbnailProps> = ({
  webtoon,
  keyword,
}) => {
  const router = useRouter();
  const temporalTags = ['무협/사극', '사이다', '세계관', '성장'];

  const tempClickHandler = () => {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className="flex w-full h-[150px] cursor-pointer gap-[18px]"
        onClick={tempClickHandler}
      >
        <DefaultImage
          alt={'Search webtoon thumbnail'}
          src={webtoon.thumbnail}
          height={150}
          width={120}
        />
        <div className="flex flex-col text-xs gap-[3px]">
          <p className="text-[18px] mb-[3px]">
            {highlightKeyword(webtoon.title, keyword)}
          </p>
          <p className="text-[#888888]">
            {highlightKeyword(webtoon.member, keyword)} ·{' '}
            {highlightKeyword(webtoon.genre, keyword)} · {webtoon.lastEpisode}화
          </p>
          <div className="flex items-center gap-1 text-[13px] mb-[7px]">
            <Image
              src="/assets/icon/star-1.svg"
              alt="Star svg"
              width={13}
              height={13}
            />
            <p className="text-brand-yellow">{webtoon.averageStar}</p>
            <p className="text-[#888888]">({webtoon.numOfStars})</p>
          </div>
          <p className="text-[14px] text-[#3f3f3f] mb-[4px] whitespace-nowrap overflow-hidden text-ellipsis">
            {highlightKeyword(webtoon.story, keyword)}
          </p>
          <TagList tags={temporalTags} keyword={keyword} />
        </div>
      </div>
    </div>
  );
};

export default SearchResultThumbnail;
