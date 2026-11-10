# 🛡️ Zero Trust Won't Stop SQL Injection

> **Shorts / Reels Content**: Animação explicativa sobre segurança da informação cobrindo os conceitos de *Zero Trust* e *SQL Injection*.

[![Motion Canvas](https://img.shields.io/badge/Made%20with-Motion%20Canvas-5865F2?style=flat-square)](https://motioncanvas.github.io/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=flat-square)](https://vitejs.dev/)

---

## 📌 Sobre o Projeto

Este repositório contém o código-fonte da animação programática produzida para formatos de vídeos curtos (YouTube Shorts, Instagram Reels e TikTok). 

O vídeo aborda a diferença crucial entre **Autenticação/Autorização (Zero Trust)** e **Sanitização de Entradas de Dados (SQL Injection)**, demonstrando visualmente por que uma arquitetura baseada em *Zero Trust* por si só não impede falhas de injeção no nível de aplicação.

## 🚀 Tecnologias Utilizadas

* **[Motion Canvas](https://motioncanvas.github.io/):** Framework para criação de animações vetoriais e interativas via código.
* **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para controle preciso da linha do tempo e elementos em cena.
* **[Vite](https://vitejs.dev/):** Ferramenta de build rápida e ambiente de desenvolvimento local.

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos

Certifique-se de ter o **Node.js** (versão 18 ou superior) instalado na sua máquina.

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/social-media-posts/zero-trust-short.git
```

2. Entre no diretório do projeto:
```bash
cd zero-trust-short
```

3. Instale as dependências:
```bash
npm install
```

### Executando a Animação

Inicie o servidor de desenvolvimento do Motion Canvas:

```bash
npm run start
# ou
npm run dev
```

Acesse a URL exibida no terminal (geralmente `http://localhost:9000`) para visualizar o player do Motion Canvas, controlar a linha do tempo e renderizar o vídeo final.

## 📂 Estrutura de Pastas

```text
├── audio/            # Arquivos de narração e efeitos sonoros (locais)
├── src/
│   ├── scenes/       # Cenas animadas da apresentação (ex: example.tsx)
│   ├── cues.ts       # Marcações e sincronização de áudio/tempo
│   ├── project.ts    # Configuração e entrada principal do Motion Canvas
│   └── motion-canvas.d.ts
├── package.json      # Dependências e scripts do projeto
├── tsconfig.json     # Configurações do TypeScript
└── vite.config.ts    # Configurações do Vite
```

---

*Produzido por [Felipe](https://github.com/social-media-posts).*