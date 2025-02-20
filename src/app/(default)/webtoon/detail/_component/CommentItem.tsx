import { fetchComment } from '@/app/api/fetchComment';
import Image from 'next/image';
import 'moment/locale/ko';
import moment from 'moment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CommentInfoType = {
  info: fetchComment.Model.ResCommentUnit;
  webtoonId: string;
  episodeId: string;
  handleClick: () => void;
};
const CommentItem: React.FC<CommentInfoType> = ({
  info,
  webtoonId,
  episodeId,
  handleClick,
}) => {
  moment.locale('ko');
  const timeAgo = moment(info.createdAt).fromNow();

  const queryClient = useQueryClient();

  const { mutate: deleteCommentMutate, isError } = useMutation({
    mutationFn: fetchComment.deleteComment,
    onSuccess: () =>
      // 성공 시 기존 댓글 리스트를 다시 불러옴
      queryClient.invalidateQueries({
        queryKey: [webtoonId, episodeId, 'comments'],
      }),
    onError: (e) => console.log(e),
  });

  return (
    <div className="grid grid-cols-[auto_1fr] py-5 gap-[14px] border-b border-gray-500/10">
      <Image
        src={info.profileImage}
        alt="profile"
        width={36}
        height={36}
        className="w-9 h-9 rounded-full object-cover shadow-[inset_0_0_0_1px_#F2F2F2]"
      />
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div className="text-sm/[17px]">{info.nickname}</div>
          <div className="text-xs text-[#888888]">{timeAgo}</div>
        </div>

        <div className="text-[13px]">{info.content}</div>
        <div className="h-5 mt-1 flex gap-4 text-[#888888]">
          <div
            className="text-xs flex items-center gap-1 cursor-pointer"
            onClick={handleClick}
          >
            <Image
              src="/assets/icon/inactiveMessage.svg"
              alt="reply"
              width={13}
              height={13}
            />
            {info.childCommentCount > 0 ? info.childCommentCount : '답글'}
          </div>

          <div className="text-xs flex items-center gap-1 cursor-pointer">
            <Image
              src="/assets/icon/inactiveLike.svg"
              alt="like"
              width={13}
              height={13}
            />
            좋아요
          </div>
          <div className="text-xs flex items-center gap-1 cursor-pointer">
            <Image
              src="/assets/icon/inactiveDislike.svg"
              alt="dislike"
              width={13}
              height={13}
            />
            싫어요
          </div>
          <div className="flex gap-2 ml-auto">
            <Image
              src="/assets/icon/trash.svg"
              alt="trash"
              width={20}
              height={20}
              onClick={() =>
                deleteCommentMutate({
                  param: { webtoonId, episodeId, commentId: String(info.id) },
                })
              }
              className="w-5 h-5 cursor-pointer"
            />
            <Image
              src="/assets/icon/report.svg"
              alt="report"
              width={26}
              height={26}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
