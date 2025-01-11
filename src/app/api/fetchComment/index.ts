import { _Model as __Model } from './model';
import qs from 'qs';

export namespace fetchComment {
  export import Model = __Model;

  export async function getComments(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
    };
    query: {
      page: number;
      size: number;
      order: 'DESC' | 'ASC';
    };
  }): Promise<{ result: Model.ResCommentUnit[]; totalElements: number }> {
    const { param, query } = arg;
    const { webtoonId, episodeId } = param;

    const queryString = arg.query ? `?${qs.stringify(query)}` : '';

    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}/comments` +
        queryString,
      { method: 'GET' }
    );

    return response.json();
  }

  export async function getReComments(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
      commentId: number;
    };
    query: {
      page: number;
      size: number;
      order: 'DESC' | 'ASC';
    };
  }): Promise<{ result: Model.ResReCommentUnit[]; totalElements: number }> {
    const { param, query } = arg;
    const { webtoonId, episodeId, commentId } = param;

    const queryString = arg.query ? `?${qs.stringify(query)}` : '';

    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recomments` +
        queryString,
      { method: 'GET' }
    );

    return response.json();
  }

  export async function postComment(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
      content: string;
    };
  }): Promise<{ id: number }> {
    const { param } = arg;
    const { webtoonId, episodeId, content } = param;

    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}/comments/create`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content }),
      }
    );

    return response.json();
  }

  export async function postReComment(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
      content: string;
    };
  }): Promise<{ id: number }> {
    const { param } = arg;
    const { webtoonId, episodeId, content, commentId } = param;

    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}create`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content }),
      }
    );

    return response.json();
  }

  export async function deleteComment(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
    };
  }): Promise<{ id: number }> {
    const { param } = arg;
    const { webtoonId, episodeId, commentId } = param;

    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/delete`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.json();
  }

  export async function deleteReComment(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
      recommentId: string;
    };
  }): Promise<{ id: number }> {
    const { param } = arg;
    const { webtoonId, episodeId, commentId, recommentId } = param;

    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recomment/${recommentId}delete`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.json();
  }
}
