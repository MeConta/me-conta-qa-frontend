/// <reference types="Cypress" />

import faker from "@faker-js/faker";
faker.locale = "pt_BR";

describe("Logout", () => {
  let name;
  let email;

  beforeEach(() => {
    name = faker.name.findName();
    email = faker.internet.email();
    cy.criarConta(name, email, 0);
  });

  describe('Automatic logout feature', () => {
    it("should logout the user automatically after 10 minutes", () => {
      const now = new Date().getTime();
      cy.clock(now);
  
      cy.contains("Preencher depois").click();
      // Move the clock 11 minutes after
      cy.tick(11 * 60 * 1000);
      // Click the button to emit an action and re-evaluate if the user is idle
      cy.get('[data-testid="frentes-dropdown"]').click()
      // Check if the user was logged out and redirected to the login page
      cy.url().should("include", "/login");
    });
  })

  
});
