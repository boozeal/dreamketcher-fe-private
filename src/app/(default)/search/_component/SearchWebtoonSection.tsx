'use client';
import React, { useState, useEffect } from 'react';
import SearchMainSectionHeader from './SearchMainSectionHeader';
import SearchResultThumbnail from './SearchResultThumbnail';
import SearchDropdown from './SearchDropdown';
import Pagination from '@/app/_component/Pagination';
import { useQuery } from '@tanstack/react-query';
import { getSearchWebtoonsByTitle } from '@/app/api/fetchWebtoons/getSearchResult';

interface SearchWebtoonSectionProps {
  keyword: string;
}

const dropdownOptions = [
  { label: '정확도순', value: 'accuracy' },
  { label: '최근순', value: 'desc' },
  { label: '오래된순', value: 'asc' },
];

export default function SearchWebtoonSection({
  keyword,
}: SearchWebtoonSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');
  const [dropdownValue, setDropdownValue] = useState('accuracy');

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'webtoons',
      'search',
      'title',
      keyword,
      currentPage - 1,
      sortDirection,
    ],
    queryFn: () =>
      getSearchWebtoonsByTitle({
        param: { keyword },
        query: {
          fromFirst: sortDirection === 'asc',
          page: currentPage - 1,
          size: 30,
        },
      }),
    enabled: !!keyword,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const searchData = data || {
    results: [],
    totalElements: 0,
    currentPage: 0,
    totalPages: 0,
  };

  return (
    <div className="flex flex-col gap-[15px]">
      {isError && (
        <div className="p-4 text-red-500 bg-red-50 rounded">
          검색 결과를 불러오는 중 오류가 발생했습니다. 잠시 후 다시
          시도해주세요.
        </div>
      )}
      <div className="flex items-end">
        <p className="text-[18px] font-medium leading-[21px] text-titleBlack">
          작품
        </p>
        <p className="ml-2 text-sm text-gray-500">
          총 {searchData.results.length}개
        </p>
      </div>
      <div className="mb-[12px] flex justify-between items-center">
        <SearchMainSectionHeader count={searchData.totalElements} />
        <SearchDropdown
          options={dropdownOptions}
          selected={dropdownValue}
          onSelect={(value) => setDropdownValue(value)}
        />
      </div>
      <div className="flex flex-col gap-5 mb-[30px] min-h-[calc(100vh-560px)]">
        {searchData.results.length > 0 ? (
          searchData.results.map((webtoon) => (
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
      {searchData.totalPages > 1 && (
        <Pagination
          totalPages={searchData.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
