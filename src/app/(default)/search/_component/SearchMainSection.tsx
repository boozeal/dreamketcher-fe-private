'use client';
import React, { useState, useEffect } from 'react';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchMainSectionHeader from './SearchMainSectionHeader';
import SearchResultThumbnail from './SearchResultThumbnail';
import thumbnailData from '@/app/mocks/webtoonThumbnails';
import SearchDropdown from './SearchDropdown';
import Pagination from '@/app/_component/Pagination';

interface SearchMainSectionProps {
  webtoons: IWebtoon[];
}
const dropdownOptions = [
  { label: '최근순', value: 'recent' },
  { label: '오래된순', value: 'oldest' },
];

const mockWebtoons = thumbnailData;

const SearchMainSection: React.FC<SearchMainSectionProps> = ({ webtoons }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const keyword = searchParams.get('keyword') || '';
  return (
    <div className="flex flex-col w-[894px] min-h-[calc(100vh-255px)] border-r border-r-line pt-[30px] pr-[24px] gap-[20px]">
      <div className="flex items-end">
        <p className="text-[18px] font-medium leading-[21px] text-titleBlack">
          '{keyword}'에 대한 검색 결과
        </p>
        <p className="ml-2 text-sm text-gray-500">총 {webtoons.length}개</p>
      </div>
      <div className="mb-[7px] flex justify-between items-center">
        <SearchMainSectionHeader />
        <SearchDropdown options={dropdownOptions} defaultOption="recent" />
      </div>
      <div className="flex flex-col gap-5 mb-[30px] min-h-[calc(100vh-560px)]">
        {webtoons.length > 0 ? (
          webtoons.map((webtoon) => (
            <SearchResultThumbnail
              key={webtoon.id}
              webtoon={webtoon}
              keyword={keyword}
            />
          ))
        ) : (
          <div className="flex flex-col items-center text-gray-500 text-sm mt-10 gap-2">
            <div>
              <p className="text-black text-base mb-3">
                '{keyword}'에 대한 검색 결과가 없습니다.
              </p>
              <div className="flex flex-col mx-1">
                <p>· 띄어쓰기나 철자를 확인해보세요</p>
                <p>· 다른 검색어로 검색해보세요</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Pagination
        totalPages={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SearchMainSection;
