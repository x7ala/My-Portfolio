import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"
import { schemaTypes } from "./schemaTypes"

export default defineConfig({
  name: "default",
  title: "Portfolio",

  projectId: "y35cak1z",
  dataset: "production",

  plugins: [
    deskTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            // ⭐ Draggable Projects
            orderableDocumentListDeskItem({
              type: "project",
              title: "Projects",
              S,
              context,
            }),

            // ⭐ Homepage
            S.documentTypeListItem("homepage").title("Homepage Content"),

            // ⭐ Experience
            S.documentTypeListItem("experience").title("Experience"),

            // ⭐ Include all other schemas automatically
            ...S.documentTypeListItems().filter((item) => {
              const id = item.getId() ?? ""
              return !["project", "homepage", "experience"].includes(id)
            }),
          ]),
    }),

    visionTool(),
  ],

  schema: { types: schemaTypes },
})
