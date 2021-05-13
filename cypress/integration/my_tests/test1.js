describe("Happy Path", () => {
  before(() => {
    cy.visit("localhost:3000");
  });

  it("Add a task", () => {
    const taskDetails = "this is a dummy task";
    const date = "2021-11-05";
    cy.get("textarea").focus().type(taskDetails);
    cy.get("input").focus().type(date);
    cy.get("button").click();
    cy.get("ul li:first").within(() => {
      cy.get("p").eq(0).should("contain", taskDetails);
      cy.get("p").eq(1).should("contain", "5/11/2021");
    });
  });
});
