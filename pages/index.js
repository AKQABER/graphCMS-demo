import Head from 'next/head';
import Link from 'next/link';
import getSWR from '../modules/swr';
import fetcher from '../modules/fetcher';
import { indexRecipes, indexArticles, indexBlogs } from '../queries/IndexQuery';

export async function getStaticProps() {
  const recipes = await fetcher(indexRecipes);
  const articles = await fetcher(indexArticles);
  const blogs = await fetcher(indexBlogs);

  return {
    props: {
      recipes,
      articles,
      blogs,
    },
  };
}

const Index = props => {
  const { recipes } = getSWR(indexRecipes, props.recipes);
  const { pages: articles } = getSWR(indexArticles, props.articles);
  const { pages: blogs } = getSWR(indexBlogs, props.blogs);

  return (
    <div className="container">
      <Head>
        <title>Recipes</title>
      </Head>
      <h1>Recipes</h1>
      <div className="recipes-container">
        {recipes.length &&
          recipes.map(recipe => (
            <Link key={recipe.slug} href={`/recipes/${recipe.slug}`}>
              <div className="recipe-link">
                <img src={recipe.mainImage.url} alt={recipe.title} />
                {recipe.title}
              </div>
            </Link>
          ))}
      </div>
      <h1>Content</h1>
      <div className="contents-container">
        <div>
          <h2>Articles</h2>
          {articles.length &&
            articles.map(article => (
              <Link key={article.slug} href={`/article/${article.slug}`}>
                {article.title}
              </Link>
            ))}
        </div>
        <div>
          <h2>Blogs</h2>
          {blogs.length &&
            blogs.map(blog => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`}>
                {blog.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
