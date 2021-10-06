# Objetivo

 - Automatizar fronend Me Conta ?
# Pré Condição

- Instalar Node.js - https://no-dejs.org/en/download/ 
# Instalação do Cypress

- No terminal digitar o comando  `npm install cypress --save-dev` na sua pasta
- Digitar `npx cypress open` para abrir o cypress
- Digitar  `npm init -y` para criar o arquivo package.json
# Instalação Lib Faker

- npm i faker
 # Instalação Allure report

 - Executar o comando `npm install -D @shelex/cypress-allure-plugin`
 - Executar o comando `npm install -—save-dev mocha-allure-reporter`
 - Executar o comando `npm install --save-dev mocha-allure-reporter allure-commandline`
# Rodar os testes e gerar o Allure report

- Executar o comando `npx cypress run  --reporter mocha-allure-reporter`
- Executar o comando para gerar o Allure Results `npx allure generate allure-results`
- Executar o comando para abrir o Allure Report no navegador `npx allure open allure-report`
- Executar o comando para limpar os relatórios `rm -r allure-results/ allure-report || true`