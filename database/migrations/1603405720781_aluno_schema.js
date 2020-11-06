"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlunoSchema extends Schema {
  up() {
    this.create("alunos", (table) => {
      table.increments();
      table.string("nome").notNullable().unique();
      table
        .integer("curso_id")
        .unsigned()
        .references("id")
        .inTable("cursos")
        .onUpdate("cascade")
        .onDelete("cascade")
        .notNullable();
      table.text("descricao");
      table.timestamps();
    });
  }

  down() {
    this.drop("alunos");
  }
}

module.exports = AlunoSchema;
