/// <reference types="Cypress" />

import faker from "@faker-js/faker";
import { nivelDeFormacao, tiposDeUsuario } from "../../../../constants/constants";
faker.setLocale("pt_BR");

const name = "Maria Silva Só";
let email = faker.internet.email();

context("funcionalidade: completar dados pessoais", () => {
  const phone = faker.phone.phoneNumber("553########");
  const data = "2013-10-10";
  before (() => {
    cy.criarConta(name, email, tiposDeUsuario.VOLUNTARIO);
  })
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

  describe("Então: sou redirecionado para a terceira tela de cadastro do voluntário (Dados Acadêmicos)", () => {
    it("eu vejo a terceira tela de cadastro (dados acadêmicos)", () => {
      cy.contains(/Complete seus Dados Acadêmicos/i).should("be.visible");
    });
  });
});

describe("funcionalidade: completar cadastro com sucesso com todos os dados preenchidos (Superior em Andamento)", () => {
  before(() => {
    const name = "Maria Silva Só";
    const email = faker.internet.email();
    const phone = faker.phone.phoneNumber("553########");
    const data = "2000-10-10";
    
    cy.criarConta(name, email, tiposDeUsuario.VOLUNTARIO);
    cy.preencherDadosPessoais(phone, data);
  });

  it("Dado: que eu preencho os dados acadêmicos e concluo o cadastro, então sou redirecionado para o dashboard de voluntário", () => {
    cy.contains(/Complete seus Dados Acadêmicos/i).should("be.visible");
    cy.preencherDadosAcademicos(nivelDeFormacao.SUPERIOR_EM_ANDAMENTO);
    cy.contains(/Finalizar Cadastro/i)
      .should("be.enabled")
      .click();
    cy.url().should("include", "/dashboard-atendente");
  });
});

describe("funcionalidade: completar cadastro com sucesso com todos os dados preenchidos (Superior Completo)", () => {
  before(() => {
    cy.intercept("POST", "/cadastro-inicial").as("criarConta");
    cy.intercept("POST", "/cadastro-voluntario").as("cadastrarVoluntario");
    const name = "Maria Silva Só";
    const email = faker.internet.email();
    const phone = faker.phone.phoneNumber("553########");
    const data = "2000-10-10";
    cy.criarConta(name, email, tiposDeUsuario.VOLUNTARIO);
    cy.wait("@criarConta");
    cy.preencherDadosPessoais(phone, data);
  });

  it("Dado: que eu preencho os dados acadêmicos e concluo o cadastro, então sou redirecionado para o dashboard de voluntário", () => {
    cy.contains(/Complete seus Dados Acadêmicos/i).should("be.visible");
    cy.preencherDadosAcademicos(nivelDeFormacao.SUPERIOR_COMPLETO);
    cy.contains(/Finalizar Cadastro/i)
      .should("be.enabled")
      .click();
    cy.wait("@cadastrarVoluntario");
    cy.url().should("include", "/dashboard-atendente");
  });
});
