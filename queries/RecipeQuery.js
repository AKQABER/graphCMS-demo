import { GraphQLClient } from 'graphql-request';

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/ckj8baihtv3bn01xp67ry9sc8/master',
);

export async function recipeQuery(slug) {
  const { recipe } = await graphcms.request(
    `
      query RecipeQuery($slug: String!) {
        recipe(where: { slug: $slug }) {
          title
          cookingDuration
          description
          createdAt
          mainImage {
            url
          }
          recipeSteps {
            description
            image {
              url
            }
          }
        }
      }

    `,
    {
      slug,
    },
  );

  return { recipe };
}
