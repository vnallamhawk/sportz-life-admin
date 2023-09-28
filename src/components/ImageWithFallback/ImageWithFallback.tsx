import React, { useState } from "react";
import Image from "next/image";

const ImageWithFallback = ({
  className,
  height,
  width,
  src,
  fallbackSrc,
  alt,
  ...rest
}: {
  className?: string;
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
      className={className}
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
