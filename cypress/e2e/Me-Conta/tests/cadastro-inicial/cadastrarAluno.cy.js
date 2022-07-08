/// <reference types="Cypress" />

import faker from "@faker-js/faker";
faker.setLocale("pt_BR");

describe("Cadastrar Aluno", () => {
  beforeEach(() => {
    const name = faker.name.findName();
    const email = faker.internet.email();

    cy.criarConta(name, email, 0);
    cy.url().should("include", "/criar-conta");
  });

  it.only("Cadastrar Aluno - Sucesso com todos os campos", () => {
    const phone = faker.phone.phoneNumber("55#########");
    const data = "2013-10-10";

    cy.get("#telefone").type(phone);
    cy.get("#dataNascimento").type(data, { force: true });
    cy.get("#UF").select("Acre").should("have.value", "AC");
    cy.get("#cidade").type("Rio Branco");
    cy.get("#Feminino").click();
    cy.contains(/Próximo Passo/i).click();
    cy.get("[name=escolaridade]")
      .select("1º Ano - Ensino Médio")
      .should("have.value", "0");
    cy.get("[name=tipoEscola]").should("to.be.checked");
    cy.get("#necessidades").type("minhas necessidades");
    cy.get("#expectativas").type("minhas expectativas");
    cy.get("#tratamentos").type("meus tratamentos");
    cy.contains(/Concluir meu cadastro/i).click();
    cy.wait(2000).url().should("include", "/dashboard-aluno");
  });

  it("Cadastrar Aluno - Sucesso apenas com campos obrigatórios", () => {
    const phone = faker.phone.phoneNumber("###########");
    const data = "2013-10-10";

    cy.get("#escolaridade").select("1").should("have.value", "1");
    cy.get("#telefone").type(phone);
    cy.get("#dataNascimento").type(data, { force: true });
    cy.get("#UF").select("Acre").should("have.value", "AC");
    cy.get("#cidade").type("Rio Branco");
    cy.get("#Feminino").click();
    cy.get("[name=tipoEscola]").should("to.be.checked");
    cy.contains("Concluir minha inscrição").click();
    cy.url().should("include", "/dashboard-aluno");
  });

  it("Cadastrar Aluno - Campos vazios", () => {
    cy.contains("Concluir minha inscrição").click();
    cy.get('[data-testid="Telefone"]')
      .parent()
      .contains("Telefone é obrigatório");
    cy.get('[data-testid="Data de nascimento"]')
      .parent()
      .contains("Data de nascimento inválida");
    cy.get('[data-testid="Estado"]').parent().contains("Estado é obrigatório");
    cy.get('[data-testid="Cidade"]').parent().contains("Cidade é obrigatório");
    cy.get('[data-testid="Escolaridade"]')
      .parent()
      .contains("Escolaridade é obrigatória");
  });

  it("Cadastrar Aluno - Pular preenchimento de dados", () => {
    cy.contains("Preencher depois").click();
    cy.url().should("include", "/dashboard-aluno");
  });
});
