"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Aluno extends Model {
  curso() {
    return this.belongsTo("App/Models/Curso");
  }
}

module.exports = Aluno;
