import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'lq4so9ao',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache for immediate updates
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};
