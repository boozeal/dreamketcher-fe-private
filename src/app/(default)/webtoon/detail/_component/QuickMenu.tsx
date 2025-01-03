"use client";
import _ from "lodash";

const QuickMenu = () => {
  const handleClickTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClickBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className="fixed flex z-50 right-10 top-1/2 transform -translate-y-1/2">
      <div className="flex flex-col gap-3">
        <div
          className="cursor-pointer rounded-full border bg-[#F9F9F9] w-10 h-10 flex items-center justify-center"
          onClick={handleClickTop}
        >
          <span className="mdi mdi-chevron-up text-2xl text-gray-600/50 hover:text-gray-600"></span>
        </div>
        <div
          className="cursor-pointer rounded-full border bg-[#F9F9F9] w-10 h-10 flex items-center justify-center"
          onClick={handleClickBottom}
        >
          <span className="mdi mdi-chevron-down text-2xl text-gray-600/50 hover:text-gray-600"></span>
        </div>
      </div>
    </div>
  );
};

export default QuickMenu;
