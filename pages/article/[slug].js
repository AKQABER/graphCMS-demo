import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import parseComponent from '../../modules/parseComponent';
import {
  contentPageQuery,
  allPagesOfTypeQuery,
} from '../../queries/ContentPageQuery';

export async function getStaticProps({ params }) {
  const { page: article } = await contentPageQuery(params.slug);

  return {
    props: {
      article,
    },
  };
}

export async function getStaticPaths() {
  const { pages: articles } = await allPagesOfTypeQuery('article');

  return {
    paths: articles.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

const Article = ({ article }) => {
  return (
    <div className="container">
      <Head>
        <title>{article.title}</title>
      </Head>
      <Link href="/">
        <h4>&laquo; Back to Home</h4>
      </Link>
      <h1>{article.title}</h1>
      {article.components.map(component => {
        return parseComponent(component);
      })}
    </div>
  );
};

export default Article;
