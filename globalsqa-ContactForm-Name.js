

let emptyText = '';
let numeText = 'Nume de test';

const inputNume = '#g2599-name[type="text"]';
const inputEmail = '#g2599-email[type="email"]';
const inputWeb = '#g2599-website[type="url"]';
const inputComment = 'textarea[name="g2599-comment"]';

const InvalidData = require('E:/Automation Test/Cypress/cypress-framework/cypress/fixtures/invalidData.json')

const data = {
    id: InvalidData.id,
    nume: InvalidData.nume,
    email: InvalidData.email,
    web: InvalidData.website,
    comment: InvalidData.coment

};

describe('Test Contact form', () => {
    before(() =>{
        cy.visit('https://www.globalsqa.com/samplepagetest/')
    })

        context('Testing textbox Name',() =>{
                      
            it('Test case 1 "empty textbox"', () => {    
                cy.get(inputNume).should('have.class', 'name').should('have.attr', 'value')
                cy.get(inputNume).should('have.prop','ariaRequired','true').should('have.attr', 'required')               
                
                cy.get(inputNume).then(e => { if (emptyText !== '') cy.get(e).type(emptyText) }).invoke('show',) 
                expect(emptyText).to.be.empty
                
                
            })

            it(`Test case 2 "${data.nume}"`, () => {
                cy.get(inputNume).clear().type(data.nume,'{enter}')
                expect(inputNume).not.to.be.empty
            })
        })

        context('Testing URL textbox', () => {

            
            it.skip('Test case 3 ', () => {

            cy.get(inputWeb).task('.wpcf7-validates-as-url')
            })
        })
    })
