import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export function middleware(request: NextRequest) {
  // Eu pego o token da minha autenticação la dentro do cookies do usuario
  const token = request.cookies.get('authjs.session-token')
  const pathname = request.nextUrl.pathname

  console.log({
    token: token?.value,
    pathname,
  })

  // Fazendo essas duas validações qualquer pagina que eu criar dentro da pasta /app vai ser protegida por autenticação

  // Se o pathname for /auth e tiver um token, redirecionamos para /app.
  if (pathname === '/auth' && token) {
    return NextResponse.redirect(new URL(getUrl('/app')))
  }

  // Se o pathname incluir o /app  e não tiver um token, redirecionamos para /auth
  if (pathname === '/app' && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth')))
  }
}

// Aqui estamos passando o matcher para o middleware, para que ele só seja executado nas rotas que não sejam api, _next/static, _next/image e favicon.ico
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
