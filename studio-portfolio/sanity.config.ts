import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

import {
  orderableDocumentListDeskItem,
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export default defineConfig({
  name: "default",
  title: "Portfolio",

  projectId: "y35cak1z",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            // ⭐ Draggable "Projects" list
            orderableDocumentListDeskItem({
              type: "project",
              title: "Projects (Drag to Sort)",
              S,
              context,
            }),

            // All other doc types except "project"
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "project"
            ),
          ]),
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
