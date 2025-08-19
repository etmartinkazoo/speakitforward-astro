import { directus } from './directus'
import { readItems } from '@directus/sdk'

// Default fields for blog posts
const defaultPostFields = [
  '*',
  {
    author: ['*'],
    category: ['*'],
    featured_image: ['*'], // If you have a featured image
  },
]

// Get all published posts
export const getAllPosts = async () => {
  try {
    const queryObj = {
      fields: defaultPostFields,
      filter: {
        status: {
          _eq: 'published',
        },
      },
      sort: ['-date_created'], // Sort by newest first
    }

    //@ts-ignore
    const data: any = await directus.request(readItems('posts', queryObj))

    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Get a single post by slug
export const getPostBySlug = async (slug: string) => {
  try {
    const queryObj = {
      fields: defaultPostFields,
      filter: {
        slug: {
          _eq: slug,
        },
        status: {
          _eq: 'published',
        },
      },
      limit: 1,
    }

    //@ts-ignore
    const data: any = await directus.request(readItems('posts', queryObj))

    return Array.isArray(data) && data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}
