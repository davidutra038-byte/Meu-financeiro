# Lançamentos pela conversa — Meu Financeiro

O fluxo implementado é: conversa → arquivo JSON (ou bloco de dados) → Contas → Trazer do ChatGPT → A conferir → confirmação individual. Não existe sincronização automática com esta conversa, acesso remoto ao Safari ou conexão MCP do Meu Financeiro instalada.

## Como usar

1. Conte na conversa o que ocorreu: valor, descrição, data, cartão ou pagamento à vista, se já pagou/recebeu ou se é uma previsão. Para uma compra parcelada, informe o valor da parcela atual e seu número/total.
2. Peça: “Gere um arquivo JSON MEU-FINANCEIRO-CHAT-V1 com os gastos do dia para conferir no aplicativo. Preserve os identificadores dos itens já enviados”.
3. Salve o arquivo no celular e abra **Contas → Trazer do ChatGPT → Escolher arquivo do ChatGPT (.json)**. Como alternativa, use “Prefiro copiar e colar” para colar o bloco inteiro, inclusive com a cerca de código JSON.
4. Ao selecionar o arquivo, os itens aparecem em **A conferir** sem movimentar caixa, faturas ou projeções.
5. Abra cada item e confira tipo, data, valor, referência, cartão e tratamento do saldo. Só então pressione **Confirmar lançamento**.

Esse fluxo não exige exportar nem substituir um backup completo.

## Contrato do bloco

```json
{
  "format": "MEU-FINANCEIRO-CHAT-V1",
  "items": [
    {
      "id": "exemplo-mercado-001",
      "type": "out",
      "description": "Mercado — exemplo fictício",
      "cents": 3590,
      "date": "",
      "cycle": "",
      "category": "Alimentação e lazer"
    }
  ]
}
```

O exemplo é fictício e não é carregado automaticamente. Data e competência vazias exigem escolha na revisão.

| Campo | Regra |
|---|---|
| `id` | Identificador estável da operação, de 5 a 100 caracteres: letras, números, hífen e sublinhado. Reenvie a mesma operação com o mesmo identificador. |
| `type` | `card` compra no cartão; `out` despesa paga; `planned` conta a pagar; `in` receita recebida; `incomePlanned` receita prevista. |
| `cents` | Inteiro positivo, em centavos. Para parcelas, valor da parcela atual. |
| `description` | Descrição com até 180 caracteres. |
| `date` | `AAAA-MM-DD`; deixe vazio se desconhecida. Compra/pagamento/recebimento exigem data na revisão. |
| `cycle` | Competência salarial `AAAA-MM`, não confundir com o mês do vencimento. Deixe vazio se não confirmada. |
| `card` | Nome exato do cartão cadastrado, quando conhecido; não escolher um cartão arbitrário. |
| `category` | Opcional; pode ser ajustada na revisão. |
| `installment` | Opcional, como `2/6`. Não gera outras parcelas. |
| `affectsCash` | Opcional. `true` se a movimentação é nova em relação ao saldo registrado; `false` se já estava incluída. Se desconhecido, omitir: o aplicativo exige escolha para pagamentos/recebimentos. |

Até 100 itens por arquivo, com no máximo 500 KB. O arquivo é lido localmente pelo navegador e não é enviado a um servidor. O aplicativo rejeita o bloco inteiro se houver item inválido ou IDs repetidos dentro dele. IDs já recebidos são ignorados; o mesmo ID com conteúdo diferente gera aviso e não substitui o item anterior. Essas proteções usam identificadores: repetir a mesma operação com um ID novo pode duplicá-la e precisa ser evitado na conversa e na revisão.

## Regras para preparar os blocos no chat

- Não afirmar que algo foi salvo apenas porque o usuário contou na conversa.
- Não inventar data, cartão, competência ou situação de pagamento. Resolver datas relativas usando o dia local informado na conversa e explicitar essa interpretação; se ambígua, deixar em branco.
- Distinguir compra, pagamento de fatura, transferência, empréstimo e aporte. O formato acima atende compras, despesas e receitas; pagamentos de fatura devem ser registrados na própria fatura. Transferências, empréstimos e aportes têm seus módulos próprios.
- Preservar IDs em reenvios da mesma operação. Para corrigir algo já confirmado, orientar a edição do registro no aplicativo, sem gerar outra despesa.
- Compras em faturas bancárias já cadastradas apenas detalham a composição; não aumentam automaticamente o total bancário. Sem fatura bancária, viram compromisso previsto da referência escolhida.
- Previsões não alteram o caixa; receitas previstas aparecem na projeção. Um pagamento já incluído no saldo fica no histórico sem nova saída.
- Não criar compras ou créditos artificiais para fechar diferença de fatura.

## Integração automática futura

Uma integração direta exige um serviço próprio conectado ao ChatGPT e uma forma de sincronizar o aplicativo. A documentação oficial descreve servidores MCP com ferramentas de leitura e escrita, conexão e autenticação. Isso não foi instalado nem publicado neste projeto: [Adicionar servidor MCP próprio](https://developers.openai.com/api/docs/guides/custom-mcp-server).

## Validação

`node scripts/chat-entry-smoke.js index.html` verifica recebimento sem efeitos financeiros, validação atômica, reenvio e conflito de IDs, cinco tipos de lançamento, datas inválidas, confirmação individual, tratamento explícito do saldo, preservação do total bancário e prevenção de uma segunda confirmação da mesma sugestão.


## Instrução para uma nova conversa no celular

Envie este guia à nova conversa e diga: “Vou anotar meus gastos aqui. Quando eu pedir, gere um arquivo .json no formato MEU-FINANCEIRO-CHAT-V1, com os itens ainda não enviados ou mantendo os IDs originais em reenvios. Nunca afirme que o aplicativo foi atualizado automaticamente. Não invente campos desconhecidos e não registre pagamentos de fatura como compras. Eu vou importar e confirmar cada lançamento no aplicativo”.

A geração é feita quando você pedir na conversa. Não foi configurada geração diária automática ou sincronização em segundo plano.
