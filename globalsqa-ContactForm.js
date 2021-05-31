
const Photo = 'photo.jpg';
const pathXlsx = 'E:/Automation Test/Cypress/cypress-framework/cypress/fixtures/AssistHomework.xlsx';
const InvalidData = require('E:/Automation Test/Cypress/cypress-framework/cypress/fixtures/invalidData.json')




describe('Test Contact form', () => {
    before(() =>{
        cy.visit('https://www.globalsqa.com/samplepagetest/')
    })
    
    InvalidData.forEach((testCases) => {
        const data = {
            id: testCases.id,
            nume: testCases.nume,
            email: testCases.email,
            website: testCases.website,
            coment: testCases.coment
        };
    
        context('Test scenario textbox Name',() =>{
                      
            it(`Test case ${data.id}`, () => {   

                const inputNume = '#g2599-name[type="text"]';
                cy.get(inputNume).clear().type(data.nume)
                expect(data.nume.length).to.be.within(3, 50)
            
            })
        })
    

        context('Test scenario textbox Email',() =>{

            it(`Test case ${data.id}`, () => {

                const inputEmail = '#g2599-email[type="email"]';
                cy.get(inputEmail).clear().type(data.email)
                .should('not.be', '').should('contain.value', '@').and('contain.value', '.')
        
            })
        })
    })
        /*context(`Generate test for ${data.nume}, id: ${data.id}`, () =>{
            it('should fail to Submit for the specified datas', () => {
                cy.visit('https://www.globalsqa.com/samplepagetest/')

                const inputNume = '#g2599-name[type="text"]';
                    cy.get(inputNume).type(`${data.nume}{enter}`).should(($Div) => {
                        let x = parseFloat($Div.val())
                        expect(x).to.be.gte(3).and.be.lte(50)

                    })
                    //expect(parseFloat(inputNume)).to.be.gte(3)
                       // expect(data.nume).parseFloat().to.be.gte(3)
                
                cy.get('#g2599-name[type="text"]').type(data.nume)
                .invoke('text').then(parseFloat).should('be.gt', 3)

                cy.get('#g2599-email[type="email"]').type(data.email,'{enter}')
                    .should('not.be', '').should('contain.value', '@').and('contain.value', '.')

                cy.get('#g2599-website[type="url"]').type(data.website,'{enter}')
                    .should('contain.value', 'https://').and('contain.value', '.')

                cy.get('textarea[name="g2599-comment"]').type(data.coment,'{enter}')

                cy.get('button[onclick="myFunction()"]').click()
                cy.on('window:confirm', (str) => {
                    expect(str).to.equal('Do you really fill rest of the form?')
                })
                cy.on('window:alert', (str) => {
                    expect(str).to.equal('Good Luck. Go for it')
                  })
            })

        })*/
    


})
/*describe('test write', () => {

    it('write to test', () => {

    cy.writeFile(pathXlsx, {id: 1,name: "radu", telefon: "1234567899" })
    cy.readFile(pathXlsx).then((user) =>{
        expect(user.name).to.equal("radu")
    })
    })

    it('read fixture file', ()=>{

// our fixture file is now generated and can be used
    cy.fixture('invalidData').then((users) => {
    expect(users[3]).to.exist
    })
    })


}) */
/*cy.get(inputNume)
                    .eq(0).invoke('show')
                    .trigger('mouseenter')
                     .wait(3000)
                    .should('have.prop','ariaRequired','true')
                    .should('have.attr', 'required')
                    
*/