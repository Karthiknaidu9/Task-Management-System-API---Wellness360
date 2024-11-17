const request = require("supertest");
const app = require("../src/app");

describe("Task API", () => {
  it("should create a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=") // admin:password
      .send({ title: "Test Task", due_date: "2024-12-31" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });
});
