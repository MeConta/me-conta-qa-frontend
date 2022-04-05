# Objetivo
 - Automatizar frontend Me Conta ?

# Pré Condição

- Instalar Node.js - https://no-dejs.org/en/download/ 

# Instalação de dependências

- No terminal digitar o comando  `npm install` na sua pasta para instalar as dependências
- Defina as variáveis ​​de ambiente encontradas em .env.example, lembre-se de que elas devem apontar para o mesmo que o baseUrl (se o baseUrl for localhost, o exemplo pode ser copiado e colado). Se você deseja direcionar o heroku, defina as variáveis ​​de ambiente no .env para apontar para o banco de dados heroku.
- Digitar `npx cypress open` para abrir o cypress

# Instalação Allure report

 - Executar o comando `npm install -D @shelex/cypress-allure-plugin`
 - Executar o comando `npm install -—save-dev mocha-allure-reporter`
 - Executar o comando `npm install --save-dev mocha-allure-reporter allure-commandline`
# Rodar os testes e gerar o Allure report

- Executar o comando `npx cypress run  --reporter mocha-allure-reporter`
- Executar o comando para gerar o Allure Results `npx allure generate allure-results --clean`
- Executar o comando para abrir o Allure Report no navegador `npx allure open allure-report`
- Executar o comando para limpar os relatórios `rm -r allure-results/ allure-report || true` 