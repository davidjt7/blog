import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { NextSeo } from "next-seo";

export default function Index({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Head>
          <title>David Joseph Thomas</title>
        </Head>
        <NextSeo
          title="David Joseph Thomas"
          description="Software Engineer | JavaScript"
          openGraph={{
            url: 'https://blog-davidjt7.vercel.app/',
            title: 'David Joseph Thomas',
            description: 'Software Engineer | JavaScript',
            images: [
              {
                url: 'https://user-images.githubusercontent.com/17983341/111679796-8926a980-8847-11eb-9e69-3297edd554f0.png',
                width: 512,
                height: 512,
                alt: `David's Blog`,
              }
            ],
            site_name: `David's Blog`,
          }}
        />
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
