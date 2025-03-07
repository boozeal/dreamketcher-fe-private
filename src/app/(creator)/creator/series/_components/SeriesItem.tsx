'use client';

import { useRouter } from 'next/navigation';
import OptionButton from '../../_component/OptionButton';
import DeleteModal from '../../_component/DeleteModal';
import { useState } from 'react';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import DefaultImage from '@/app/_component/DefaultImage';
import moment from 'moment';

const SeriesItem: React.FC<fetchCreatorWebtoon.Model.CreatorWebtoonUnit> = (
  item
) => {
  const router = useRouter();

  const [isModalOpen, handleOpenModal] = useState<boolean>(false);

  const updatedAt = moment(item.updatedAt).format('YYYY.MM.DD');

  return (
    <>
      <div className="grid grid-cols-[100px_repeat(6,1fr)_80px] gap-5 items-center border-b py-[20px] pl-[45px] w-full text-[#545454] text-[13px] border-gray-400/20">
        <div
          className="flex flex-col gap-[12px] items-center cursor-pointer"
          onClick={() => router.push(`/creator/episode?webtoonId=${item.id}`)}
        >
          <DefaultImage
            src={item.thumbnail}
            height={150}
            width={100}
            alt={`${item.id}`}
          />
          <span className="flex justify-center w-full">{item.title}</span>
        </div>

        <span className="flex justify-center w-full">{item.episodeCount}</span>
        <span className="flex justify-center w-full">{updatedAt}</span>
        <span className="flex justify-center w-full">
          {item.startedAt || '-'}
        </span>
        <span className="flex justify-center w-full">{item.likeCount}</span>
        <span className="flex justify-center w-full">{item.commentCount}</span>
        <span className="flex justify-center w-full">
          {item.interestedCount}
        </span>
        <div className="flex w-full justify-center">
          <OptionButton
            items={[
              {
                text: '작품 삭제',
                onClick: () => handleOpenModal(true),
              },
              {
                text: '작품 정보 수정',
                onClick: () =>
                  router.push(`/creator/series/new?webtoonId=${item.id}`),
              },
            ]}
          />
        </div>
      </div>

      <DeleteModal
        webtoonId={String(item.id)}
        text={`<${item.title}> 해당 작품을 삭제하시겠습니까?`}
        isOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default SeriesItem;
