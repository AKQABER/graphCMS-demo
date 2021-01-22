import Head from 'next/head';
import Link from 'next/link';
import getSWR from '../../modules/swr';
import fetcher from '../../modules/fetcher';
import {
  indexRecipes,
  indexArticles,
  indexBlogs,
} from '../../queries/IndexQuery';
import LangSwitch from '../../components/LangSwitch';

export async function getStaticProps({ params }) {
  const locale = params.locale;
  const blogQuery = indexBlogs(locale);
  const articleQuery = indexArticles(locale);

  const recipes = await fetcher(indexRecipes);
  const articles = await fetcher(articleQuery);
  const blogs = await fetcher(blogQuery);

  return {
    props: {
      locale,
      recipes,
      articles,
      blogs,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: 'en' } }, { params: { locale: 'de' } }],
    fallback: false,
  };
}

const Index = props => {
  const blogQuery = indexBlogs(props.locale);
  const articleQuery = indexArticles(props.locale);
  const { recipes } = getSWR(indexRecipes, props.recipes);
  const { pages: articles } = getSWR(articleQuery, props.articles);
  const { pages: blogs } = getSWR(blogQuery, props.blogs);

  return (
    <>
      <LangSwitch />
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
                <Link
                  key={article.slug}
                  href={`/${props.locale}/article/${article.slug}`}>
                  {article.title}
                </Link>
              ))}
          </div>
          <div>
            <h2>Blogs</h2>
            {blogs.length &&
              blogs.map(blog => (
                <Link
                  key={blog.slug}
                  href={`/${props.locale}/blog/${blog.slug}`}>
                  {blog.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
