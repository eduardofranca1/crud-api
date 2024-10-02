fix:
erro no middleware de autenticação quando o token estiver inválido
https://stackoverflow.com/questions/52122272/err-http-headers-sent-cannot-set-headers-after-they-are-sent-to-the-client

tests:

- unit test controller

validação de schemas:

schemas :

- TROCA YUP PELO ZOD ✔
- schema de query e params (id) ✔
- schame com propriedade email colocar uma função para verificar se email já existe ✔
- schema de criar usuário (adicionar confirm password, verificar se email já existe) ✔
- schema de atualizar sennha

- schema de atualizar email do usuário pela rota de update

rotas:

- rota de atualizar senha

middlewares:

- middleware de erros
- criar middleware de autorização

node modules:

- atualizar libs para versões mais recentes
