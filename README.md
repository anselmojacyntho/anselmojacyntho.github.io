# Anselmo Barbosa Portfolio

Portfolio pessoal estatico para publicacao no GitHub Pages.

## Tecnologias

- HTML5
- CSS3 puro
- JavaScript puro
- GitHub Pages
- DEV.to / Forem public API

## Estrutura

```txt
.
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── resume-pt.md
    ├── resume-es.md
    └── resume-en.md
```

## Funcionalidades

- Pagina unica com container centralizado.
- Estilo visual escuro inspirado em terminal.
- Conteudo em portugues, espanhol e ingles.
- Dropdown para troca de idioma.
- Download do curriculo em Markdown conforme idioma selecionado.
- Listagem automatica das publicacoes do DEV.to.

## Integracao Com DEV.to

A integracao usa o endpoint publico de artigos publicados:

```txt
https://dev.to/api/articles?username=anselmojacyntho&per_page=10
```

No codigo, o usuario fica definido em `script.js`:

```js
const DEVTO_USERNAME = "anselmojacyntho";
```

## Regras Da Integracao DEV.to

- Nao usar API key no frontend.
- Buscar apenas artigos publicos publicados.
- Usar `per_page=10` para limitar a listagem a 10 resultados.
- Usar cache-busting com timestamp para evitar respostas antigas do navegador/CDN.
- Usar `cache: "no-store"` no `fetch`.
- Usar o header recomendado da API Forem v1:

```js
Accept: "application/vnd.forem.api-v1+json"
```

- Se a API retornar lista vazia, mostrar uma mensagem amigavel.
- Se a API falhar, nao quebrar a pagina; exibir mensagem de erro.
- Escapar dados vindos da API antes de inserir no HTML.

## Publicacao

Este projeto nao possui etapa de build. Para publicar no GitHub Pages, basta manter os arquivos na branch configurada para Pages do repositorio `anselmojacyntho.github.io`.

## Desenvolvimento Local

Pode abrir `index.html` diretamente no navegador ou servir a pasta com um servidor estatico simples.

Exemplo:

```bash
python3 -m http.server 8000
```

Depois acesse:

```txt
http://localhost:8000
```

## Validacao

Para validar a sintaxe do JavaScript:

```bash
node --check script.js
```
