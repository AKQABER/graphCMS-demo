import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fetcher from '../../modules/fetcher';
import getSWR from '../../modules/swr';
import parseComponent from '../../modules/parseComponent';
import {
  contentPageQuery,
  allPagesOfTypeQuery,
} from '../../queries/ContentPageQuery';

export async function getStaticProps({ params }) {
  const { page: blog } = await fetcher(contentPageQuery, { slug: params.slug });

  return {
    props: {
      blog,
      slug: params.slug,
    },
  };
}

export async function getStaticPaths() {
  const query = allPagesOfTypeQuery('blog');
  const { pages: blogs } = await fetcher(query);

  return {
    paths: blogs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

const Blog = props => {
  const router = useRouter();
  const blog = getSWR([contentPageQuery, { slug: props.slug }], props.blog);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <Head>
        <title>{blog.title}</title>
      </Head>
      <Link href="/">
        <h4>&laquo; Back to Home</h4>
      </Link>
      <h1>{blog.title}</h1>
      {blog.components.map(component => {
        return parseComponent(component);
      })}
    </div>
  );
};

export default Blog;
