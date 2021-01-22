export const contentPageQuery = locale => `
  query ContentPageQuery($id: ID!) {
    page(where: { id: $id }, locales: [${locale}, en]) {
      slug
      title
      components {
        ... on HeadingBlock {
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
        ... on MarkdownBlock {
          type
          content
        }
      }
    }
  }
`;

export const allPagesOfTypeQuery = type => `
  {
    pages(where: {category: ${type}}) {
      slug
      localizations(includeCurrent: true) {
        id
        slug
        locale
      }
    }
  }
`;
