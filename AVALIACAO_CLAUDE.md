# Meu Financeiro V9 — pacote para revisão independente

**Aplicativo:** `index.html` — arquivo único HTML, CSS e JavaScript, sem dependências de backend.
**Site:** https://davidutra038-byte.github.io/Meu-financeiro/

## Objetivo

Controle financeiro pessoal para iPhone e computador: lançamentos, orçamento, cartões, compras parceladas, reembolsos, cofre do apartamento, salário, dívidas e simulações de crédito. O usuário registra compras por conversa com um assistente externo, e importa arquivos de dados de forma privada no navegador.

## Segurança dos dados

- O `index.html` publicado **não inclui movimentações financeiras pessoais**.
- Os dados importados persistem no `localStorage` do navegador usando a chave `meu-financeiro-2026-local-v4`.
- Não há sincronização com o ChatGPT, GitHub ou banco de dados em nuvem.
- O armazenamento local **não é criptografado pelo aplicativo**.
- Backup com senha utiliza Web Crypto; backup JSON sem senha pode conter informações sensíveis.
- Não incluir no repositório backups, extratos, propostas ou identificação pessoal.

## Fluxo Planejar

A V9 apresenta em primeiro lugar o **simulador**, separado do registro de empréstimo realmente contratado:

1. Escolha a modalidade FUNCEF ou `Sem empréstimo`.
2. Defina o primeiro desconto em folha.
3. Marque quitação da Losango, empréstimos Nubank e/ou faturas conhecidas de NOV/DEZ.
4. Veja `caixa atual + crédito líquido - quitações selecionadas`.
5. Compare projeção de caixa de 6 a 48 ciclos com a hipótese de não contratação e expanda os ciclos para detalhar entradas, saídas e transferências.
6. O registro real da contratação fica recolhido, em seção separada.

**Ressalvas:** o cálculo inicial supõe liberação e quitações imediatamente a partir do saldo atual (não faz projeção diária de datas de pagamento). A projeção futura é por ciclo salarial, baseada nas despesas e faturas cadastradas, não nas compras futuras desconhecidas. Taxas variáveis, INPC, evolução de obra e 13º estimado devem ser revistos. As opções de empréstimo são simulações, não aprovação.

## Pontos para o Claude revisar

- UX no iPhone (375–430 px): navegação inferior com seis itens numa única linha, scroll, área clicável, tipografia, safe areas e modais.
- Separação entre **dinheiro em caixa** e **projeção**, inclusive quando o simulador é negativo.
- Exatidão do fluxo de caixa e risco de dupla contagem de faturas, parcelas e descontos em folha.
- Situação de empréstimo já contratado, adiantamento de faturas, ausência de dados futuros e 13º previsto.
- Segurança do armazenamento local, importação, backup criptografado, renderização de HTML e entradas não confiáveis.
- Experiência de categorização de cartões e manutenção de IDs das transações e parcelas.
- Acessibilidade: contraste, labels, foco, VoiceOver, navegação por teclado.

## Testes conhecidos

Foi realizada validação automática da sintaxe do JavaScript, privacidade do estado público inicial e testes sintéticos de projeção do caixa no GitHub Actions. Esses testes **não substituem validação manual no Safari do iPhone**.

## Restrições ao modificar

1. Preserve a chave de `localStorage` e a compatibilidade com a estrutura do backup `version:4` para não apagar dados existentes.
2. Não embuta transações, saldos, contratos ou identificadores pessoais em repositório público.
3. Não automatize pagamentos, contratações ou quitações por clicar no simulador.
4. Não apresente projeções incompletas como saldos bancários certificados.
5. Preferir correções incrementais em vez de refazer a aplicação do zero.
