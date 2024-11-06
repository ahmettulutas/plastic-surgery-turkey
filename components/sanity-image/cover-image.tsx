import { urlForImage } from '@/lib/sanity/helpers/image-fns';
import { cn } from '@/lib/utils';
import { ImageType } from '@/types/images';
import Image from 'next/image';

type CoverImageProps = {
  image: ImageType;
  wrapperStyles?: string;
  height: number;
  width: number;
  priority?: boolean;
  imageStyles?: string;
  fill?: boolean;
};

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority, wrapperStyles, height, width, imageStyles, fill } = props;
  const image = source?.asset?._ref ? (
    <div
      className={cn(
        'shadow-small transition-shadow duration-200 hover:shadow-medium relative w-full h-full',
        wrapperStyles
      )}
    >
      <Image
        className={cn('h-auto w-full rounded-[3px]', imageStyles)}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        alt={`Image for ${source.alt}`}
        src={urlForImage(source.asset).height(height).width(width).url()}
        sizes='100vw'
        priority={priority}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );

  return image;
}
