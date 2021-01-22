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
  const query = allPagesOfTypeQuery('blog');
  const { pages } = await fetcher(query);
  const blogs = pages.map(p => p.localizations).flat();
  const pageId = blogs.find(a => a.slug === params.slug).id;
  const locale = params.locale;
  const pageQuery = contentPageQuery(locale);

  const { page: blog } = await fetcher(pageQuery, {
    id: pageId,
  });

  return {
    props: {
      locale,
      blog,
      pageId,
    },
  };
}

export async function getStaticPaths() {
  const query = allPagesOfTypeQuery('blog');
  const { pages } = await fetcher(query);
  const blogs = pages.map(p => p.localizations).flat();

  const pathMap = blogs.map(({ slug, locale }) => ({
    params: { locale, slug },
  }));

  return {
    paths: pathMap,
    fallback: true,
  };
}

const Blog = props => {
  const router = useRouter();
  const pageQuery = contentPageQuery(props.locale);
  const blog = getSWR([pageQuery, { id: props.pageId }], props.blog);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <LangSwitch />
      <div className="container">
        <Head>
          <title>{blog.title}</title>
        </Head>
        <Link href={`/${props.locale}`}>
          <h4>&laquo; Back to Home</h4>
        </Link>
        <h1>{blog.title}</h1>
        {blog.components.map(component => {
          return renderComponent(component);
        })}
      </div>
    </>
  );
};

export default Blog;
