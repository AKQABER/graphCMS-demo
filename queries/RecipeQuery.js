export const recipeQuery = `
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
`;
