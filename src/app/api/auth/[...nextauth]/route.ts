// Agora temos as rotas de autenticação, onde podemos fazer login, logout, esqueci a senha, etc. Tudo de forma automática. Esses handlers são os métodos que o next-auth usa para fazer a autenticação. Pegamos eles no services/auth/index.ts
export { GET, POST } from '@/services/auth'
