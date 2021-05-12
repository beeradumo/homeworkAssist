

const fixtureFile = 'photo.jpg';

let numere = {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'};

describe('Submit form', () => {
  
        beforeEach(() => {
          cy.visit('https://www.globalsqa.com/samplepagetest/');
          
        })

        it('Name', () => {
            cy.get('label[for="g2599-name"]')
            .should('have.class', 'grunion-field-label name').should('contain', 'Name')
                .children(0).should('contain', '(required)')

            cy.get('#g2599-name[type="text"]').should('have.class', 'name')
                .type('Radu Mihail').should('not.be.null')

            cy.get('#g2599-name[type="text"]').should('have.attr', 'required')
            cy.get('#g2599-name[type="text"]').should('have.attr', 'value')
        })

        it('Email',() => {
            cy.get('label[for="g2599-email"]')
                .should('have.class', 'grunion-field-label email').should('contain', 'Email')
                .children(0).should('contain', '(required)')

            cy.get('#g2599-email[type="email"]').should('have.class', 'email')
                .type('faraemail@incomplet.com').should('not.be.null').should('contain.value', '@').and('contain.value', '.')

            cy.get('#g2599-email[type="email"]').should('have.attr', 'required')
            cy.get('#g2599-email[type="email"]').should('have.attr', 'value')
        })

        it('Website', () =>{
            cy.get('label[for="g2599-website"]')
            .should('have.class', 'grunion-field-label url').should('contain', 'Website')

            cy.get('#g2599-website[type="url"]').should('have.class', 'url')
                .type('https://inprogress.ro').should('contain.value', 'https://').and('contain.value', '.')

            cy.get('#g2599-email[type="email"]').should('have.attr', 'value')
        })

        it('Experience', ()=>{
            cy.get('label[for="g2599-experienceinyears"]')
                .should('have.class', 'grunion-field-label select').should('contain', 'Experience (In Years)')
                .children(0).should('contain', '(required)')

            cy.get('#g2599-experienceinyears[name="g2599-experienceinyears"]').should('have.class', 'select')
                .should('have.attr', 'required')

            cy.get('#g2599-experienceinyears[name="g2599-experienceinyears"]')
                .select('0-1').should('contain.text', '0-1')
                .select('1-3').should('contain.text', '1-3')
                .select('3-5').should('contain.text', '3-5')
                .select('5-7').should('contain.text', '5-7')
                .select('7-10').should('contain.text', '7-10')
                .select('10+').should('contain.text', '10+')                 
           })

        it('Expertise', () => {
            cy.get('label[for="g2599-expertise"]')
                .should('have.class', 'grunion-field-label').should('contain', 'Expertise :')
            
            cy.get('input').filter('[type="checkbox"]').should('have.class', 'checkbox-multiple')
                .eq(0).check().should('have.value', 'Functional Testing')
                .parent().should('contain', ' Functional Testing').should('have.class', 'grunion-checkbox-multiple-label checkbox-multiple')

            cy.get('input').filter('[type="checkbox"]').should('have.class', 'checkbox-multiple')
                .eq(1).check().should('have.value', 'Automation Testing')
                .parent().should('contain', ' Automation Testing').should('have.class', 'grunion-checkbox-multiple-label checkbox-multiple')

            cy.get('input').filter('[type="checkbox"]').should('have.class', 'checkbox-multiple')
                .eq(2).check().should('have.value', 'Manual Testing').uncheck()
                .parent().should('contain', ' Manual Testing').should('have.class', 'grunion-checkbox-multiple-label checkbox-multiple')
        })

        it('Education', () => {
            cy.get('label[for="g2599-education"]')
                .should('have.class', 'grunion-field-label').should('have.text', 'Education')

            cy.get('input[type="radio"]').should('have.class', 'radio')
                .eq(0).check().should('have.value', 'Graduate')
                .parent().should('have.text', ' Graduate').should('have.class', 'grunion-radio-label radio')

            cy.get('input[type="radio"]').should('have.class', 'radio')
                .eq(1).check().should('have.value', 'Post Graduate')
                .parent().should('have.text', ' Post Graduate').should('have.class', 'grunion-radio-label radio')

            cy.get('input[type="radio"]').should('have.class', 'radio')
               .eq(2).check().should('have.value', 'Other')
               .parent().should('have.text', ' Other').should('have.class', 'grunion-radio-label radio')
        })

        it('Button Alert Box', () => {
            
            cy.get('button[onclick="myFunction()"]').should('have.css','background-color', 'rgb(68, 68, 68)')
                .should('contain.text', 'Alert Box : Click Here').click()
            cy.get('button[onclick="myFunction()"]').trigger('mouseover',{force: true})
                .should('have.css','background-color', 'rgb(7, 190, 229)')
            

            cy.on('window:confirm', (str) => {
                expect(str).to.equal('Do you really fill rest of the form?')
            })
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Good Luck. Go for it')
              })
        })  

        it.only('Comment', () => {
            cy.get('label[for="contact-form-comment-g2599-comment"]')
                .should('have.class', 'grunion-field-label textarea').should('contain.text', 'Comment')
                .children().should('contain.text', '(required)')

            cy.get('textarea[name="g2599-comment"]')
                .should('have.id', 'contact-form-comment-g2599-comment').should('have.class', 'textarea')
                //.type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.')
            .should('have.attr', 'required')

        })

        it.skip('Contact form 2599', () => {
          
            //Import file
            cy.get('input').filter('[type="file"]').attachFile(fixtureFile);
            //Name 
            cy.get('#g2599-name').type('Radu{enter}')
            //Email
            cy.get('#g2599-email').type('test@email.com{enter}')
            //Website
            cy.get('#g2599-website').type('www.inprogress.com{enter}')
            //Experience
            cy.get('#g2599-experienceinyears').select('1-3')
            //Expertise
            cy.get('input').filter('[type="checkbox"]').check(['Automation Testing', 'Functional Testing'])
            //Education
            cy.get('input').filter('[type="radio"]').check('Post Graduate')
            //Alert Box
            cy.get('button[onclick="myFunction()"]').click()
            //Comment
            cy.get('#contact-form-comment-g2599-comment').type('This is my email address test@email.com', {delay: 100})
            //Submit
            cy.get('button[type="submit"]').click();
         })
})
    



