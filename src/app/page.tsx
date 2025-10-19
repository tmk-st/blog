import { getAllPosts } from '@/lib/blog'
import HomeClient from '@/components/HomeClient'

export default function Home() {
  const allPosts = getAllPosts()

  return <HomeClient posts={allPosts} />
}