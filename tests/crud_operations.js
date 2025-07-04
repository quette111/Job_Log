const { app } = require("../app");
const { factory, seed_db, testUserPassword } = require("../util/seed_db");
const Job = require("../models/User");
const get_chai = require("../util/get_chai");


describe("CRUD operation tests", function () {
  before(async function () {
    const { expect, request } = await get_chai();

    // Seed DB with test user and jobs
    this.test_user = await seed_db();

    // Get CSRF token and cookie from logon form
    let req = request.execute(app).get("/session/logon").send();
    let res = await req;
    const textNoLineEnd = res.text.replaceAll("\n", "");
    this.csrfToken = /_csrf\" value=\"(.*?)\"/.exec(textNoLineEnd)[1];
    let cookies = res.headers["set-cookie"];
    this.csrfCookie = cookies.find((el) => el.startsWith("csrfToken"));

    // Log in the seeded test user
    const dataToPost = {
      email: this.test_user.email,
      password: testUserPassword,
      _csrf: this.csrfToken,
    };
    req = request
      .execute(app)
      .post("/session/logon")
      .set("Cookie", this.csrfCookie)
      .set("content-type", "application/x-www-form-urlencoded")
      .redirects(0)
      .send(dataToPost);
    res = await req;
    cookies = res.headers["set-cookie"];
    this.sessionCookie = cookies.find((el) => el.startsWith("connect.sid"));

    expect(this.csrfToken).to.not.be.undefined;
    expect(this.sessionCookie).to.not.be.undefined;
    expect(this.csrfCookie).to.not.be.undefined;
  });

  it("should load the job list page with 20 entries", async function () {
    const { expect, request } = await get_chai();
    const req = request
      .execute(app)
      .get("/")
      .set("Cookie", this.csrfCookie + ";" + this.sessionCookie)
      .send();
    const res = await req;
    expect(res).to.have.status(200);
    const pageParts = res.text.split("<tr>");
    expect(pageParts.length).to.equal(21); // 20 jobs + 1 header row
  });

  it("should add a new job entry", async function () {
    const { expect, request } = await get_chai();
    const newJob = await factory.build("job");

    const dataToPost = {
      company: newJob.company,
      position: newJob.position,
      status: newJob.status,
      _csrf: this.csrfToken,
    };

    const req = request
      .execute(app)
      .post("/jobs")
      .set("Cookie", this.csrfCookie + ";" + this.sessionCookie)
      .set("content-type", "application/x-www-form-urlencoded")
      .send(dataToPost);
    const res = await req;
    expect(res).to.have.status(200);
    expect(res.text).to.include("Job entry has been added");

    const jobs = await Job.find({ createdBy: this.test_user._id });
    expect(jobs.length).to.equal(21); // 20 seeded + 1 new
  });
});
