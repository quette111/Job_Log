const { app } = require("../app");
const get_chai = require("../util/get_chai");

describe("UI Tests", () => {
  it("gets the home page", async () => {
    const { expect, request } = await get_chai();
    const res = await request.execute(app).get("/").send();
    expect(res).to.have.status(200);
    expect(res.text).to.include("Click this link");
  });
});
