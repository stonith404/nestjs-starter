// PROD
// Seed data for production and development
const user = {
  id: "2277a6a6-e678-429e-bbc8-6a4e83c47e88",
  firstName: "Demo",
  lastName: "User",
  email: "demo@myapp.com",
  password: "Password123",
};

// DEV
// Seed data only for development
const books = [
  {
    id: "7637bee1-c757-476e-a3db-3075fd8cdbba",
    title: "The Lord of the Rings",
    authorId: user.id,
  },
  {
    id: "9f7dbbc7-0cf2-453d-8c78-2ac187e84a3f",
    title: "The Hobbit",
    authorId: user.id,
  },
  {
    id: "36d85ca5-e170-4778-be2b-70573cf91386",
    title: "The Silmarillion",
    authorId: user.id,
  },
  {
    id: "0c969273-ceeb-484a-b8ed-17e8f5f8254a",
    title: "The Children of Húrin",
    authorId: user.id,
  },
];

export default {
  user,
  books,
};
