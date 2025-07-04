const { app } = require("../app");
const { factory, seed_db } = require("./util/seed_db");
const faker = require("@faker-js/faker").fakerEN_US;
const get_chai = require("./util/get_chai");
const User = require("../models/loginModel");

describe("tests for registration and logon", function () {
  it("should get the registration page", async () => {
    const { expect, request } = await get_chai();
    const res = await request.execute(app).get("/session/register").send();

    expect(res).to.have.status(200);
    const textNoLineEnd = res.text.replaceAll("\n", "");
    const csrfToken = /_csrf\" value=\"(.*?)\"/.exec(textNoLineEnd);
    this.csrfToken = csrfToken[1];

    const cookies = res.headers["set-cookie"];
    this.csrfCookie = cookies.find((c) => c.startsWith("csrfToken"));
  });

  it("should register the user", async () => {
    const { expect, request } = await get_chai();
    this.password = faker.internet.password();
    this.user = await factory.build("user", { password: this.password });

    const res = await request
      .execute(app)
      .post("/session/register")
      .set("Cookie", this.csrfCookie)
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        name: this.user.name,
        email: this.user.email,
        password: this.password,
        password1: this.password,
        _csrf: this.csrfToken,
      });

    expect(res).to.have.status(200);
    expect(res.text).to.include("Jobs List");

    const newUser = await User.findOne({ email: this.user.email });
    expect(newUser).to.not.be.null;
  });

  it("should log the user on", async () => {
    const { expect, request } = await get_chai();

    const res = await request
      .execute(app)
      .post("/session/logon")
      .set("Cookie", this.csrfCookie)
      .set("content-type", "application/x-www-form-urlencoded")
      .redirects(0)
      .send({
        email: this.user.email,
        password: this.password,
        _csrf: this.csrfToken,
      });

    expect(res).to.have.status(302);
    expect(res.headers.location).to.equal("/");

    const cookies = res.headers["set-cookie"];
    this.sessionCookie = cookies.find((c) => c.startsWith("connect.sid"));
  });

  it("should get the index page", async () => {
    const { expect, request } = await get_chai();
    const res = await request
      .execute(app)
      .get("/")
      .set("Cookie", `${this.csrfCookie}; ${this.sessionCookie}`)
      .send();

    expect(res).to.have.status(200);
    expect(res.text).to.include(this.user.name);
  });
});
