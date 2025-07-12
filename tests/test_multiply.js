const multiply = require("../util/multiply");
const get_chai = require("../util/get_chai");

describe("Multiply function", () => {
  it("should return 42", async () => {
    const { expect } = await get_chai();
    expect(multiply(6, 7)).to.equal(42);
  });
});
