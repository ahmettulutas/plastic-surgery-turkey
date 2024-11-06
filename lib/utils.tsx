import { Metadata, ResolvingMetadata } from 'next';

import { GenerateMetaImageProps } from '@/types/images';
import { LocaleType } from '@/types/localization';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import defaultOg from '../public/images/default-og.jpg';
import { ogImageSizes, twitterImageSizes } from './constants';
import { urlForImage } from './sanity/helpers/image-fns';
import { createTranslation } from './i18n';
import { availableLocales } from './i18n/settings';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateLocalesForMetaData = (languages: Array<string>) => {
  const locales: Record<string, string> = {};
  for (const key of languages) {
    locales[key] = key;
  }
  return locales;
};

export const generateMetaImages = ({ sanityImage, sizes, staticImage }: GenerateMetaImageProps) => {
  if (!sanityImage && !staticImage?.url) return [];
  const metaImages = [];
  if (sanityImage) {
    for (const { width, height } of sizes) {
      metaImages.push({
        width,
        height,
        alt: sanityImage?.alt ?? '',
        url: urlForImage(sanityImage)?.height(height).width(width).fit('crop').url(),
      });
    }
  }

  if (staticImage?.url) {
    for (const { width, height } of sizes) {
      metaImages.push({
        width,
        height,
        alt: staticImage?.alt ?? '',
        url: staticImage.url,
      });
    }
  }
  return metaImages;
};

export const getDefaultMetaData = async (
  currntLocale: LocaleType,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await createTranslation(currntLocale, 'translation'); // This is not actually a hook, so I intentionally ignored it here.
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: t('metaData.pageTitle'),
    description: t('metaData.pageDescription'),
    applicationName: t('metaData.applicationName'),
    category: t('metaData.category'),
    creator: 'Plastic Surgery Turkey Group',
    authors: [{ name: 'Plastic Surgery Turkey Group' }],
    publisher: 'Aesthemed',
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
    referrer: 'origin-when-cross-origin',
    keywords: [
      'health',
      'beauty',
      'plastic-surgery',
      'aesthetic-surgery',
      'clinic in Turkey',
      'Turkish plastic surgery clinic',
    ],
    // verification: {
    //   google: "3SXiPm6wc4OTk7JcwvRy4ednleq_oJ6qd9EJR41reZ4",
    // },
    openGraph: {
      title: t('metaData.pageTitle'),
      images: [
        ...generateMetaImages({
          staticImage: {
            url: defaultOg.src,
            alt: t('metaData.twitterImageAlt'),
          },
          sizes: ogImageSizes,
        }),
        ...previousImages,
      ],
      locale: currntLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaData.pageTitle'),
      description: t('metaData.pageDescription'),
      images: [
        ...generateMetaImages({
          staticImage: {
            url: defaultOg.src,
            alt: t('metaData.twitterImageAlt'),
          },
          sizes: twitterImageSizes,
        }),
        ...previousImages,
      ],
    },
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    alternates: {
      canonical: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
      languages: generateLocalesForMetaData(availableLocales),
    },
  };
};
