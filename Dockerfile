# Usamos uma imagem leve do Node.js para compilar o projeto
FROM node:20-alpine AS builder

WORKDIR /app

# Build args necessários em tempo de compilação
ARG PAYLOAD_SECRET
ARG DATABASE_URI
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI

# Instalação das dependências
# Copiamos apenas os arquivos de manifesto primeiro para aproveitar o cache de camadas do Docker
COPY package*.json ./
RUN npm install

# Copia todo o código-fonte do projeto
COPY . .

# Compila o Next.js (isso também gera os tipos e o importMap do Payload CMS automaticamente)
RUN npm run build

# Estágio 2: Execução (Runtime)
# Imagem final que será executada no servidor (muito menor que a de build)
FROM node:20-alpine AS runner

WORKDIR /app

# Instala PM2 globalmente para gerenciar os processos do Node.js
RUN npm install -g pm2

# Copia os arquivos necessários do estágio de construção
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/ecosystem.config.js ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./

# Garante que a pasta de mídia do Payload CMS exista para persistência
RUN mkdir -p /app/media

# Expõe a porta interna do Next.js
EXPOSE 3000

# Inicia a aplicação usando o PM2 para gerenciamento de processos e modo cluster
CMD ["pm2-runtime", "ecosystem.config.js"]
