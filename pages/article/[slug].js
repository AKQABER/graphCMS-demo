import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fetcher from '../../modules/fetcher';
import getSWR from '../../modules/swr';
import renderComponent from '../../modules/renderComponent';
import {
  contentPageQuery,
  allPagesOfTypeQuery,
} from '../../queries/ContentPageQuery';

export async function getStaticProps({ params }) {
  const { page: article } = await fetcher(contentPageQuery, {
    slug: params.slug,
  });

  return {
    props: {
      article,
      slug: params.slug,
    },
  };
}

export async function getStaticPaths() {
  const query = allPagesOfTypeQuery('article');
  const { pages: articles } = await fetcher(query);

  return {
    paths: articles.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}

const Article = props => {
  const router = useRouter();
  const article = getSWR(
    [contentPageQuery, { slug: props.slug }],
    props.article,
  );

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

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
        return renderComponent(component);
      })}
    </div>
  );
};

export default Article;
