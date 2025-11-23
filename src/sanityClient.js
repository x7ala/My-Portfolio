import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "y35cak1z", // copy from Sanity Studio project settings
  dataset: "production",
  apiVersion: "2023-10-01", // or current date
  useCdn: false, // faster fetching; set false if you need real-time preview
});

// Helper function to build image URLs
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
