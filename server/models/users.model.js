export const UsersModel = {
  table: "users",
  primaryKey: "userid",

  columns: {
    userid: {
      type: "integer",
      generated: true
    },
    username: {
      type: "varchar",
      length: 255,
      unique: true,
      nullable: false
    },
    email: {
      type: "varchar",
      length: 255,
      unique: true,
      nullable: false
    },
    password: {
      type: "varchar",
      length: 255,
      nullable: false
    },
    role: {
      type: "varchar",
      length: 50,
      default: "User",
      nullable: false
    }
  }
};
