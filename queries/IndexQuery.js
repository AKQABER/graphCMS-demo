import { GraphQLClient } from 'graphql-request';

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/ckj8baihtv3bn01xp67ry9sc8/master',
);

export async function indexQuery() {
  const { recipes } = await graphcms.request(
    `
      { 
        recipes {
          slug
          title
          mainImage {
            url
          }
        }
      }
    `,
  );

  const { pages: articles } = await graphcms.request(
    `
      query ArticleQuery {
        pages(where: {category: article}) {
          slug
          title
        }
      }
    `,
  );

  const { pages: blogs } = await graphcms.request(
    `
      query BlogQuery {
        pages(where: {category: blog}) {
          slug
          title
        }
      }
    `,
  );

  return {
    recipes,
    articles,
    blogs,
  };
}
