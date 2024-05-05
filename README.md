# Micro saas todo stripe com Next.js 14

## 🚀 Tecnologias

- Next.js 14 (Ele vai ser usado tanto para o front-end quanto para o back-end, por isso na instalação colocamos o App Router)
- Stripe (Para pagamentos)
- Shadcn UI (Componentes)
- Prisma (ORM)
- Next Auth (Autenticação)
- JWT
- Login através do Magic Link
- TailwindCss
- Typescript
- V0 (Ia para criar certos componentes e pages de forma automática através de uma imagem do seu figma ou wireframe ou texto)
- Eslint
- Prettier
- Husky
- Lint-staged
- Yarn

## 📦 Como criar o projeto:
- Comando para criar o projeto: `yarn create next-app nome-do-projeto`
```bash
yarn create v1.22.19
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Installed "create-next-app@14.2.3" with binaries:
      - create-next-app
√ What is your project named? ... micro-saas-todo-stripe
√ Would you like to use TypeScript? ... yes
√ Would you like to use ESLint? ... Yes
√ Would you like to use Tailwind CSS? ... Yes
√ Would you like to use `src/` directory? ... Yes
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to customize the default import alias (@/*)? ... No
Creating a new Next.js app in C:\Users\Pedro\OneDrive\Documentos\GitHub\micro-saas-todo-stripe\micro-saas-todo-stripe.

Using yarn.

Initializing project with template: app-tw


Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- postcss
- tailwindcss
- eslint
- eslint-config-next

yarn install v1.22.19
info No lockfile found.
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 30.13s.
Success! Created micro-saas-todo-stripe at C:\Users\Pedro\OneDrive\Documentos\GitHub\micro-saas-todo-stripe\micro-saas-todo-stripe

Done in 170.01s.
```

## 📎Links:
- [ui.shadcn](https://ui.shadcn.com) - O shadcn Ui por padrão ja vai ter os server components(Componentes do lado do servidor) tendo uma requisição mais eficiente, diferente dos Client components que é do lado do browser. Esse novos componentes ja estão disponíveis no Next e na nova versão do React. E obviamente no next tem o conceito onde tudo é renderizado no lado servidor e depois entregue para o client(Server-side Rendering (SSR)), ou seja, a page é renderizada do lado do servidor e depois entregue ao client. Temos o conceito onde algumas paginas podem ser estáticas
  - Para entender melhor o next: 
    - [Faz sentido o cache no lado do servidor?](https://www.youtube.com/shorts/vPSz3dJnSB8) - Um cache mais granular de cada requisição do lado do servidor pelos server components. Antigamente era uma cache por pagina/rotas
    - [Entenda server components do Next.js!](https://www.youtube.com/shorts/1tD9p_lnMN4)
      -  O server components (o cliente) vai renderizar o componente após todas as promises serem finalizadas no servidor ou o servidor que vai te devolver o componente renderizado? (O servidor que vai devolver aquele trecho do jsx na response): 
        - Ele implementa um formato de response por stream, em resumo, ele vai te devolver o HTML de forma estática que não depende de nenhum recurso pendente (Promises), mas a stream continua aberta, assim que forem sendo completas as promises, ele vai enviando nessa stream, e substituindo o código estático inicial que é renderizado usando a Suspense API do react (um loader, por exemplo). Quando tiver terminado tudo, fecha a stream de resposta e tá tudo certo.
    - [Server Components no React (tá lembrando o PHP?!)](https://www.youtube.com/watch?v=3KSxzW8x5pA&t=1s)
    - [TUDO que você precisa saber do Next 13 (isso muda tudo)](https://www.youtube.com/watch?v=0zl72thBKzo&t=2s)
    - [Next.js está virando um framework BACK-END?!](https://www.youtube.com/watch?v=eVwTlOuzT0Q&t=282s)
    - [Eu RESUMI o Next.js 14 para você! (Server Components & Actions)](https://www.youtube.com/watch?v=6JnkwfrAI-U&t=1s)
    - [Server Side Rendering (SSR) Next Components](https://chatgpt.com/c/5e4bebff-77bd-4f47-a49b-1a3be704237e)
    - [Actions use server no next, server components](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
    - [Server Components use server no react](https://react.dev/reference/rsc/use-server)
  - O shadcn-ui não é bem uma lib, ela é basicamente um CLI instalada no projeto, onde ele copia todos os componentes dentro do seu projeto, um design system altamente manipulável, usando o tailwindcss e radixUi
  - Para instalar ele: `npx shadcn-ui@latest init`
    - Sequencia de passos:
      ```
      √ Which style would you like to use? » New York
      √ Which color would you like to use as base color? » Zinc
      √ Would you like to use CSS variables for colors? ... yes
      ```
  - Para copiar os componentes: `npx shadcn-ui@latest add`
    - Você vai poder selecionar os componentes que deseja pela barra de espaço e da enter, ou se quiser pode dar um um ctrl + barra de espaço e enter para instalar todos os componentes. Ou ir no site da documentação e olhar os que você deseja por la

- [V0](https://v0.dev) - Feito pela vercel e o criador do shadcnUi. Basicamente uma IA que cria componentes. Ex por texto: a auth page with magic link form. Ele ja te entrega o codigo em react, tailwindcss e usando os proprios do shadcnUi
## 👨‍💻 Autor:

- Linkedin: https://www.linkedin.com/in/pedro-henrique-vieira-fernandes
- Git: https://github.com/PedrohvFernandes
- Instagram: pedro17fernandes
- portfolio: https://pedrohvfernandes-web-page-portfolio.vercel.app
