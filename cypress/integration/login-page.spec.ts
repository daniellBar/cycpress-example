
const parseJson = (jsonStr: string): any => {
    return JSON.parse(jsonStr)
}


describe('login-page tests', () => {
    beforeEach(() => {
        cy.clearSessionStorage()
        cy.visit('/')
    })

    it('login as admin', () => {

        //go to login input fields and enter admin creds
        cy.get('input[type=text]').type('daniel').should('have.value', 'daniel')
        cy.get('input[type=password]').type('adminovski').should('have.value', 'adminovski')
        cy.get('.btn.login-btn').click()

        // check redirection to employee page
        cy.url().should('include', 'employee')

        // sets a waiter to make sure session storage saved
        cy.wait(5 * 1000)

        //get the user key to make sure its isAdmin property equals true
        //using custom command to get session key

        cy.getSessionStorageItem('user').then(user => {
            cy.wrap({ parseJson: parseJson }).invoke('parseJson', user).then(parsedUser => {
                cy.wrap(parsedUser).should('have.property', 'isAdmin').and('equal', true)
            })
        })
    })


    //in this app only admin can login  
    it('try to delete an employee without login as admin', () => {

        //click employee nav button
        cy.contains('Employees').click()

        //should go to employee page
        cy.url().should('include', 'employee')

        //go to delete button of first employee on the list
        cy.get('.employee-list').children().first().find('.btn.del-btn').click()

        //expect a message which says only admin can perform task
        cy.contains('Only Admin can perform this action')

    })


})
