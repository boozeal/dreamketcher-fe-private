'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import WorkItem from './WorkItem';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import Button from '@/app/_component/Button';

export interface Webtoon {
  id: number;
  title: string;
  thumbnail: string;
  author: string;
  story: string;
  episodeCount: number;
  avgStar: number;
  numOfStars: number;
  genre: string;
}

const MyWork: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Query 파라미터에서 label 값 가져오기
  const selectedLabel = searchParams.get('label') ?? 'in_series';
  const status = selectedLabel === 'finish' ? 'FINISH' : 'IN_SERIES';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['creatorsWebtoon', status],
    queryFn: () =>
      fetchCreatorWebtoon.getCreatorsWebtoons({
        query: { status, page: 1, size: 10 },
      }),
  });

  // 탭 클릭 시 URL 변경
  const handleTabClick = (type: 'ongoing' | 'completed') => {
    const query = type === 'ongoing' ? 'in_series' : 'finish';
    router.push(`/mypage?label=${query}`);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (isError) {
      return <p>Error loading works.</p>;
    }
  };

  const works = data?.content.result || [];
  const workCount = works.length;

  return (
    <div className="w-full">
      <div className="flex justify-start mt-10 mb-6 border-b border-b-line">
        {[
          { label: '내 연재 웹툰', type: 'ongoing' as const },
          { label: '내 완결 웹툰', type: 'completed' as const },
        ].map((tab) => (
          <button
            key={tab.type}
            className={`w-[135px] h-[48px] text-center border-b-2 transition duration-300 ${
              (status === 'IN_SERIES' && tab.type === 'ongoing') ||
              (status === 'FINISH' && tab.type === 'completed')
                ? 'text-brand-yellow border-b-brand-yellow'
                : 'text-gray-500 border-b-transparent'
            }`}
            onClick={() => handleTabClick(tab.type)}
          >
            {tab.label} ({workCount})
          </button>
        ))}
      </div>

      {workCount === 0 ? (
        status === 'FINISH' ? (
          // 내 완결 웹툰 탭에서 데이터가 없을 때
          <div className="flex justify-center">
            <p className="text-[#C9C9C9] text-lg mt-[100px] mb-1">
              아직 완결 작품이 없습니다.
            </p>
          </div>
        ) : (
          // 내 연재 웹툰 탭에서 데이터가 없을 때
          <div className="flex flex-col items-center h-[300px]">
            <p className="text-gray-700 font-semibold text-lg mt-[70px] mb-1">
              아직 작품이 없습니다.
            </p>
            <p className="text-[#888888] text-sm mb-[35px]">
              새로운 웹툰을 시작해보세요!
            </p>
            <Link
              className="w-[320px] h-[61px] flex items-center justify-center px-6 py-2 border border-[#FBA250] text-white bg-brand-yellow rounded-md text-lg"
              href={'/creator/series/new'}
            >
              새 웹툰 등록하기
            </Link>
          </div>
        )
      ) : (
        <div className="space-y-4">
          {works.map((work: Webtoon) => (
            <WorkItem key={work.id} {...work} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWork;
