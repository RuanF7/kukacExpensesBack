# Usar a imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Construir o projeto
RUN npm run build

# Expor a porta que o app vai rodar
EXPOSE 4000

# Rodar o aplicativo
CMD ["npm", "run", "start:prod"]
