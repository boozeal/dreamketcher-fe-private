import Button from "@/app/_component/Button";
import Link from "next/link";

export interface NoticeInfo {
  index: number;
  title: string;
}
export default function NoticeListItem({ index, title }: NoticeInfo) {
  return (
    <div className="grid grid-cols-[auto_1fr] border-b gap-4 p-[15px]">
      <div className="flex gap-3 items-center text-sm">
        <div className="px-2 py-0.5 text-[13px] border border-brand-yellow text-brand-yellow rounded-xl">
          공지
        </div>
        <div className="text-[15px]">{title}</div>
      </div>
    </div>
  );
}
