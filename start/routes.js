"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/register", "AuthController.register");
Route.post("/authenticate", "AuthController.authenticate");

Route.group(() => {
  Route.get("/cursos", "CursoController.index");
  Route.resource("alunos", "AlunoController").apiOnly();
  // Route.post("/alunos", "AlunoController.store");
  // Route.get("/alunos/:id", "AlunoController.show");
  // Route.get("/alunos", "AlunoController.index");
  // Route.put("/alunos/:id", "AlunoController.update");
  // Route.delete("/alunos/:id", "AlunoController.destroy");
}).middleware(["auth"]);
