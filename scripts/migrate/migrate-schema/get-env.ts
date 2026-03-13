import { createClient } from 'contentful-management'

export async function getEnv(target: string) {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN!
  })

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  return space.getEnvironment(target)
}