import { createClient } from "next-sanity"
import ImageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  apiVersion: "2024-03-29",
  dataset: "production",
  projectId: "4pk7jxmy",
  useCdn: false
})
const builder = ImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
