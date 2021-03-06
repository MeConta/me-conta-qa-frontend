/// <reference types="Cypress" />

import faker from "@faker-js/faker";
import { tiposDeUsuario } from "../../../../constants/constants";
faker.setLocale("pt_BR");

const name = "Maria Silva Só";
let email = faker.internet.email();

context("funcionalidade: completar dados pessoais", () => {
  before (() => {
    cy.intercept("POST", "/cadastro-inicial").as("criarConta");
    cy.criarConta(name, email, tiposDeUsuario.ALUNO);
    cy.wait("@criarConta");
  })
  const phone = faker.phone.phoneNumber("553########");
  const data = "2013-10-10";
  describe("Dado: que estou na segunda tela do formulário de cadastro", () => {
    it("eu vejo a segunda tela do cadastro", () => {
      cy.contains(/Complete seus Dados Pessoais/i).should("be.visible");
    });
  });

  describe("Quando: eu preencho todos os dados pessoais", () => {
    it("eu preencho todos os campos do formulário (telefone, data de nascimento, estado, cidade e gênero)", () => {
      cy.preencherDadosPessoais(phone, data, false);
    });
  });

  describe("E: clico no botão de Próximo Passo", () => {
    it("eu clico no botão de Próximo Passo", () => {
      cy.contains(/Próximo Passo/i).should("be.enabled").click();
    });
  });

  describe("Então: sou redirecionado para a terceira tela de cadastro do aluno (Dados Escolares)", () => {
    it("eu vejo a terceira tela de cadastro (dados escolares)", () => {
      cy.contains(/Complete seus Dados Escolares/i).should("be.visible");
    });
  });
});

describe("funcionalidade: completar cadastro com sucesso com todos os dados preenchidos", () => {
  before(() => {
    email = faker.internet.email();
    cy.criarConta(name, email, tiposDeUsuario.ALUNO);
    const phone = faker.phone.phoneNumber("553########");
    const data = "2013-10-10";
    cy.preencherDadosPessoais(phone, data);
  });

  it("Dado: que eu preencho os dados escolares e concluo o cadastro, então sou redirecionado para o dashboard de aluno", () => {
    cy.contains(/Complete seus Dados Escolares/i).should("be.visible");
    cy.preencherDadosEscolares(true);
    cy.url().should("include", "/dashboard-aluno");
  });
});
