it("Should open the cinema page", () => {
  cy.visit("/");

  cy.contains("Идёмвкино").should("be.visible");
});

it("Should show correct number of days", () => {
  cy.visit("/");
  cy.get("a.page-nav__day").should("have.length", 7);
});
