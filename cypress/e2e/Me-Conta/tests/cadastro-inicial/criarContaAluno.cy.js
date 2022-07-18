context("funcionalidade: acessar a página de cadastro", () => {
  before(() => {
    cy.visit("/login");
  });

  describe("Dado: que estou na página de login do site do MeConta", () => {
    it("eu acesso a página de login", () => {
      cy.contains(/Faça seu login e comece seu atendimento/).should(
        "be.visible"
      );
    });
  });

  describe("Quando: eu clico no botão Crie sua Conta", () => {
    it("eu clico no botão Crie sua Conta", () => {
      const criarContaButton = cy.contains(/Crie sua Conta/i);
      criarContaButton.should("be.enabled");
      criarContaButton.click();
    });
  });

  describe("Então: sou redirecionado para a primeira tela de cadastro", () => {
    it("eu vejo a primeira tela do cadastro", () => {
      cy.url().should("include", "/criar-conta");
      cy.contains(/Criar Conta/).should("be.visible");
    });
  });
});

context("funcionalidade: completar detalhes da conta", () => {
  describe("Dado: que estou na primeira tela do formulário de cadastro", () => {});

  describe("Quando: eu preencho todos os dados", () => {});

  describe('E: escolho o tipo de usuário "Aluno"', () => {});

  describe("E: aceito os termos de uso e política de privacidade", () => {});

  describe("E: clico no botão de Cadastrar", () => {});

  describe("Então: sou redirecionado para a segunda tela de cadastro do aluno (Dados Pessoais)", () => {});
});

context(
  "funcionalidade: exibir erros de campo inválido e campo obrigatório na tela de Dados da Conta",
  () => {
    describe("Dado: que estou na primeira tela do formulário de cadastro", () => {});

    describe("Quando: eu preencho um nome, email ou senha inválido", () => {});

    describe("Então: eu devo ser avisado sobre as inconsistências", () => {});

    describe("E: não consigo concluir meu cadastro", () => {});
  }
);
