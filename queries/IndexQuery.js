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

export const indexArticles = `
  query ArticleQuery {
    pages(where: {category: article}) {
      slug
      title
    }
  }
`;

export const indexBlogs = `
  query BlogQuery {
    pages(where: {category: blog}) {
      slug
      title
    }
  }
`;
