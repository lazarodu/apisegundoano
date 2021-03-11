"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Aluno = use("App/Models/Aluno");
/**
 * Resourceful controller for interacting with alunos
 */
class AlunoController {
  /**
   * Show a list of all alunos.
   * GET alunos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const alunos = await Aluno.query().with(["curso"]).fetch();
    return alunos;
  }

  /**
   * Create/save a new aluno.
   * POST alunos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(["curso_id", "nome", "descricao"]);
      // console.log(auth.user.id);
      const aluno = await Aluno.create(data);
      return aluno;
    } catch (error) {
      response.status(500).send("Erro ao inserir aluno!");
    }
  }

  /**
   * Display a single aluno.
   * GET alunos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const aluno = await Aluno.findOrFail(params.id);
    return aluno;
    // const aluno = await Aluno.query().where("curso_id", params.id).fetch();
    // return aluno;
  }

  /**
   * Display alunos of cursos.
   * GET alunos/:id/cursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async cursos({ params, request, response, view }) {
    // const aluno = await Aluno.findOrFail(params.id);
    // return aluno;
    const aluno = await Aluno.query().where("curso_id", params.id).fetch();
    return aluno;
  }

  /**
   * Update aluno details.
   * PUT or PATCH alunos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const aluno = await Aluno.findOrFail(params.id);
      const { nome, curso_id, descricao } = request.only([
        "nome",
        "curso_id",
        "descricao",
      ]);
      aluno.nome = nome;
      aluno.curso_id = curso_id;
      aluno.descricao = descricao;
      await aluno.save();
      return aluno;
    } catch (error) {
      response.status(500).send("Erro ao atualizar o aluno!");
    }
  }

  /**
   * Delete a aluno with id.
   * DELETE alunos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const aluno = await Aluno.findOrFail(params.id);
      await aluno.delete();
      return aluno;
    } catch (error) {
      response.status(500).send("Erro ao apagar o aluno!");
    }
  }
}

module.exports = AlunoController;
