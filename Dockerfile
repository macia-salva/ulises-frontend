FROM node:14-alpine

WORKDIR /app

# Instalar Angular CLI globalmente (versión compatible con v12)
RUN npm install -g @angular/cli@12.2.18

# Copiar paquetes e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto por defecto de ng serve
EXPOSE 4200

# Ejecutar el servidor de desarrollo escuchando en todas las interfaces
#CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
