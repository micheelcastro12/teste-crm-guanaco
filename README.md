# Real CRM - Standalone Demo Version

Versão simplificada para deploy imediato sem dependências externas (Supabase ou Meta Graph).

## Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Mock (In-memory) - Os dados resetam ao reiniciar o servidor na Vercel.
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React

## Como Começar

### 1. Instalação e Execução
```bash
npm install
npm run dev
```

### 2. Deploy Vercel
Este projeto está pronto para a Vercel. Como não usa banco de dados externo, você não precisa configurar nada além do TOKEN de verificação do Meta se quiser testar o Webhook.

**Passos:**
1. Suba para o GitHub.
2. Conecte na Vercel.
3. Deploy!

### 3. Meta Webhook (Standalone)
A rota `/api/meta/webhook` está habilitada e responde à verificação do Facebook. Para testar o recebimento de leads, você pode enviar um POST com dados simulados ou configurar o App da Meta apontando para sua URL da Vercel.

## Limitações do Modo Standalone
- **Persistência**: Os leads cadastrados ficam salvos apenas enquanto o servidor da Vercel estiver ativo. Ao entrar em standby (cold start), os dados voltam aos valores iniciais (Seed Data).
- **Multi-tenant**: A URL `/o/[org_slug]` funciona, mas todas compartilham o mesmo banco de dados em memória nesta demo.
