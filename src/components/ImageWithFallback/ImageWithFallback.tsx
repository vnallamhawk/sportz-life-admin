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
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {!error ? (
        <Image
          {...rest}
          width={width}
          height={height}
          src={imgSrc}
          alt={alt}
          onError={() => {
            setImgSrc(fallbackSrc);
            setError(true);
          }}
        />
      ) : (
        <img
          width={width}
          height={height}
          src={fallbackSrc}
          alt="fallback"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
