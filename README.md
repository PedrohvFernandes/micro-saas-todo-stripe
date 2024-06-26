# Micro saas todo stripe com Next.js 14

## 🚀 Tecnologias

- Next.js 14 (Ele vai ser usado tanto para o front-end quanto para o back-end, além de poder usar os server components, por isso na instalação colocamos o App Router)
- Stripe (Para pagamentos)
- React Hook Form (Formulários)
- Shadcn UI (Componentes)
- Prisma (ORM)
- Next Auth (Autenticação)
- JWT
- Login através do Magic Link
- Mailtrap (Para testar o envio de email)
- Nodemailer
- TailwindCss
- Typescript
- V0 (Ia para criar certos componentes e pages de forma automática através de uma imagem do seu figma ou wireframe ou texto)
- Eslint
- Prettier
- Husky
- Lint-staged
- Yarn

## Dica: 
 - Dica: Para rodar mais rápido localmente modifique o script dev para: next dev --turbo, isso habilitará o turbopack.
 
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
- [ui.shadcn](https://ui.shadcn.com) - O shadcn Ui por padrão ja vai ter os server components(Componentes do lado do servidor) tendo uma requisição mais eficiente, diferente dos Client components que é do lado do browser. Esse novos componentes ja estão disponíveis no Next e na nova versão do React. E obviamente no next tem o conceito onde tudo é renderizado no lado servidor e depois entregue para o client(Server-side Rendering (SSR)), ou seja, a page e server component é renderizada do lado do servidor e depois entregue ao client. Temos também o conceito onde algumas paginas podem ser estáticas
  - [Theme](https://ui.shadcn.com/themes) - Se quiser um root com padrão deles basta ir ai e mudar de acordo com o seu gosto, mas seguindo o padrão deles, ao customizar so clicar em copy code e depois colar em global.css ou main.css...
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
    - Next14: 
      - Server component: No server component, podemos fazer components async e fazer requisição direta para o banco de dados dentro do nosso componente react de forma segura, poruque estamos renderizando do lado do servidor, e o componente ao ser renderizado no servidor o HTML é enviado para o cliente. O cliente então pode interagir com o componente, mas o componente é renderizado no servidor.
        - Por padrão, os componentes dentro do diretório "app" são Server Components. Isso não só otimiza o desempenho, como também facilita a sua vida na hora de adotá-los. Ah, e não se esqueça: você ainda pode usar Client Components normalmente.
      - O cliente component: é renderizado no lado do cliente, ou seja, no browser, com isso, segue os mesmos principios do react, onde podemos usar estados, usar eventos, etc. Mas não teria essa conexão direta com o BD por estar no lado do cliente
        - Dentro de _components vai ficar os client componentes, estrutura que foi escolhida. Para diferenciar dos server components basta colocar 'use client'. Somente dentro das actions(dos arquivos actions) que colocamos 'use server', já nós components como  a page e os components em si não precisamos colocar 'use server' caso ele precise rodar do lado do servidor, porque por padrão dentro da App que está em src os components ja são 'use server'
    - [Roteamento no Next.js 13](https://nextjs.org/docs/routing/introduction)
    - [Roteamento no Next.js 13](https://kinsta.com/pt/base-de-conhecimento/next-js/#:~:text=Roteamento,em%20uma%20rota%20no%20Next.)
    - [Definindo o roteamento](https://www.alura.com.br/artigos/roteamento-eficiente-next-js-app-router) - Temos o App Router para as aplicações que estão no ritmo e usam o Next a partir da versão 13, e o Page Router para a galera que tá na versão 12 ou anterior. Use pastas aninhadas para definir uma rota e o arquivo page.jsx/tsx para tornar essa rota acessível publicamente e export essas pages como defaul, não importa o nome da page.tsx se é Page() ou AppPage() só é necessario exportar como default a page.tsx. O Barra antes do auth é App e a partir dele é os segmentos de rota, nesse caso o auth --> http://localhost:3000/auth --> Ele entra na pasta auth e procura o arquivo page.tsx. http://localhost:3000/ --> Ele entra na pasta app dentro de src e procura o arquivo page.tsx. http://localhost:3000/app --> Ele entra na pasta app dentro de app e procura o arquivo page.tsx
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

- [NextAuth](https://next-auth.js.org) - Ela traz tudo o que precisamos de autenticação para o next.js, ela traz toda a camada, ela traz toda a integração de serviços populares, como google, twitter, facebook... Ela ja tém todo sistema de Magic Link, ja traz alguns adaptadores para fazer integração com Prisma, de ter todos os usuarios no BD de forma automatica, todo sistema de validação de Token com JWT, tudo padronizado, tendo uma boa performance, e é facil de usar.
  - [Auth.js v5](https://authjs.dev/getting-started/migrating-to-v5)
  - Para criar uma Api, basta colocar a pasta de Api  dentro do App e dentro dela colocamos a rota de Api, de acordo com as pastas. /api/auth/[...nextauth] --> Quando fica envolvido [] é porque é uma rota dinamica, ou seja, ele usa um spread ele vai pegar tudo que vem depois do auth e vai passar para o arquivo routes.ts. Ou por exemplo, se criarmos Api/user/[uid].tsx, sem o uso do spread ele vai pegar o uid e passar para o arquivo route.ts, dentro do query ele vai pegar o uid --> /user/003
  - Para resolver o erro: `[auth][error] MissingSecret: Please define a `secret`.. Read more at https://errors.authjs.dev#missingsecret` basta colocar o secret para o NextAuth
  - [NextAuth Configuration Explained](https://chatgpt.com/c/5557f3d7-fc95-4a2e-9c10-6a62113af0c3)
  - [Aprenda a utilizar API Routes no NextJS e React](https://tavanoblog.com.br/post/aprenda-a-utilizar-api-routes-no-nextjs-e-react)
  - [Api Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

- Prisma - O prisma é um ORM, queremos colocar os dados do usuario no BD, para isso a lib Auth ja nos prove uma model ideal para capturar os dados do usuario e colocar no BD adaptado para o prisma.
  - [Prisma Adapter](https://authjs.dev/getting-started/adapters/prisma)
    - [Naming Conventions model](https://authjs.dev/getting-started/adapters/prisma#naming-conventions)
      - Apos copiar o schema necessario do Auth, basta agora adaptar o nosso projeto, no caso criar um modelo Todo, e adaptar o modelo User(entre outros models necessarios que ele pede para copiar) que copiamos do auth para o nosso projeto, para que ele relacione com o Todo. E mudar para Sqlite
  - [Email provider](https://next-auth.js.org/providers/email)
  - [Prisma Adapter](https://authjs.dev/getting-started/adapters/prisma)
    - O que é o adapter do next auth: Ele ja contem todas as funções principais da autenticação. E no caso do prisma, ele ja entrega um adapter automatico, por isso ele ja te traz aquele schema pronto, porque ja vamos ter tudo feito de forma automatica, essa integração com o banco

- [Mailtrap](https://mailtrap.io) - Para testar os envios de email

- O middleware que criamos é basicamente um rota intermediaria, onde ele vai fazer uma verificação se o usuario esta autenticado, se ele não estiver, ele vai redirecionar para a pagina de login, se ele estiver, ele vai deixar ele acessar a pagina que ele deseja. Isso é para que não tenhamos que ficar fazendo essa verificação em todas as paginas, e sim em um unico lugar. Ao criar o middleware dentro do src o proprio next ja vai reconhecer e vai ser um middleware global, ou seja, ele vai ser aplicado em todas as paginas, a menos que você coloque um parametro para ele não ser aplicado em uma pagina especifica em config do middleware usando o matcher. Basicamente, o middleware é executado antes que as rotas solicitadas sejam exibidas, portanto, podemos fazer uma série de verificações e até bloqueios.
  - [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
  - [Uso de middleware em Next.js 14](https://borstch.com/blog/development/middleware-usage-in-nextjs-14)
  - [Cuidados ao utilizar Middleware em uma aplicação Next.js](https://marcelo-albuquerque.medium.com/cuidados-ao-utilizar-middleware-em-uma-aplicação-next-js-b544623dde47#:~:text=Basicamente%2C%20o%20middleware%20é%20executado,de%20verificações%20e%20até%20bloqueios.&text=Um%20exemplo%20interessante%20é%20quando,o%20usuário%20não%20esteja%20autenticado.)

- [Layouts no next - NEXTJS 13 LAYOUTS | Conceitos avançados sobre React](https://www.youtube.com/watch?v=ylowKaeKRto)
 - App router, root layout e layout
    -  O root layout dentro do / ou seja na pasta app do src é o layout padrão da pagina que vai ser aplicado em todas as páginas da nossa aplicação, digamos que é o html principal de uma aplicação react sem o next, onde possui metadados, fonte, title... é a casca principal da aplicação. Necessariamente não precisa ter o nome RootLayout/Layout, basta estar dentro da pasta app dentro do src e exportar como default. E na mesma pasta tem que ter o page que vai ser o conteúdo daquela rota. Nesse caso o / é a rota principal da aplicação, geralmente considerada como a home(ex: http://localhost:3000) ele usa esse root layout e page por padrão, e através dele(/) podemos chamar outras rotas(ex: /auth) que são pastas dentro da pasta app, e que as mesmas podem ter um layout.tsx e um page.tsx, ou somente o page.tsx e ela utiliza esse root layout por padrão do /, no fim isso é uma casca que cobre o page principal e o page das demais rotas caso ela não tenha um layout, e se caso tenha um layout para si, ela utiliza o layout de sua rota e o layout vindo da rota anterior, sistema de hierarquia de pastas(rotas), no caso do settings, ele tem um layout, mas ele usa o layout vindo da pasta app que é a onde ele esta --> App>app>settings --> /app/settings, então ele usa o RootLayout do app(/) que é o layout principal da aplicação, o layout do app>app(/app) e o layout de sua pasta(/app/settings).
        - Cada rota dentro do app ou seja cada pasta dentro da pasta app  pode ter um page e um layout igual na pasta app dentro do src, o layout é o que fica por volta de todas as páginas daquela rota e das suas rotas "filhas". E dentro da mesma rota podemos ter outras pastas que viram rotas, ou seja, sua rota subsequente(filha) e assim por diante. ex: /app/landing/outra-rota/mais-uma-rota --> 5 pastas, ou seja 5 rotas a / é a pasta inicial, ou seja a app dentro do src e dentro dela tem outra pasta app, que dentro dela tem a landing... e assim por diante. Se /app nao tiver um layout, o layout que vai ser usado é o root layout do / ou seja, da pasta app dentro do src, para sua page e para as demais subsequentes rotas que vem dela, mas se ela tiver o layout e as demais subsequentes rotas que vem a partir dela não tiverem um layout vão usar layout da /app e o layout principal da / que é a app dentro do src. E o mesmo vale para as demais rotas que estão dentro de / ou seja, dentro da pasta app principal do src.
        - Outro exemplo é a pasta settings dentro da app(/) --> App dentro da src, e a settings dentro do /app que é a pasta app>app. Logo localhost:3000/app/settings | app(/)>app(/app)>settings(/settings) --> 3 pastas, ou seja 3 rotas, a home, app e a settings. Se a settings não tiver um layout, ela vai usar o layout da app, que é a onde ela esta dentro, e se a app não tiver um layout, ela vai usar o layout da home, que é a pasta app dentro do src.
        - Lembrando que assim como page.tsx não é necessário ter o nome Page(), o mesmo é como o layout.tsx, ele necessariamente não precisa ter o nome Layout()/RootLayout(), isso em qualquer rota, basta estar dentro da pasta app dentro do src e exportar como default.
        - No fim cada rota pode ter seu layout.tsx e a mesma vai herdar sempre o layout da rota anterior, ou seja, a mais proxima, independentemente se ela tem o seu proprio layout ou não. No caso do settings ele herda o layout do /app e /, e ele tem o seu proprio layout: /app/settings --> app>app>settings
    - App router
      
      <img src=".github/notes/Explicação de rota no next.png" width="600" />
      <img src=".github/notes/Explicação de rota no next 2.png" width="600" />
      <img src=".github/notes/Explicação de rota no next 3.png" width="600" />

- Como separar os _components para a page.tsx de tal rota(pasta) ? Ex: App>app --> Dentro dela tem uma pasta (main) dentro dessa pasta fica o page.tsx dessa rota(pasta) no caso /app, ou seja, esse page dentro do main é relacionado com a rota /app, e a pasta _components dentro dessa main é relacionado somente com page.tsx da rota /app porque você a separou os componentes dela das demais rotas dentro da pasta app>app, ex: settings, caso se fizer isso em app>app>settings, ou seja, colocar um (main) e colocar os _components dentro da main de settings, esses componentes vão ser so para o page.tsx do settings, mas se colocar fora do main, é para todas as rotas subsequentes de settings --> /app/settings/rota_subsequente e para a propria page.tsx do settings. Se colocar _componentes dentro da app>app mas fora da main esses componentes vao ser por exemplo da propria page.tsx do app e para a pasta(rota) subsequentes do app, ex: settings --> app/settings, ou seja, pra todas as rotas(pastas) dentro de app>app inclusive do page.tsx da rota /app que está dentro do (main), porque esses componentes são do layout dentro de app>app, e se é do layout todas as rotas que vem subsequente do /app utilizam desse layout do app caso os mesmos não tenham o layout.tsx. As rotas(pastas) sempre herdam o layout.tsx e _componentes mais proximo, e as mesmas tem um page.tsx obrigaotiramente, podendo estar dentro de um (main) ou não, e se estiver dentro do (main) você pode separar os componentes somente da sua page.tsx.
  - _components --> nomenclatura que escolhemos
  - Alem de (main) pode chamar de (home)... independentemente do nome

-  Composition Pattern o famoso O do SOLID
   - [Composition Pattern](https://dev.to/ricardolmsilva/composition-pattern-in-react-28mj)
   - [Implementando Composition Pattern em aplicações React](https://vinniciusgomes.medium.com/implementando-composition-pattern-em-aplicacoes-react-4e8dc92742ff#:~:text=O%20padrão%20de%20composição%2C%20ou,partir%20de%20partes%20mais%20simples.)
   - Um exemplo disso é no sidebar, e nesses outros repos: 
     - [maratona-ignite-lab-design-system](https://github.com/PedrohvFernandes/maratona-ignite-lab-design-system/tree/main)
     - [Projeto para uma empresa que fiz](https://github.com/PedrohvFernandes/pedrohvFernandes-web-page-portfolio/tree/main/Web/assets/projects/FreelancerRebox/src/Alterações/Links%20das%20plataformas%20apos%20%20a%20compra/CardAppPlatforms)
     - [Cupcakes](https://github.com/PedrohvFernandes/cupcakes/tree/main/cupcakes/src)
     - [Não controle seu componente por props](https://www.linkedin.com/posts/vitormarkis_n%C3%A3o-use-props-em-react-activity-7192508293808844800-CTcQ?utm_source=share&utm_medium=member_desktop)
     -[Como saber se criei boas abstrações](https://www.linkedin.com/posts/vitormarkis_como-criar-boas-abstrações-activity-7164596851290095616--Uqv/?utm_source=share&utm_medium=member_desktop)
     - [Ou o proprio radix utiliza desse pattern](https://www.radix-ui.com)
       - [Ex de um componente deles](https://www.radix-ui.com/themes/docs/components/checkbox-group)
     - [O proprio shadcnUi utiliza desse pattern](https://ui.shadcn.com)

- Quando for criar uma sessão de portal BillingPortal no stripe, como por exemplo quando for atualizar a assinatura do client. Fazemos isso em settings>billing>actions indo no service do stripe em checkout. Ao fazer isso em modo test do stripe precisamos fazer isso:
  - [BillingPortal](https://dashboard.stripe.com/test/settings/billing/portal)
    - Ative o link de teste
    - Depois em assinaturas>Marque a opção "Os cliente podem alternar planos" selecione o plano que deseja que o cliente possa alternar
    - Depois clique em salvar alterações
  - Se não fizer ele vai dar o seguinte erro:
    ```bash
        StripeInvalidRequestError: You can’t create a portal session in test mode until you save your customer portal settings in test mode at https://dashboard.stripe.com/test/settings/billing/portal.
        at StripeError.generate (C:\Users\Pedro\OneDrive\Documentos\GitHub\micro-saas-todo-stripe\.next\server\chunks\ssr\node_modules_stripe_esm_21dd88._.js:538:20)
        at res.toJSON.then.__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$Error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__.StripeAPIError.message (C:\Users\Pedro\OneDrive\Documentos\GitHub\micro-saas-todo-stripe\.next\server\chunks\ssr\node_modules_stripe_esm_21dd88._.js:6159:181)
        at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
      type: 'StripeInvalidRequestError',
      raw: {
        message: 'You can’t create a portal session in test mode until you save your customer portal settings in test mode at https://dashboard.stripe.com/test/settings/billing/portal.',
        request_log_url: 'https://dashboard.stripe.com/test/logs/req_cnAHW3n3odib1Z?t=1716512820',
        type: 'invalid_request_error',
        headers: {
          'access-control-allow-credentials': 'true',
          'access-control-allow-methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'access-control-allow-origin': '*',
          'access-control-expose-headers': 'Request-Id, Stripe-Manage-Version, Stripe-Should-Retry, X-Stripe-External-Auth-Required, X-Stripe-Privileged-Session-Required',
          'access-control-max-age': '300',
          'cache-control': 'no-cache, no-store',
          connection: 'keep-alive',
          'content-length': '341',
          'content-security-policy': "report-uri https://q.stripe.com/csp-report?p=v1%2Fbilling_portal%2Fsessions; block-all-mixed-content; default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; img-src 'self'; script-src 'self' 'report-sample'; style-src 'self'",
          'content-type': 'application/json',
          'cross-origin-opener-policy-report-only': 'same-origin; report-to="coop"',
          date: 'Fri, 24 May 2024 01:07:00 GMT',
          'idempotency-key': 'stripe-node-retry-c9e63a0f-2e14-4b19-8f77-475ff64bfb04',
          'original-request': 'req_cnAHW3n3odib1Z',
          'report-to': '{"group":"coop","max_age":8640,"endpoints":[{"url":"https://q.stripe.com/coop-report?s=billing-api-srv"}],"include_subdomains":true}',
          'reporting-endpoints': 'coop="https://q.stripe.com/coop-report?s=billing-api-srv"',
          'request-id': 'req_cnAHW3n3odib1Z',
          server: 'nginx',
          'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
          'stripe-should-retry': 'false',
          'stripe-version': '2024-04-10',
          vary: 'Origin',
          'x-content-type-options': 'nosniff',
          'x-stripe-routing-context-priority-tier': 'api-testmode'
        },
        statusCode: 400,
        requestId: 'req_cnAHW3n3odib1Z'
      },
      rawType: 'invalid_request_error',
      code: undefined,
      doc_url: undefined,
      param: undefined,
      detail: undefined,
      headers: {
        'access-control-allow-credentials': 'true',
        'access-control-allow-methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'access-control-allow-origin': '*',
        'access-control-expose-headers': 'Request-Id, Stripe-Manage-Version, Stripe-Should-Retry, X-Stripe-External-Auth-Required, X-Stripe-Privileged-Session-Required',
        'access-control-max-age': '300',
        'cache-control': 'no-cache, no-store',
        connection: 'keep-alive',
        'content-length': '341',
        'content-security-policy': "report-uri https://q.stripe.com/csp-report?p=v1%2Fbilling_portal%2Fsessions; block-all-mixed-content; default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; img-src 'self'; script-src 'self' 'report-sample'; style-src 'self'",
        'content-type': 'application/json',
        'cross-origin-opener-policy-report-only': 'same-origin; report-to="coop"',
        date: 'Fri, 24 May 2024 01:07:00 GMT',
        'idempotency-key': 'stripe-node-retry-c9e63a0f-2e14-4b19-8f77-475ff64bfb04',
        'original-request': 'req_cnAHW3n3odib1Z',
        'report-to': '{"group":"coop","max_age":8640,"endpoints":[{"url":"https://q.stripe.com/coop-report?s=billing-api-srv"}],"include_subdomains":true}',
        'reporting-endpoints': 'coop="https://q.stripe.com/coop-report?s=billing-api-srv"',
        'request-id': 'req_cnAHW3n3odib1Z',
        server: 'nginx',
        'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
        'stripe-should-retry': 'false',
        'stripe-version': '2024-04-10',
        vary: 'Origin',
        'x-content-type-options': 'nosniff',
        'x-stripe-routing-context-priority-tier': 'api-testmode'
      },
      requestId: 'req_cnAHW3n3odib1Z',
      statusCode: 400,
      charge: undefined,
      decline_code: undefined,
      payment_intent: undefined,
      payment_method: undefined,
      payment_method_type: undefined,
      setup_intent: undefined,
      source: undefined
    }
    ⨯ Error: Error creating checkout session
        at createCheckoutSession (C:\Users\Pedro\OneDrive\Documentos\GitHub\micro-saas-todo-stripe\.next\server\chunks\ssr\[root of the server]__00cfd1._.js:316:15)
        at async createCheckoutSessionAction (C:\Users\Pedro\OneDrive\Documentos\GitHub\micro-saas-todo-stripe\.next\server\chunks\ssr\[root of the server]__00cfd1._.js:672:29)
    digest: "168932240"
    POST /app/settings/billing 500 in 1441ms
    ```

- Usando webhook do stripe:
  - [Webhooks](https://dashboard.stripe.com/test/webhooks)
  - Para testar temos que ter a CLI do stripe, para instalar
    - [CLI](https://docs.stripe.com/stripe-cli)
    - Apos instalar entre com o comando: `stripe login`
      - Abre o link
      - Selecione a conta, ex: 'Micro-Saas Todo Next' e permite o acesso
    - Depois entre com o comando: `stripe listen --forward-to localhost:3000/api/stripe/webhook` ou seja, passamos o nosso endpoint do webhook para o stripe ficar ouvindo, e nessa api que teremos os tipos de eventos que poderão acontecer durante o checkout no stripe, qualquer coisinha que der ele ira usar esse endpoint para nos avisar, e assim podemos fazer o tratamento necessário
      - Lembrando que isso aqui é para testar, em produção temos que ter um endpoint seguro e pelo link [Webhooks](https://dashboard.stripe.com/test/webhooks) passamos o endpoint para ele ficar de olho, clicando em "Adicione endpoint" e passando o endpoint e os eventos que queremos que ele fique de olho
      - Enquanto estamos testando clique em "Teste em um ambiente local", nele ira te falar os passos que você devera seguir para testar, que no caso são esses que estamos fazendo
    - Certo após isso, em [Teste em um ambiente local](https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local) ele ira falar que as duas primeiras etapas estão concluídas
      - Ele ira gerar uma secret Key para testar, coloque em uma env e use no constructEvent

      - Obs: Não feche a conexão com o stripe no terminal, porque se não ele não vai conseguir ouvir os eventos que estão acontecendo no stripe. Então toda vez que tiver algum evento no stripe, essa CLI vai fazer um proxy com o stripe pra automaticamente o evento que estiver vindo do stripe passar para o nosso endpoint, e assim podemos fazer o tratamento necessário por esse endpoint.
        - Com a cli aberta conseguimos ver todos os webhooks que acontecem em segundo plano na criação de um customer, no pagamento, se foi mal sucedido ou não. E todos possuem um type e por eles que conseguimos tratar, enviar para o BD alguma info necessaria caso de certo a compra... e assim por diante
        - Se quiser uma colinha além dessa no terminal do stripe, podemos ir em [Adicione um endpoint](https://dashboard.stripe.com/test/webhooks/create?endpoint_location=hosted) em "Selecionar eventos" temos todos os eventos possiveis que podem acontecer no stripe, e ai com base no que você quer monitorar basta pesquisar e tratar o evento no endpoint. Lembrando que nesse link você pode adicionar um endpoint para produção, uma desc e claramente a lista de eventos que serão tratados por esse endpoint clicando em "Selecionar eventos".
        - E para tratar esses eventos pegamos o type deles, ou seja, o nome de cada um e colocamos dentro de um switch na rota(endpoint) que vai tratar eles, todo evento que tiver o stripe chama esse endpoint(/api/stripe/webhook).

## Fluxo do sistema

- [Fluxo do sistema](https://excalidraw.com/#json=bV_Ajgw-wYmtQKqFdDmDN,OGQfyOxHVNHQ-zROCNDPnQ)
<img src="./.github/fluxo-do-sistema.png">

## 👨‍💻 Autor:

- Linkedin: https://www.linkedin.com/in/pedro-henrique-vieira-fernandes
- Git: https://github.com/PedrohvFernandes
- Instagram: pedro17fernandes
- portfolio: https://pedrohvfernandes-web-page-portfolio.vercel.app
