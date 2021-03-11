"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Curso = use("App/Models/Curso");
/**
 * Resourceful controller for interacting with cursos
 */
class CursoController {
  /**
   * Show a list of all cursos.
   * GET cursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const cursos = await Curso.all();
    return cursos;
  }

  /**
   * Display a single curso.
   * GET cursos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const curso = await Curso.findOrFail(params.id);
    return curso;
  }

  /**
   * Create/save a new aluno.
   * POST cursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(["nome"]);
      const curso = await Curso.create(data);
      return curso;
    } catch (error) {
      response.status(500).send("Erro ao inserir curso!");
    }
  }

  /**
   * Update aluno details.
   * PUT or PATCH cursos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const curso = await Curso.findOrFail(params.id);
      const { nome } = request.only(["nome"]);
      curso.nome = nome;
      await curso.save();
      return curso;
    } catch (error) {
      response.status(500).send("Erro ao atualizar o curso!");
    }
  }

  /**
   * Delete a aluno with id.
   * DELETE cursos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const curso = await Curso.findOrFail(params.id);
      await curso.delete();
      return curso;
    } catch (error) {
      response.status(500).send("Erro ao apagar o curso!");
    }
  }
}

module.exports = CursoController;
