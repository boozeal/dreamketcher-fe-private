export namespace _Model {
  export const name = 'creator/model';

  export interface ResPostWebtoon {
    id: number;
    email: string;
    nickname: string;
  }

  export interface ResEditWebtoon {
    id: number;
    email: string;
    nickname: string;
  }

  export interface CreatorWebtoons {
    result: CreatorWebtoonUnit[];
    totalElements: number;
  }

  export interface CreatorWebtoonUnit {
    commentCount: number;
    episodeCount: number;
    id: number;
    interestedCount: number;
    likeCount: number;
    startedAt: string;
    thumbnail: string;
    title: string;
    updatedAt: string;
  }
}
