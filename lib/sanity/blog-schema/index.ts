import { BookIcon } from '@sanity/icons';
// import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

import categorySchema from '../category-schema';

export default defineType({
  name: 'blogs',
  title: 'Blogs',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().error('A slug is required to generate a page on the website'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: categorySchema.name }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/png, image/jpeg, image/gif, image/mov',
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'metaFields',
      title: 'Meta Fields',
      type: 'object',
      fields: [
        { name: 'title', title: 'Meta Title', type: 'string' },
        { name: 'description', title: 'Meta Description', type: 'string' },
      ],
    }),
  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //     author: 'author.name',
  //     date: 'date',
  //     media: 'coverImage',
  //   },
  //   prepare({ title, media, author, date }) {
  //     const subtitles = [
  //       author && `by ${author}`,
  //       date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
  //     ].filter(Boolean);

  //     return { title, media, subtitle: subtitles.join(' ') };
  //   },
  // },
});
