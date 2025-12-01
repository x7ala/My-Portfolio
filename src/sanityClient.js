import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

console.log("ENV CHECK:", process.env.REACT_APP_SANITY_PROJECT_ID);


export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  apiVersion: "2023-10-01", // or current date
  useCdn: false, // faster fetching; set false if you need real-time preview
});

// Helper function to build image URLs
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
