import * as main_page from "../locators/main_page.json";
import  {fogot_pass, footer, email, title, login_button, password, validmail, nevalidmail} from "../locators/main_page.json";
describe ('Проверка Формы', function(){
    beforeEach(function(){
        cy.visit('https://login.qa.studio/')
        cy.get(title).should('have.text', 'Форма логина')
    })
    afterEach(function(){
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })
    it ('Позитивный кейс авторизации', function(){
        cy.get(email).type('german@dolnikov.ru')
        cy.get(password).type('iLoveqastudio1')
        cy.get(login_button).click()
        cy.get('#messageHeader').should('have.text', 'Авторизация прошла успешно')
    })
    it ('Логика восстановления пароля (невалидный mail)', function(){
        cy.get('#forgotEmailButton').click()
        cy.get('#mailForgot').type (nevalidmail)
        cy.get('#restoreEmailButton').click()
        cy.get('#messageHeader').should('have.text', 'Нужно исправить проблему валидации')
    })
    
    it ('Логика восстановления пароля (валидный mail)', function(){
        cy.get('#forgotEmailButton').click()
        cy.get('#mailForgot').type (validmail)
        cy.get('#restoreEmailButton').click()
        cy.get('#messageHeader').should('have.text', 'Успешно отправили пароль на e-mail')
    })
    it ('Негативный кейс авторизации (невалидный пароль)', function(){
        cy.get(email).type('german@dolnikov.ru')
        cy.get(password).type('iLoveqastudio')
        cy.get(login_button).click()
        cy.get('#messageHeader').should('have.text', 'Такого логина или пароля нет')
    })
    it ('Негативный кейс авторизации (невалидный логин)', function(){
        cy.get(email).type('germand@olnikov.ru')
        cy.get(password).type('iLoveqastudio1')
        cy.get(login_button).click()
        cy.get('#messageHeader').should('have.text', 'Такого логина или пароля нет')
    })
    it ('Негативный кейс авторизации (нет @)', function(){
        cy.get(email).type('germanddolnikov.ru')
        cy.get(password).type('iLoveqastudio1')
        cy.get(login_button).click()
        cy.get('#messageHeader').should('have.text', 'Нужно исправить проблему валидации')
    })
    it ('На приведение к строчным буквам в логине', function(){
        cy.get(email).type('GerMan@Dolnikov.ru')
        cy.get(password).type('iLoveqastudio1')
        cy.get(login_button).click()
        cy.get('#messageHeader').should('have.text', 'Авторизация прошла успешно')
    })
})