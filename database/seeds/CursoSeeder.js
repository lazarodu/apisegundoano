"use strict";

/*
|--------------------------------------------------------------------------
| CursoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Curso = use("App/Models/Curso");

class CursoSeeder {
  async run() {
    const cursos = [
      { nome: "Informática" },
      { nome: "Edificações" },
      { nome: "Mecatrônica" },
    ];
    await Curso.createMany(cursos);
  }
}

module.exports = CursoSeeder;
