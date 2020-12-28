import { GraphQLClient } from 'graphql-request';

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/ckj8baihtv3bn01xp67ry9sc8/master',
);

export async function contentPageQuery(slug) {
  const page = await graphcms.request(
    `
      query ContentPageQuery($slug: String!) {
        page(where: { slug: $slug }) {
          slug
          title
          components {
            ... on HeadingBlock {
              id
              heading
              type
            }
            ... on ImageBlock {
              link
              image {
                url
              }
              description
              type
            }
            ... on TextBlock {
              content
              title
              type
            }
          }
        }
      }
    `,
    {
      slug,
    },
  );

  return page;
}

export async function allPagesOfTypeQuery(type) {
  const pages = await graphcms.request(`
    {
      pages(where: {category: ${type}}) {
        slug
      }
    }
  `);

  return pages;
}
