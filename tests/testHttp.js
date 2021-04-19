import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import { getData } from "../controllers/indexController";
chai.use(chaiHttp);
chai.should();
describe("Get 404", () => {
  describe("GET /", () => {
    it("Debe recibirse un código 404", () => {
      return chai
        .request(app)
        .get("/bu")
        .then(
          (res) => {
            res.should.have.status(404);
          },
          (err) => {
            Promise.reject();
          }
        );
    });
  });
});
describe("Http Index", () => {
  describe("GET /", () => {
    it("Debe recibirse un código 200", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

it("Debe recibirse un array con los ToDos", (done) => {
  getData().then((data) => {
    expect(data).not.to.be.empty;

    done();
  });
});
