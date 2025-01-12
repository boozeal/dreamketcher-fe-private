'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
}

export default function DefaultImage({ alt, src, height, width }: ImageProps) {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  const [url, setURL] = useState<string>('');

  // 임시
  useEffect(() => {
    if (!src.startsWith('https://s3.ap-northeast-2.amazonaws.com/')) {
      setIsImgError(true);
    } else {
      setURL(src);
    }
  }, [src]);

  return (
    <>
      {!url ? (
        <div className={`bg-[#DEE5EA] h-[${height}px] w-[${width}px]`}></div>
      ) : (
        <Image
          alt={alt}
          src={url}
          width={width}
          height={height}
          onError={(e) => {
            setIsImgError(true);
            console.log(e, 'error 에러예욤');
          }}
        />
      )}
    </>
  );
}
