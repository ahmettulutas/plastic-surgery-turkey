/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { documentInternationalization } from '@sanity/document-internationalization';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { SANITY_URL } from './lib/constants';
import { apiVersion, dataset, projectId } from './lib/env';
import { schema } from './lib/sanity/schema';

export default defineConfig({
  basePath: SANITY_URL,
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'tr', title: 'Turkish' },
        { id: 'de', title: 'German' },
      ],
      schemaTypes: ['blogs'],
    }),
  ],
});
