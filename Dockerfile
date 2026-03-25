# Estágio 1: Construção (Build)
# Usamos uma imagem leve do Node.js para compilar o projeto
FROM node:20-alpine AS builder

WORKDIR /app

# Instalação das dependências
# Copiamos apenas os arquivos de manifesto primeiro para aproveitar o cache de camadas do Docker
COPY package*.json ./
RUN npm install

# Copia o código-fonte e compila o Next.js
COPY . .
RUN npm run build

# Estágio 2: Execução (Runtime)
# Imagem final que será executada no servidor
FROM node:20-alpine AS runner

WORKDIR /app

# Instala PM2 globalmente para gerenciar os processos do Node.js
RUN npm install -g pm2

# Copia apenas os arquivos necessários do estágio de construção para diminuir o tamanho da imagem
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/ecosystem.config.js ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/src/payload.config.ts ./src/payload.config.ts

# Garante que a pasta de mídia do Payload CMS exista para persistência
RUN mkdir -p /app/media

# Expõe a porta interna do Next.js
EXPOSE 3000

# Inicia a aplicação usando o PM2 para gerenciamento de processos e modo cluster
CMD ["pm2-runtime", "ecosystem.config.js"]
