'use client';

import useAuthStore from '@/app/store/authStore';

import Image from 'next/image';

import MyWork from './_component/MyWork';
import { useRouter } from 'next/navigation';
import ClipboardButton from '@/app/_component/ClipboardButton';
import { useEffect } from 'react';

export default function Mypage() {
  const router = useRouter();
  const { nickname, businessEmail, imageUrl, shortIntroduction } =
    useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
  }, [router]);

  const handleEditProfile = () => {
    router.push(`/mypage/edit`);
  };

  const emailText = businessEmail || '지정된 이메일이 없습니다.';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-4xl bg-white mt-[105px] flex">
        <Image
          src={imageUrl || '/assets/images/profile-default.png'}
          alt="프로필 이미지"
          width={70}
          height={70}
          className="w-[70px] h-[70px] rounded-full object-cover mr-[15px] border border-[#F2F2F2]"
        />

        <div>
          <p className="text-[18px] font-medium text-gray-800 mt-3">
            {nickname}
          </p>
          {businessEmail && (
            <div className="flex">
              <Image
                src={'/assets/images/mail.svg'}
                alt="Mail Icon"
                width={11}
                height={9}
              />
              <p className="text-[12px] text-gray-500 m-1">{businessEmail}</p>
              <ClipboardButton textToCopy={emailText} />
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-[19px]">{shortIntroduction}</p>

      <button
        className="px-4 py-2 w-[870px] h-[61px] mt-[30px] text-[18px] font-medium border rounded-md"
        style={{
          borderColor: '#FBA250',
          backgroundColor: '#FFFFFF',
        }}
        onClick={handleEditProfile}
      >
        프로필 수정
      </button>
      <MyWork />
    </div>
  );
}
