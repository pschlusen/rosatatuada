# Rosa Tatuada (B2C/B2B)

### Extensão Livereload para Google Chrome
- [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=pt-BR "LiveReload")
<br/>
<br/>
### 🚀 Iniciando o projeto
- Instalar a extensão LiveReload
- Após instalada, execute os seguintes comandos na raíz do projeto
    - `npm install` (aguarde a conclusão e execute o próximo abaixo)
    - `gulp`
<br/>
<br/>
### 📁 Estrutura de pastas
Sempre que um arquivo é modificado dentro de `./src` é executada uma rotina no gulp que encaminha os arquivos de
saída para `./dist`. Ou seja, os arquivos de produção estarão em `./dist`. 
<br/>
<br/>
### 🌎 Servindo um arquivo
Este projeto utiliza o [Browsersync](https://browsersync.io/ "Browsersync") para servir arquivos localmente.

Imagine que você crie/altere o seguinte arquivo `./src/cart/cart.css`. A task default do gulp será executada e o arquivo processado sairá em `./dist/cart/cart.css`, desta forma você poderá acessar o arquivo desta forma:
- http://localhost:3000/cart/cart.css

Ou adicioná-lo ao HTML da página
- `<link rel="stylesheet" href="http://localhost:3000/cart/cart.css">`

O mesmo vale para arquivos Javascript.
<br/>
<br/>
### 📝 Como usar esse repositório da melhor maneira possível
Para facilitar o trabalho, é recomendável que os arquivos de saída sejam inseridos no página em desenvolvimento. Algo como isso:
<br/><br/>
![Exemplo de uso](https://i.postimg.cc/DZDGYpKY/exemploreadme.jpg)
<br/>
<br/>
Dessa forma, sempre que você alterar o arquivo localmente, o **Livereload** irá atualizar a página e o **Browsersync** irá servi-lo atualizado.