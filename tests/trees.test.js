const request = require("supertest");
const app = require("../src/app"); // Replace 'app' with the path to your Express.js application entry point

// ##############################################################
// SECTION A > TESTS
// ##############################################################
describe("Trees GET Routes", () => {
  test("GET /trees", (done) => {
    request(app)
      .get("/trees")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(15);
        done();
      });
  });
});

describe("Trees POST Routes", () => {
  test("POST /trees > No Body", (done) => {
    const response = request(app)
      .post("/trees")
      .send({})
      .then((response) => {
        expect(response.status).toBe(400);
        done();
      });
  });

  test("POST /trees > With Body", (done) => {
    const response = request(app)
      .post("/trees")
      .send({
        species: "Oak",
        age: 1,
        height: 3
      })
      .then((response) => {
        expect(response.status).toBe(201);
        done();
      });
  });

  test("GET /trees/:id > After POST", async () => {
    const response = await request(app).get("/trees/16");
    expect(response.status).toBe(200);
    expect(response.body.species).toEqual("Oak");
    expect(response.body.age).toEqual(1);
    expect(response.body.height).toEqual(3);
    // Assert the expected response or perform further validations
  });

  test("GET /trees > After POST > Check Length", async () => {
    const response = await request(app).get("/trees");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(16);
    // Assert the expected response or perform further validations
  });
});

describe("Trees PUT Routes", () => {
  test("PUT /trees/:id > Missing Data", async () => {
    const response = await request(app).put("/trees/16").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing required data.",
    });
    // Assert the expected response or perform further validations
  });

  test("PUT /trees/:id > Tree not found.", async () => {
    const response = await request(app).put("/trees/20").send({
      species: "Oak",
      age: 1,
      height: 3
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Tree not found.",
    });
    // Assert the expected response or perform further validations
  });

  test("PUT /trees/:id > Tree Exist", async () => {
    const response = await request(app).put("/trees/1").send({
      species: "Rain Tree",
      age: 8,
      height: 80
    });
    expect(response.status).toBe(204);
    // Assert the expected response or perform further validations
  });

  test("GET /trees/:id > After PUT", async () => {
    const response = await request(app).get("/trees/1");
    expect(response.status).toBe(200);
    expect(response.body.species).toEqual("Rain Tree");
    expect(response.body.age).toEqual(8);
    expect(response.body.height).toEqual(80);
    // Assert the expected response or perform further validations
  });
});

describe("Trees DELETE Routes", () => {
  test("DELETE /trees/:id", async () => {
    const response = await request(app).delete("/trees/3");
    expect(response.status).toBe(204);
    // Assert the expected response or perform further validations
  });

  test("GET /trees/:id > After DELETE", async () => {
    const response = await request(app).get("/trees/3");
    expect(response.status).toBe(404);
    // Assert the expected response or perform further validations
  });
});

// ##############################################################
// SECTION B > TESTS
// ##############################################################
describe("READ TREES BY USERID Route", () => {
  test("GET /users/:userId/trees", (done) => {
    request(app)
      .get("/users/3/trees")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(12);
        done();
      });
  });

  test("GET /users/:userId/trees", (done) => {
    request(app)
      .get("/users/1/trees")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(2);
        done();
      });
  });

  test("GET /users/:userId/trees", (done) => {
    request(app)
      .get("/users/4/trees")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(0);
        done();
      });
  });
});


describe("READ AVERAGE AGE OF TREES OWNED BY USER Route", () => {
  test("GET /users/:userId/trees/age/avg", (done) => {
    request(app)
      .get("/users/3/trees/age/avg")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(parseFloat(response.body.averageAge)).toEqual(9.5);
        expect(parseFloat(response.body.numberOfTrees)).toEqual(12);
        done();
      });
  });

  test("GET /users/:userId/trees/age/avg > No Trees", (done) => {
    request(app)
      .get("/users/4/trees/age/avg")
      .then((response) => {
        expect(response.status).toBe(404);
        done();
      });
  });

  test("GET /users/:userId/trees/age/avg", (done) => {
    request(app)
      .get("/users/1/trees/age/avg")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(parseFloat(response.body.averageAge)).toEqual(5);
        expect(parseFloat(response.body.numberOfTrees)).toEqual(2);
        done();
      });
  });
});


describe("WATER TREE BY USERID Route", () => {

  test("PUT /users/:userId/trees/:treeId/water > Not Owner", (done) => {
    request(app)
      .put("/users/1/trees/12/water")
      .then((response) => {
        expect(response.status).toBe(403);
        done();
      });
  });

  test("GET /trees/:treeId > After WRONG PUT NO CHANGE", (done) => {
    request(app)
      .get("/trees/12")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.watered_on).toEqual(response.body.planted_on);
        done();
      });
  });

  test("PUT /users/:userId/trees/:treeId/water > No Tree", (done) => {
    request(app)
      .put("/users/3/trees/20/water")
      .then((response) => {
        expect(response.status).toBe(404);
        done();
      });
  });

  test("PUT /users/:userId/trees/:treeId/water", (done) => {
    request(app)
      .put("/users/3/trees/12/water")
      .then((response) => {
        expect(response.status).toBe(204);
        done();
      });
  });

  test("GET /trees/:treeId > After PUT", (done) => {
    request(app)
      .get("/trees/12")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.watered_on).not.toEqual(response.body.planted_on);
        done();
      });
  });
});