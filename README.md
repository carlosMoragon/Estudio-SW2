# Estudio-SW2
Repo para estudiar

Como se ha generado el proyecto Swagger:

    npm install @openapitools/openapi-generator-cli --save-dev
    
    npx openapi-generator-cli generate     -i openapi.yml     -g nodejs-express-server     -o f1-data-api


Inicializar el proyecto express:

npm init //No se si es necesario

npm install express //No se si es necesario

npm install -g express-generator

npx express-generator -v ejs express_test

cd express_test

npm install

npm audit fix <--force>

npm start
