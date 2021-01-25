export const recipeQuery = slug => `
  {
    recipe(where: { slug: "${slug}" }) {
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
`;

export const allRecipesQuery = `
  {
    recipes {
      slug
    }
  }
`;
