import mongoose from "mongoose";
import CartManagerDB from "../DAL/dao/cartManagerMongo.js";
import supertest from "supertest";
import * as chai from 'chai';
import env from "../config/config.js";

const { userDb, passwordDb } = env;

mongoose
  .connect(`mongodb+srv://${userDb}:${passwordDb}@cluster0.cjinh2b.mongodb.net/ecommerce?retryWrites=true&w=majority`);

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe('Testing Cart DAO Mocha/Chai/SuperTest', () => {
    before(function () {
        this.cartsDao = new CartManagerDB()
    })

    it("El DAO debe agregar un carrito en la DB", async function () {
        const result = await requester.post('/api/carts')
        console.log(result)
        expect(result._body).to.have.property('result')
        expect(result._body.result).to.have.property('products')
        expect(result._body.result).to.have.property('_id')
    })

    after(function(done) {
        this.timeout(5000);
        console.log("Fin de las pruebas de Cart");
        done();
    });
})