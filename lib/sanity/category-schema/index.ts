import { ClipboardImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { availableLocales } from '@/lib/i18n/settings';

export default defineType({
  name: 'category',
  title: 'Category',
  icon: ClipboardImageIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',

      title: 'Category Name',
      type: 'object',
      fields: availableLocales.map((lang) => ({
        title: lang,
        name: lang,
        type: 'string',
      })),

      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Please define a slug for this category.'),
    }),
  ],
});
