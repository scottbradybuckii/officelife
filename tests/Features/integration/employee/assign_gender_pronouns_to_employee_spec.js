describe('Employee - assign gender pronoun', function () {
  it('should assign a pronoun and remove it as administrator', function () {
    cy.loginLegacy();

    cy.createCompany();

    cy.visit('/1/employees/1');

    // Open the modal to assign a pronoun and select the first line
    cy.get('[data-cy=open-pronoun-modal-blank]').click();
    cy.get('[data-cy=list-pronoun-1]').click();
    cy.get('[data-cy=open-pronoun-modal]').contains('he/him');
    cy.hasAuditLog('Assigned the pronoun called he/him', '/1/employees/1');
    cy.hasEmployeeLog('Assigned the pronoun called he/him', '/1/employees/1');

    // Open the modal to assign a pronoun and select the first line
    cy.get('[data-cy=open-pronoun-modal').click();
    cy.get('[data-cy=pronoun-reset-button]').click();
    cy.hasAuditLog('Removed the gender pronoun', '/1/employees/1');
    cy.hasEmployeeLog('Removed the gender pronoun', '/1/employees/1');
  });

  it('should assign a pronoun and remove it as hr', function () { cy.loginLegacy();

    cy.createCompany();

    cy.get('body').invoke('attr', 'data-account-id').then(function (userId) {
      cy.changePermission(userId, 200);
    });
    cy.visit('/1/employees/1');

    // Open the modal to assign a pronoun and select the first line
    cy.get('[data-cy=open-pronoun-modal-blank]').click();
    cy.get('[data-cy=list-pronoun-1]').click();
    cy.get('[data-cy=open-pronoun-modal]').contains('he/him');
    cy.hasEmployeeLog('Assigned the pronoun called he/him', '/1/employees/1');

    // Open the modal to assign a pronoun and select the first line
    cy.get('[data-cy=open-pronoun-modal').click();
    cy.get('[data-cy=pronoun-reset-button]').click();
    cy.hasEmployeeLog('Removed the gender pronoun', '/1/employees/1');
  });

  it('should assign a pronoun and remove it as the concerned employee', function () {
    cy.loginLegacy();

    cy.createCompany();

    cy.get('body').invoke('attr', 'data-account-id').then(function (userId) {
      cy.changePermission(userId, 300);
    });
    cy.visit('/1/employees/1');

    // Open the modal to assign a pronoun and select the first line
    cy.get('[data-cy=open-pronoun-modal-blank]').click();
    cy.get('[data-cy=list-pronoun-1]').click();
    cy.get('[data-cy=open-pronoun-modal]').contains('he/him');
    cy.hasEmployeeLog('Assigned the pronoun called he/him', '/1/employees/1');

    // Open the modal to assign a pronoun and select the first line
    cy.get('[data-cy=open-pronoun-modal').click();
    cy.get('[data-cy=pronoun-reset-button]').click();
    cy.wait(400);
    cy.hasEmployeeLog('Removed the gender pronoun', '/1/employees/1');
  });

  it('should not let another normal employee assign a pronoun', function () {
    cy.loginLegacy();

    cy.createCompany();

    cy.createEmployee('Michael', 'Scott', 'michael.scott@dundermifflin.com', 'admin', true);
    cy.visit('/1/employees/2');
    // Open the modal to assign a pronoun and select the first line
    cy.get('[data-cy=open-pronoun-modal-blank]').click();
    cy.get('[data-cy=list-pronoun-1]').click();

    cy.get('body').invoke('attr', 'data-account-id').then(function (userId) {
      cy.changePermission(userId, 300);
    });
    cy.visit('/1/employees/2');

    cy.get('[data-cy=pronoun-name-wrong-permission]').contains('he/him');
  });
});
