import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import { COLOR } from '@/constants/color';

let observer = null;
const LOAD_IMG_EVENT_TYPE = 'loadImage';

interface Props {
  lazy: boolean;
  threshold?: number;
  src: string | undefined;
  size: number;
  blur?: boolean;
}

const onIntersection: IntersectionObserverCallback = (entries, io) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

const AlbumPoster = ({ lazy, threshold = 0.5, src, size, blur = false }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }

    const handleLoadImage = () => setLoaded(true);

    const imgElement = imgRef.current;

    imgElement?.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);

    return () => {
      imgElement?.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) return;

    observer = new IntersectionObserver(onIntersection, { threshold });

    imgRef.current && observer.observe(imgRef.current);
  }, [lazy, threshold]);

  return (
    <ImgContainer ref={imgRef} size={size} style={{ opacity: loaded ? 1 : 0 }}>
      {blur && <div />}
      <img src={loaded ? src : '/images/translucent-logo.svg'} />
    </ImgContainer>
  );
};

export default AlbumPoster;

interface StyleProps {
  size?: number;
  src?: string;
}

const ImgContainer = styled.div`
  width: ${({ size }: StyleProps) => `${size}rem`};
  height: ${({ size }: StyleProps) => `${size}rem`};
  border-radius: 1rem;
  background: ${COLOR.white};
  box-shadow: 0px 0px 10px rgba(158, 158, 158, 0.25);

  & > div {
    position: absolute;
    z-index: 999;
    background: rgba(36, 36, 103, 0.16);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }

  & > img {
    max-width: 100%;
    max-height: 100%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
  }
`;
