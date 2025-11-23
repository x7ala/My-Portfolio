import { defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage Content",
  type: "document",
  fields: [
    {
      name: "intro",
      title: "Introduction Text",
      type: "array",
      of: [{ type: "block" }]
    },
    {
      name: "resumeFile",
      title: "Resume PDF",
      type: "file",
      description: "Upload your resume.",
      options: {
        accept: "application/pdf",
      },
    },
    {
        name: "profileImage",
        title: "Profile Image",
        type: "image",
        options: {
            hotspot: true // lets you crop the image
        }
    }
  ],
});