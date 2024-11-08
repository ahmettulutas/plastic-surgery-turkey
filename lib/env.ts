import { format } from 'date-fns';

const currentDate = new Date();
export const apiVersion = format(currentDate, 'yyyy-MM-dd') || '2023-12-30';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

export const baseUrl = assertValue(
  process.env.NEXT_PUBLIC_BASE_URL,
  'Missing environment variable: NEXT_PUBLIC_BASE_URL'
);
export const useCdn = true;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
