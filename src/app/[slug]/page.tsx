import { getPostBySlug, getAllPosts } from '@/lib/blog'
import BlogPostClient from '@/components/BlogPostClient'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return <BlogPostClient post={post} />
}