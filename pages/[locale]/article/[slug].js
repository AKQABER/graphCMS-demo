import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fetcher from '../../../modules/fetcher';
import getSWR from '../../../modules/swr';
import renderComponent from '../../../modules/renderComponent';
import {
  contentPageQuery,
  allPagesOfTypeQuery,
} from '../../../queries/ContentPageQuery';
import LangSwitch from '../../../components/LangSwitch';

export async function getStaticProps({ params }) {
  const query = allPagesOfTypeQuery('article');
  const { pages } = await fetcher(query);
  const articles = pages.map(p => p.localizations).flat();
  const pageId = articles.find(a => a.slug === params.slug).id;
  const locale = params.locale;
  const pageQuery = contentPageQuery(locale);

  const { page: article } = await fetcher(pageQuery, {
    id: pageId,
  });

  return {
    props: {
      locale,
      article,
      pageId,
    },
  };
}

export async function getStaticPaths() {
  const query = allPagesOfTypeQuery('article');
  const { pages } = await fetcher(query);
  const articles = pages.map(p => p.localizations).flat();

  const pathMap = articles.map(({ slug, locale }) => ({
    params: { locale, slug },
  }));

  return {
    paths: pathMap,
    fallback: true,
  };
}

const Article = props => {
  const pageQuery = contentPageQuery(props.locale);

  const router = useRouter();
  const article = getSWR([pageQuery, { id: props.pageId }], props.article);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <LangSwitch />
      <div className="container">
        <Head>
          <title>{article.title}</title>
        </Head>
        <Link href={`/${props.locale}`}>
          <h4>&laquo; Back to Home</h4>
        </Link>
        <h1>{article.title}</h1>
        {article.components.map(component => {
          return renderComponent(component);
        })}
      </div>
    </>
  );
};

export default Article;
