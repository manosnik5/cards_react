export const PacksModel = {
  table: "packs",
  primaryKey: "id",

  columns: {
    id: { type: "integer", generated: true },
    pack_name: { type: "text", nullable: false },
    pack_image: { type: "text" },
    pack_year: { type: "integer" }
  }
};
