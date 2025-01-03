'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlarmModalOpen, setAlarmModalOpen] = useState(false);
  const userId: Number = 1;
  const profileImage: any = null;

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleAlarmModal = () => {
    setAlarmModalOpen(!isAlarmModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeAlarmModal = () => {
    setAlarmModalOpen(false);
  };

  return (
    <header className="fixed w-full bg-white z-50">
      <div className="flex items-center justify-between w-full max-w-[1024px] h-[80px] mx-auto px-4 md:px-0 relative">
        <hr className="fixed left-0 w-[100vw] mt-[80px] border-line" />
        <div className="flex items-center space-x-10">
          <Link
            href="/"
            className="flex items-center text-lg md:text-xl font-bold"
          >
            <span className="text-brand-yellow">Dream</span>
            <span className="text-brand-blue">ketcher</span>
          </Link>
          <div className="flex text-[#888888]">
            <button className="border-r border-r-line w-[65px] h-[36px] text-black">
              홈
            </button>
            <button className="w-[65px] h-[36px]">구독</button>
          </div>
        </div>

        <div className="flex justify-end w-full max-w-[600px]">
          <div className="flex items-center w-fit gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-[263px] h-[34px] p-2 bg-line rounded-[100px]"
            />
            <div className="relative flex text-black gap-3 items-center">
              {userId !== 0 ? (
                <>
                  <Image
                    src="/assets/images/bell.png"
                    alt="noti button"
                    width={30}
                    height={30}
                  />
                  <Image
                    src="/assets/images/profile-default.png"
                    alt="profile button"
                    width={30}
                    height={30}
                  />
                  <Link href="/login" className="px-2 py-2 text-sm">
                    로그인
                  </Link>
                </>
              ) : (
                <Link href="/login" className="px-4 py-2 text-sm">
                  로그아웃
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
