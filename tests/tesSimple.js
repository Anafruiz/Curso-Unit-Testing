import chai from "chai";
import { expect } from "chai";
import { getYear, getHola } from "../controllers/helpers";
import IndexController from "../controllers/indexController";

describe("helpers", () => {
  //testea el método getYear
  describe("test getYear Function", () => {
    let year, myYear;
    before(() => {
      //Ejecuta este código una vez al principio del it, si ponemos after, lo crea una vez después de cada it
      year = getYear();
      myYear = new Date().getFullYear();
    });
    // const year = getYear();
    // const myYear = new Date().getFullYear();
    it("Devuelve un número", () => {
      // const year = getYear();
      expect(year).to.be.a("number");
    });
    it("Devuelve el año en curso", () => {
      // const myYear = new Date().getFullYear();
      // const year = getYear();
      expect(year).to.be.equal(myYear);
    });
    it("Otras comparaciones", () => {
      // const myYear = new Date().getFullYear();
      // const year = getYear();
      expect(year).to.be.at.most(myYear + 1);
      expect(year).to.be.at.least(myYear - 1);
      expect(year).to.be.within(2008, 2100);
      expect(year).not.to.be.NaN;
    });
  });
  //testea el método getHola
  describe("test getHola Function", () => {
    const saludo = getHola();

    it("Devuelve un string", () => {
      // const saludo = getHola();
      expect(saludo).to.be.a("string");
    });
    it("Devuelve un hola", () => {
      // const saludo = getHola();
      expect(saludo).to.have.string("Hola");
      expect(saludo).to.not.have.string("adios");
    });
  });
});
//testea tipos de datos
describe("test tipos de datos", () => {
  it("Comparando tipos", () => {
    const obj = {};
    expect(obj).to.be.a("Object");
    expect(obj).not.to.be.a("Array");
    let _null;
    expect(_null).to.be.undefined;
    _null = null;
    expect(_null).to.be.null;
  });
  it("Comparando objetos", () => {
    const obj1 = { name: "Ana" };
    const obj2 = { name: "Ana" };
    expect(obj1).to.have.property("name");
    expect(obj1).to.deep.equal(obj2);
    expect(obj1).to.have.any.keys(["name"]);
    expect(obj1).to.have.all.keys(["name"]);
    expect(obj1).to.be.instanceOf(Object);
    const instancia = new IndexController();
    expect(instancia).to.be.instanceOf(IndexController);
  });
  it("Comparando errores", () => {
    const generaError = () => {
      throw new TypeError("Error de ddbb");
    };
    expect(generaError).to.throw();
    expect(generaError).to.throw("ddbb");
    expect(generaError).to.throw(TypeError);
    const error = new TypeError("error de ddbb");
    error.code = 500;
    const generaError2 = () => {
      throw error;
    };
    expect(generaError2).to.throw(error);
    expect(generaError2).to.throw(TypeError).with.property("code", 500);
  });
});
