const { app } = require("../app");
const get_chai = require("../util/get_chai");

describe("Multiply API", () => {
  it("should return 42", async () => {
    const { expect, request } = await get_chai();
    const res = await request.execute(app)
      .get("/multiply")
      .query({ first: 6, second: 7 })
      .send();
    expect(res).to.have.status(200);
    expect(res.body.result).to.equal(42);
  });
});
