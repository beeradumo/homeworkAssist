
let InvalidDataN = require('E:/Automation Test/Cypress/cypress-framework/cypress/fixtures/dataName.json');
let InvalidDataC = require('E:/Automation Test/Cypress/cypress-framework/cypress/fixtures/dataComm.json');
let InvalidDataE = require('E:/Automation Test/Cypress/cypress-framework/cypress/fixtures/dataEmail.json');
let InvalidDataW = require('E:/Automation Test/Cypress/cypress-framework/cypress/fixtures/dataWebsite.json');

const pathCSV = 'E:/Automation Test/Cypress/cypress-framework/cypress/fixtures/AssistHomework.csv';
const inputNume = '#g2599-name';
const inputEmail = '#g2599-email';
const inputWeb = 'input[name="g2599-website"]';
const inputExperience = 'select[name="g2599-experienceinyears"]';
const inputExpertise = 'label[class="grunion-checkbox-multiple-label checkbox-multiple"]';
const inputEducation = 'label[class="grunion-radio-label radio"]';
const inputAlert = 'button[onclick="myFunction()"]';
const inputComment = 'textarea[name="g2599-comment"]';
const inputSubmit = 'button[type="submit"]';

const tooltipAlert = '#use-floating-validation-tip';

describe('Test Contact form', () => {
    before(() =>{
        cy.visit('https://www.globalsqa.com/samplepagetest/')
    })

   context('Test scenario "textbox Name"',() =>{
        InvalidDataN.forEach((testCases) => {
                const data = {
                    id: testCases.id,
                    nume: testCases.nume,
                    tCase: testCases.testCase,
                    expected: testCases.expected
                };
                const ValidateName = (names) => {
                    var re = /^[a-zA-Z]+(([-][a-zA-Z\s])?[a-zA-Z\s]*)*\b$/;
                    return re.test(names)
                };
                const NameState = ValidateName(data.nume)

            it(`TC ${data.id}, Test values "${data.nume}" - ${!NameState}`, () => {   
                
                cy.get(inputNume).should('have.class', 'name').should('have.attr', 'value')
                cy.get(inputNume).should('have.prop', 'ariaRequired', 'true').should('have.attr', 'required')

                cy.get(inputNume).clear().type(`${data.nume}{enter}`)
                .should('have.value', data.nume)
             
               // cy.get(tooltipAlert).filter('role="alert"').should('be.visible')
    cy.writeFile(pathCSV, `${data.id}, Verify textbox Name, ${data.tCase},1)Click on Name field     2)Type values automatic     3)Press Enter, '${data.nume}', ${data.expected}, Is ${NameState}, Cypress, Pass  \n`, {flag:'a+'})

            })
        })
    })

     context('Test scenario "textbox Email"',() =>{

        InvalidDataE.forEach((testCases) => {
                const data = {
                    id: testCases.id,
                    email: testCases.email,
                    testCase: testCases.testCase
                };                 
                const validateEmail = (emails) => {
                    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})\b$/;
                    return re.test(emails);
                };  

                const EmailState = validateEmail(data.email)

            it(`Test case ${data.id+10}, Test values "${data.email}" to be true - ${EmailState}`, () => {                  

                cy.get(inputEmail)
                    .invoke('attr', 'type', 'text')
                    .should('have.attr', 'type', 'text') 

                cy.get(inputEmail).should('have.class', 'email')
                .and('have.prop', 'ariaRequired', 'true').and('have.attr', 'required')

                cy.get(inputEmail).clear().type(`${data.email}{enter}`,{delay:75}).wait(1500)
                    .should('have.value', data.email)   

                  cy.get('.contact-form').find('input').eq(1).should('be.focus')  
                    
    //cy.writeFile(pathCSV, `${data.id+10}, Verify textbox Email, ${data.testCase} ,1)Click on email field     2)Type values automatic     3)Press Enter, '${data.email}', Should be ${EmailState}, Is ${EmailState}, Cypress, Pass  \n`, {flag:'a+'})
            })
        })
    })

    context('Test scenario "textbox Website"',() =>{
        InvalidDataW.forEach((testCases) => {
                const data = {
                    id: testCases.id,
                    website: testCases.website,
                    testCase: testCases.testCase
                };  
                const validateURL = (urls) => {
                    var re = /(https?:\/\/)(www\.)?([a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,3})(\/[a-zA-Z0-9@:%_\/+.~#?&=]*)?/;
                    return re.test(urls);
                };
                const WebState = validateURL(data.website)

            it(`Test case ${data.id+23}, Test values "${data.website}" to be true - ${WebState}`, () => {                  

                cy.get(inputWeb)
                    .invoke('attr', 'type', 'text')
                    .should('have.attr', 'type', 'text')

                cy.get(inputWeb).should('have.class', 'url').should('have.attr', 'value')
                cy.get(inputWeb).clear().type(data.website)
                .should('have.value', data.website)

    //cy.writeFile(pathCSV, `${data.id+23}, Verify textbox Website, ${data.testCase} ,1)Click on website field     2)Type values automatic     3)Press Enter, '${data.website}', Should be ${WebState}, Is ${WebState}, Cypress, Pass  \n`, {flag:'a+'})            
            })
        })
    })

    context('Test scenario Select "Experence in year"',() =>{

            it(`Test case 36, Test values in select option to be true `, () => {                  

                cy.get(inputExperience).should('have.class', 'select')
                .should('have.prop', 'ariaRequired', 'true').should('have.attr', 'required')
               
                cy.get(inputExperience).find('option').then(options => {
                    const actual = [...options].map(o => o.value)
                    expect(actual).to.deep.eq(['0-1', '1-3', '3-5', '5-7', '7-10', '10+'])
                    console.log(actual)
                
    //cy.writeFile(pathCSV, `36, Select "Experence in year", Values in select option to be equals ,1)Click on select option     2)Select option automatic, '${actual}', Should be equal, Is equal, Cypress, Pass  \n`, {flag:'a+'})
                            
                })

        })   
    })

    context('Test scenario "checkbox Expertise"',() =>{

        it('Test case 37, Test values in checkbox to be true', () => {                  

            cy.get('input[type="checkbox"]').should('have.class', 'checkbox-multiple')
            .check(['Manual Testing','Automation Testing', 'Functional Testing']).uncheck('Automation Testing')

            cy.get(inputExpertise).find('input[type="checkbox"]').then(check => {
                const actual = [...check].map(o => o.value)
                expect(actual).to.deep.eq(['Functional Testing', 'Automation Testing', 'Manual Testing'])
                console.log(actual)
            })
        })   
    })

    context('Test scenario "radio label Education"',() =>{

        it('Test case 38, Test values in radio label to be true', () => {                  

            cy.get('input[type="radio"]').should('have.class', 'radio')
            .check(['Graduate', 'Post Graduate', 'Other']).check('Post Graduate')

            cy.get(inputEducation).find('input[type="radio"]').then(radio => {
                const actual = [...radio].map(o => o.value)
                expect(actual).to.deep.eq(['Graduate', 'Post Graduate', 'Other'])
                console.log(actual)
            })
        })   
    })

    context('Test scenario "button ALERT BOX : CLICK HERE"',() =>{

        it('Test case 39, Test functionality button ALERT BOX : CLICK HERE', () => {                  

            cy.get(inputAlert).should('have.css','background-color', 'rgb(68, 68, 68)')
                .should('contain.text', 'Alert Box : Click Here').click()
                .wait(1000)
            cy.get(inputAlert).invoke('css', 'background-color', 'rgb(7, 190, 229)').trigger('mouseenter')
                .should('have.css','background-color', 'rgb(7, 190, 229)').trigger('mouseleave')
            
            cy.on('window:confirm', (str) => {
                expect(str).to.equal('Do you really fill rest of the form?')
            })
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Good Luck. Go for it')
            })
        })   
    })

    context('Test scenario "textbox Comment"',() =>{
        InvalidDataC.forEach((testCases) => {
                const data = {
                    id: testCases.id,
                    comment: testCases.comment
                };
                const ValidateComm = (comments) => {
                    var re = /(?!\W*$)(?=[ .\w]\w*\W*$).*$/;
                    return re.test(comments)
                };
                const CommentState = ValidateComm(data.comment)

            it(`Test case ${data.id+39}, Test values "${data.comment}" to be true - ${CommentState}`, () => {   
                
                cy.get(inputComment).should('have.class', 'textarea')
                cy.get(inputComment).should('have.prop', 'ariaRequired', 'true').and('have.attr', 'required')

                cy.get(inputComment).clear().type(data.comment)
                .should('have.value', data.comment)           
            })
        })
    })

    context('Test scenario "button SUBMIT"',() =>{

        it('Test case 44, Test functionality button SUBMIT', () => {                  

            cy.get(inputSubmit).should('have.class','pushbutton-wide').and('have.css','background-color', 'rgb(68, 68, 68)')
                .should('contain.text', 'Submit')
                
            cy.get(inputSubmit).wait(1000).invoke('css', 'background-color', 'rgb(7, 190, 229)').trigger('mouseenter')
                .should('have.css','background-color', 'rgb(7, 190, 229)').click()

                cy.url().should('contain', 'contact-form-hash=7451d6322607909818ec6641508a0315d590839b')
                cy.get('a[href*="/samplepagetest/?contact-form-hash=7451d6322607909818ec6641508a0315d590839b"]').click()
                cy.url().should('be.eq','https://www.globalsqa.com/samplepagetest/?contact-form-hash=7451d6322607909818ec6641508a0315d590839b')        
        })   
    })

})

