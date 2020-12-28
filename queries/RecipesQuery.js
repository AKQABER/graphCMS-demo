import { GraphQLClient } from 'graphql-request';

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/ckj8baihtv3bn01xp67ry9sc8/master',
);

export async function recipesQuery() {
  const recipes = await graphcms.request(`
    {
      recipes {
        slug
      }
    }
  `);

  return recipes;
}
