describe('PasswordForm', () => {
  beforeEach(() => {
    // Visit the page where the PasswordForm is located
    cy.visit('http://localhost:3000');
  });

  it('should render the PasswordForm with checkboxes and a password input', () => {
    // Check that the form is rendered correctly
    cy.get('form').should('exist');
    cy.get('[data-test-id="password-input"]').should('exist'); // Ensure there's an input field for password
    cy.get('[data-test-id="generate-password-btn"]').contains('Generate Password').should('exist'); // Ensure the generate button exists

    // Check that checkboxes are rendered
    cy.get('input[type="checkbox"]').should('have.length', 5); // Ensure there are 5 checkboxes
  });

  it('should update the password input when clicking "Generate Password"', () => {
    // Change password length value
    cy.get('[data-test-id="password-length-input"]').clear().type('2');

    // Check the checkboxes
    cy.get('[data-state="unchecked"]').each(($el) => {
      cy.wrap($el).click();
    });

    // Click the "Generate Password" button
    cy.get('[data-test-id="generate-password-btn"]').contains('Generate Password').click();
    
    // Ensure there's some value in the password field
    cy.get('[data-test-id="password-input"]').should('not.have.value', '');
  });

  it('should show the correct progress based on the checkboxes', () => {
    // Testing progress based on checkbox states
    cy.get('[data-state="unchecked"]').each(($el) => {
      cy.wrap($el).click();
    });

    cy.get('[data-test-id="password-length-input"]').clear().type('2');

    // Click the "Generate Password" button
    cy.get('[data-test-id="generate-password-btn"]').contains('Generate Password').click();
    cy.get('[data-test-id="password-score"]').contains('Strong'); // Check that progress element exists
  });
});
