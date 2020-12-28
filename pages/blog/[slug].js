import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import parseComponent from '../../modules/parseComponent';
import {
  contentPageQuery,
  allPagesOfTypeQuery,
} from '../../queries/ContentPageQuery';

export async function getStaticProps({ params }) {
  const { page: blog } = await contentPageQuery(params.slug);

  return {
    props: {
      blog,
    },
  };
}

export async function getStaticPaths() {
  const { pages: blogs } = await allPagesOfTypeQuery('blog');

  return {
    paths: blogs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

const Blog = ({ blog }) => {
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
