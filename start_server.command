#!/bin/bash
# Muda o diretório de execução para a pasta onde este script está localizado
cd "$(dirname "$0")"

# Inicia o servidor de desenvolvimento do Vite (acessível na rede local devido à configuração anterior)
npm run dev
