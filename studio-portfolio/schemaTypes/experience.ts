import { defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    {
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
    of: [{ type: "block" }],
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "string",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "string",
    },
    {
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
