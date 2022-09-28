import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../types/post'
import { createContext, useEffect, useState } from 'react'

type Props = {
  allPosts: Post[]
}
export const LoggedInContext = createContext({loggedIn: false})

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInCookie = document.cookie?.split('loggedIn=')[1] === 'true' ? true: false
    console.log(loggedInCookie)
    setLoggedIn(loggedInCookie)
  }, [])

  return (
    <>
      <LoggedInContext.Provider value={{loggedIn}}>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
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
              premium={heroPost.premium}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
      </LoggedInContext.Provider>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'premium',
  ])

  return {
    props: { allPosts },
  }
}
