const request = require("supertest");
const app = require("../src/app");

let createdUserId;

// ##############################################################
// USERS CRUD TESTS
// ##############################################################
describe("Users Routes", () => {
  test("GET /users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(4);
  });

  test("POST /users > Missing Body", async () => {
    const response = await request(app)
      .post("/users")
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing required data.",
    });
  });

  test("POST /users > With Body", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Eliza Stone",
        email: "eliza@example.com",
        max_loans: 3,
      });
    expect(response.status).toBe(201);
    createdUserId = response.body.userId;
  });

  test("GET /users/:id > After POST", async () => {
    const response = await request(app).get(`/users/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Eliza Stone");
    expect(response.body.email).toEqual("eliza@example.com");
    expect(response.body.max_loans).toEqual(3);
  });

  test("PUT /users/:id > Missing Data", async () => {
    const response = await request(app).put(`/users/${createdUserId}`).send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing required data.",
    });
  });

  test("PUT /users/:id > User not found.", async () => {
    const response = await request(app).put("/users/999").send({
      name: "No One",
      email: "noone@example.com",
      max_loans: 1,
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "User not found.",
    });
  });

  test("PUT /users/:id > User Exists", async () => {
    const response = await request(app).put(`/users/${createdUserId}`).send({
      name: "Eliza S.",
      email: "eliza.s@example.com",
      max_loans: 4,
    });
    expect(response.status).toBe(204);
  });

  test("GET /users/:id > After PUT", async () => {
    const response = await request(app).get(`/users/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Eliza S.");
    expect(response.body.email).toEqual("eliza.s@example.com");
    expect(response.body.max_loans).toEqual(4);
  });

  test("DELETE /users/:id", async () => {
    const response = await request(app).delete(`/users/${createdUserId}`);
    expect(response.status).toBe(204);
  });

  test("GET /users/:id > After DELETE", async () => {
    const response = await request(app).get(`/users/${createdUserId}`);
    expect(response.status).toBe(404);
  });
});
