import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import { app, serve } from "../app";
import { getData } from "../controllers/indexController";
import { deleteItem } from "../controllers/deleteController";
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
describe("Http Index", () => {
  after((done) => {
    serve.close();
    done();
  });
  describe("control de los datos del array", () => {
    let lastId;
    beforeEach((done) => {
      chai
        .request(app)
        .post("/new")
        .send({
          subject: "Registo para test",
          description: "Esta es la descripción",
        })
        .end((err, res) => {
          done();
        });
    });
    afterEach((done) => {
      deleteItem(lastId).then(() => {
        done();
      });
    });
    it("Debe recibirse un array con los ToDos", (done) => {
      getData().then((data) => {
        expect(data).not.to.be.empty;
        lastId = data[data.length - 1].id;
        done();
      });
    });
  });
});
