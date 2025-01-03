import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/_component/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FavoriteWebtoonItemProps {
  id: number;
  image: string;
  title: string;
  writer: string;
  genre: string;
  episodes: number;
  updatedAt: string;
}

const FavoriteWebtoonItem: React.FC<FavoriteWebtoonItemProps> = ({
  id,
  image,
  title,
  writer,
  genre,
  episodes,
  updatedAt,
}) => {
  const [showMenu, setShowMenu] = useState(false); // 메뉴 상태
  const menuRef = useRef<HTMLDivElement>(null); // 메뉴 참조

  const router = useRouter();
  function navigateToWebtoon() {
    router.push("/webtoon/list");
  }

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleDelete = () => {
    alert(`작품 '${title}'이 삭제되었습니다.`);
    // TODO : 삭제 로직 추가
  };

  // 다른 영역 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center relative gap-4 mt-3 pb-6 border-b border-b-line">
      <img
        src={image}
        alt={title}
        className="w-[100px] h-[150px] object-cover rounded cursor-pointer"
        onClick={navigateToWebtoon}
      />
      <div className="flex flex-col">
        <h3
          className="text-base font-semibold cursor-pointer"
          onClick={navigateToWebtoon}
        >
          {title}
        </h3>
        <p
          className="text-xs text-[#888888] mt-1 cursor-pointer"
          onClick={navigateToWebtoon}
        >
          {writer} &#183; {genre} &#183; {episodes}화
        </p>

        <div
          className="flex mt-1 mb-4 cursor-pointer"
          onClick={navigateToWebtoon}
        >
          <Image
            src={"/assets/icon/clock.svg"}
            alt="Clock Icon"
            width={12}
            height={12}
            className="mr-2"
          />
          <p className="text-xs text-[#888888]">{updatedAt} 업데이트</p>
        </div>
        <Link
          href={{
            pathname: "/webtoon/detail",
            query: { titleId: "12345", no: id },
          }}
        >
          <Button
            props={{
              size: "M",
              variant: "brand-yellow",
              handleClick: navigateToWebtoon,
              containerStyles: "text-xs px-5 py-3",
            }}
          >
            <div className="flex gap-2 items-center justify-center">
              {episodes}화 보러가기
            </div>
          </Button>
        </Link>
      </div>

      <div className="flex absolute top-14 right-1" ref={menuRef}>
        <Image
          src={"/assets/icon/notification.svg"}
          alt="notification Icon"
          width={24}
          height={24}
          className="mr-3 mt-1"
        />

        <div className="relative">
          <Image
            src={"/assets/icon/meatballsMenu.svg"}
            alt="meatballsMenu Icon"
            width={30}
            height={30}
            className="ml-auto px-1 py-1 rounded cursor-pointer hover:bg-[#F2F2F2]"
            onClick={toggleMenu}
          />

          {/* 삭제 버튼 메뉴 */}
          {showMenu && (
            <div
              className="absolute right-0 mt-1 bg-white border border-[#F2F2F2] rounded-lg shadow-sm"
              style={{ zIndex: 10 }}
            >
              <button
                className="block w-[120px] text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                onClick={handleDelete}
              >
                작품 삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteWebtoonItem;
