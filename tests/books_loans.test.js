const request = require("supertest");
const app = require("../src/app");

describe("Books endpoints", () => {
  test("GET /books/recommend/:userId returns books user has never borrowed", async () => {
    const response = await request(app).get("/books/recommend/1");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3); // user 1 has borrowed 7/10 books
  });

  test("GET /books/search filters by category", async () => {
    const response = await request(app).get("/books/search").query({ category: "Technology" });
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
  });

  test("POST /books creates a new book", async () => {
    const response = await request(app)
      .post("/books")
      .send({
        title: "Testing Adventures",
        author: "QA Bot",
        category: "Adventure",
        published_year: 2025
      });
    expect(response.status).toBe(201);
    expect(response.body.bookId).toBeDefined();
  });
});

describe("Loans endpoints", () => {
  test("POST /loans/new/:userId/:bookId succeeds when user can loan and book available", async () => {
    const response = await request(app).post("/loans/new/1/5");
    expect(response.status).toBe(201);
    expect(response.body.loanId).toBeDefined();
  });

  test("POST /loans/new/:userId/:bookId fails when book is already on loan", async () => {
    const response = await request(app).post("/loans/new/2/4");
    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: "Book is currently on loan."
    });
  });

  test("POST /loans/new/:userId/:bookId enforces user max_loans", async () => {
    const first = await request(app).post("/loans/new/4/9");
    expect(first.status).toBe(201);
    const second = await request(app).post("/loans/new/4/2");
    expect(second.status).toBe(201);
    const third = await request(app).post("/loans/new/4/3");
    expect(third.status).toBe(400);
    expect(third.body).toEqual({
      message: "User has reached maximum active loans."
    });
  });

  test("GET /loans/summary/:userId returns active and past loans", async () => {
    const response = await request(app).get("/loans/summary/1");
    expect(response.status).toBe(200);
    expect(response.body.active.length).toBeGreaterThanOrEqual(3);
    expect(response.body.past.length).toBeGreaterThanOrEqual(3);
  });
});
