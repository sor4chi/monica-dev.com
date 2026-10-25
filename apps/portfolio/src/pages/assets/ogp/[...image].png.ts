import { getCollection } from 'astro:content'

import { createOgp } from '@/utils/ogp'

import type { APIRoute, GetStaticPaths } from 'astro'

export const getStaticPaths = (async () => {
  const [blogs, works] = await Promise.all([
    getCollection('blogs'),
    getCollection('works'),
  ])
  return [
    { params: { image: 'default' }, props: { title: "Monica's Portfolio" } },
    ...blogs.map(({ id, data }) => ({
      params: { image: `blogs/${id}` },
      props: { title: data.title },
    })),
    ...works.map(({ id, data }) => ({
      params: { image: `works/${id}` },
      props: { title: data.title },
    })),
  ]
}) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props }) => {
  const png = await createOgp(props.title)
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  })
}
