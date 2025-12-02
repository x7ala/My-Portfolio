import { defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";


export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags", // shows nicely as tag inputs
      },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Websites", value: "websites" },
          { title: "Games", value: "games" },
          { title: "Apps", value: "apps" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown", // makes it a dropdown in Sanity Studio
  },
    },
    {
      name: "description",
      title: "Description",
      type: "array",
  of: [
    {
      type: "block",
      styles: [{ title: "Normal", value: "normal" }], // optional: headings, etc.
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [], // optional: links, etc.
      },
    },
  ],
},

  {
  name: "liveDemo",
  title: "Live Demo URL",
  type: "url",
  description: "Optional: Add a link to the live project.",
  validation: (Rule) => Rule.uri({
    scheme: ['http', 'https'], // ensures it's a valid URL
  }).optional()
},
    
    {
      name: "images",
      title: "Project Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "github",
      title: "GitHub Repo",
      type: "url",
    },
    orderRankField({ type: "project" }),
  ],
});
