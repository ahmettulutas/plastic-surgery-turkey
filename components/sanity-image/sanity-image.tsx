import { urlForImage } from '@/lib/sanity/helpers/image-fns';
import { cn } from '@/lib/utils';
import { ImageType } from '@/types/images';
import Image from 'next/image';

type SanityImageProps = {
  image?: ImageType;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  wrapperStyles?: string;
  imageClasses?: string;
  priority?: boolean;
};

export default function SanityImage(props: Readonly<SanityImageProps>) {
  const {
    image,
    alt = 'Cover image',
    width = 3500,
    height = 2000,
    sizes = '(max-width: 600px) 90vw, (max-width: 1200px) 60vw, 500px',
    wrapperStyles,
    imageClasses,
    priority = false,
  } = props;
  const imageUrl =
    image?.asset && urlForImage(image?.asset)?.height(height).width(width).fit('fill').url();
  /*   const blurUrl = urlForImage(image).width(20).quality(20).url(); */
  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-[3px] bg-gray-50 dark:bg-dark-bg relative h-full',
        wrapperStyles
      )}
    >
      {imageUrl && (
        <Image
          className={cn('h-auto w-full rounded-[3px]', imageClasses)}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          src={imageUrl}
          priority={priority}
        />
      )}
    </div>
  );
}
