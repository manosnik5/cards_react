export const UserCollectionCardsModel = {
  table: "user_collection_cards",
  primaryKey: "id",

  columns: {
    id: { type: "integer", generated: true },

    user_collection_id: {
      type: "integer",
      nullable: false,
      references: {
        table: "user_collection",
        column: "id",
        onDelete: "CASCADE"
      }
    },

    cards_id: {
      type: "integer",
      nullable: false,
      references: {
        table: "cards",
        column: "id",
        onDelete: "CASCADE"
      }
    },

    unlocked: {
      type: "boolean",
      default: false
    }
  }
};
