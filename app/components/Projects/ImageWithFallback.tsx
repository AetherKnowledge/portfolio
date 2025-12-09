"use client";
import Image from "next/image";
import { ComponentProps, useState } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

const ImageWithFallback = (
  props: Omit<ComponentProps<typeof Image>, "src"> & {
    src: string | undefined | null;
  }
) => {
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {hasError || !props.src ? (
        <MdOutlineImageNotSupported className="w-50 h-50" />
      ) : (
        <Image {...props} src={props.src} onError={() => setHasError(true)} />
      )}
    </>
  );
};

export default ImageWithFallback;
