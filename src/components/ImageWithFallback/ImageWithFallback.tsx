import React, { useState } from "react";
import Image from "next/image";

const ImageWithFallback = ({
  height,
  width,
  src,
  fallbackSrc,
  alt,
  ...rest
}: {
  height: number;
  width: number;
  src: string;
  fallbackSrc: string;
  alt: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      width={width}
      height={height}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
