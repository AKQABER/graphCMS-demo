export const contentPageQuery = `
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
`;

export const allPagesOfTypeQuery = type => `
  {
    pages(where: {category: ${type}}) {
      slug
    }
  }
`;
