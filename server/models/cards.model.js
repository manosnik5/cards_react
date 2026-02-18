export const CardsModel = {
  table: "cards",
  primaryKey: "id",

  columns: {
    id: { type: "integer" },
    name: { type: "text", nullable: false },
    type: { type: "text" },
    humanreadablecardtype: { type: "text" },
    frametype: { type: "text" },
    description: { type: "text" },
    race: { type: "text" },
    attack: { type: "integer" },
    defense: { type: "integer" },
    level: { type: "integer" },
    attribute: { type: "text" },
    archetype: { type: "text" },
    rarity: { type: "text" },
    set: { type: "text" },
    image: { type: "text" }
  }
};
