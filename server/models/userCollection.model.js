export const UserCollectionModel = {
  table: "user_collection",
  primaryKey: "id",

  columns: {
    id: { type: "integer", generated: true },
    user_id: {
      type: "integer",
      nullable: false,
      references: {
        table: "users",
        column: "userid",
        onDelete: "CASCADE"
      }
    }
  }
};
