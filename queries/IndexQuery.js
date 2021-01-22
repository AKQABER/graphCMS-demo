export const indexRecipes = `
  { 
    recipes {
      slug
      title
      mainImage {
        url
      }
    }
  }
`;

export const indexArticles = locale => `
  query ArticleQuery {
    pages(where: {category: article}, locales: [${locale}]) {
      slug
      title
    }
  }
`;

export const indexBlogs = locale => `
  query BlogQuery {
    pages(where: {category: blog}, locales: [${locale}]) {
      slug
      title
    }
  }
`;
