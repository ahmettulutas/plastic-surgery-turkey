import {
  allBlogsQuery,
  blogAndMoreBlogsQuery,
  blogBySlugQuery,
  BlogPost,
  blogSlugsQuery,
} from '@/lib/sanity/helpers/queries';
import { getClient } from '@/lib/sanity/helpers/sanity-client';

const client = getClient();

export async function getAllBlogs(language: string): Promise<BlogPost[]> {
  const res = await client.fetch(allBlogsQuery, { language });
  return res || [];
}

export async function getAllBlogsSlugs(): Promise<
  Pick<BlogPost, 'slug' | 'language' | '_updatedAt'>[]
> {
  const slugs =
    (await client.fetch<{ slug: string; language: string; _updatedAt: string }[]>(
      blogSlugsQuery
    )) || [];
  return slugs.map(({ slug, language, _updatedAt }) => ({
    slug,
    language,
    _updatedAt,
  }));
}

export async function getBlogBySlug(slug: string, language: string): Promise<BlogPost> {
  return await client.fetch<BlogPost>(blogBySlugQuery, { slug, language });
}

export async function getBlogsAndMoreStories(
  slug: string,
  language: string
): Promise<{ blog: BlogPost; moreBlogs: BlogPost[] }> {
  return await client.fetch(blogAndMoreBlogsQuery, { slug, language });
}
