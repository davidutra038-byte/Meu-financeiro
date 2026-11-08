# Meu Financeiro — interface pública, dados privados

Este repositório contém **somente a interface vazia** do aplicativo Meu Financeiro. O aplicativo guarda seu estado no navegador, e a interface pode ser publicada no GitHub Pages sem enviar as movimentações financeiras ao GitHub.

## Acesso

- Abra o [Meu Financeiro](https://davidutra038-byte.github.io/Meu-financeiro/) no Safari.
- Importe seu backup pessoal somente dentro do aplicativo.
- A atualização da interface preserva a chave de armazenamento local existente (`meu-financeiro-2026-local-v4`).
- Faça um backup protegido por senha antes de trocar de aparelho, navegador ou limpar os dados do Safari.

## Análise dos cartões

Na aba **Cartões**, escolha o mês e abra **Análise dos gastos**. Alterne entre **Categorias**, **Estabelecimentos**, **Parcelamentos**, **Cartões** e **Maiores compras**. Use **Categoria** para classificar uma compra individual sem alterar o valor da fatura informada pelo banco.

## Notificações do iPhone — modo local

No iOS 27, o app **Atalhos** possui automação acionada por notificações de aplicativos. Após o usuário configurar e autorizar um Atalho, ele pode abrir o Meu Financeiro com uma transação sugerida.

Formato de link aceito:

```text
https://davidutra038-byte.github.io/Meu-financeiro/#mov=<texto-codificado-na-URL>
```

O `<texto-codificado-na-URL>` deve ser o resultado de codificar um texto como:

```text
C6|Compra de R$ 12,30 em estabelecimento
```

ou, com data informada:

```text
2026-11-07|C6|Compra de R$ 12,30 em estabelecimento
```

O aplicativo elimina o fragmento do endereço ao recebê-lo e adiciona o conteúdo à caixa de **notificações pendentes**. Nenhuma despesa é registrada no orçamento sem revisão. Mensagens que contenham expressões relacionadas a senhas, códigos de autenticação e tokens são ignoradas.

**Importante:** a automação não envia notificações automaticamente ao ChatGPT; ela abre o site no iPhone. O navegador deve ser o mesmo usado para guardar os dados. A função de notificações depende das permissões do iOS e do comportamento do app bancário.

## Privacidade

- **Não publique** backups, extratos, contratos, faturas, JSON de dados, arquivos bancários ou segredos neste repositório público.
- A interface é pública, porém os dados importados não são enviados automaticamente ao GitHub.
- O armazenamento `localStorage` **não é criptografado** pelo aplicativo; proteja o acesso ao dispositivo.
- Crie backups protegidos por senha e guarde-os de maneira privada.
- Não existe sincronização automática entre navegadores/aparelhos ou com este chat.
- Fragmentos de URL não são enviados na requisição HTTP ao GitHub Pages, mas podem ser sensíveis enquanto aparecem em atalhos ou histórico.

> Protótipo de controle financeiro: confira todos os dados com o banco antes de realizar pagamentos.

## Interface V12 — lançamentos

- A data de novos lançamentos usa o dia local do dispositivo e permanece editável, com atalho Hoje.
- O mesmo formulário permite escolher conta/dinheiro ou cartão de crédito e mostra o efeito no caixa e a referência da fatura antes de salvar.
- A referência pode ser sugerida por um fechamento exato cadastrado e sempre pode ser alterada. Sem esse fechamento, confira a referência com o banco.
- Categoria, orçamento e parcela ficam em detalhes opcionais. Informar 1/3 descreve a parcela atual; não cria automaticamente as demais.
- Movimentações manuais de caixa podem ser corrigidas ou excluídas no histórico, com Desfazer. Receitas previstas aparecem no filtro Recebimentos.
- Compras preservam o total da fatura informado pelo banco. Ao informar uma fatura antes sem total, seus detalhes já cadastrados são mantidos.
- Testes sintéticos adicionais: `node scripts/ux-smoke.js index.html`.

## Interface V13 — conferência e uso diário

A atualização parte do aplicativo de produção e preserva seus seis módulos, dados locais, cálculos e importações.

- Registros realizados passam a indicar se são uma movimentação nova ou se já estavam incluídos no saldo informado. Isso vale para despesas, faturas, salários, reembolsos, contratos, quitações e transferências do cofre.
- `affectsCash: false` preserva o valor nominal no histórico e exclui somente o efeito no saldo da conta. Eventos antigos sem esse campo mantêm seu comportamento. A opção Efeito no saldo permite corrigir um lançamento existente sem duplicar eventos.
- A lista principal reúne contas, faturas, compras e movimentos de caixa, com busca e filtros. Registros originais a conferir permanecem fora da projeção até uma decisão explícita.
- Categoria é um campo principal e pode ser editada na lista. Cartão, referência, vencimento, parcela e orçamento permanecem visíveis ou acessíveis conforme o lançamento.
- A edição preserva a competência original e permite manter datas ainda não confirmadas. Pagamentos exigem a data real.
- Orçamentos, salário, notificações, importações e histórico continuam disponíveis em seções expansíveis. O planejamento mantém comparação de crédito, contratos, quitações e premissas.
- Calendários de reembolsos e projeção do cofre acompanham a referência atual; a próxima parcela considera as parcelas já recebidas.
- A navegação é preservada ao atualizar a página. A paleta usa azul petróleo, superfícies claras e laranja em destaques.

O formato de backup permanece na versão 4. Use a interface atual para os novos tratamentos do saldo; backups anteriores continuam importáveis.

Validação adicional: `node scripts/accounting-smoke.js index.html`. Uma comparação local com a base original também verifica preservação dos registros e das projeções, sem publicar os dados dessa base.

## Interface V13.1 — vínculo com despesas previstas

- O seletor passa a usar as previsões efetivamente cadastradas no ciclo escolhido, em vez de uma lista fixa de cinco despesas.
- O vínculo mostra o valor previsto, utilizado e restante; registros ainda a conferir recebem essa indicação.
- Uma previsão não pode ser vinculada a si mesma. Vínculos novos são validados para o ciclo correto, e identificadores existentes são preservados ao renomear uma previsão.
- O ciclo salarial e a referência da fatura usam listas legíveis no celular.
- Testes cobrem fontes personalizadas, troca de ciclo, edições e o abatimento sem duplicar a despesa na projeção.

## Interface V14 — hoje, futuro e apartamento

- A navegação principal usa Hoje, Contas, Cartões e Plano. Guardado e A receber continuam disponíveis dentro de Plano e por atalhos em Hoje.
- Hoje mostra o saldo registrado, compromissos nos próximos sete dias (incluindo atrasados e reservas atuais sem data), menor caixa previsto em 90 dias e o progresso do apartamento.
- A nova projeção por datas reserva compromissos sem vencimento no início de seu mês de salário, ou hoje se ele já começou. Saídas são consideradas antes de entradas do mesmo dia. Reembolsos, 13º e outras receitas sem dia confirmado não aumentam esse gráfico; as projeções mensais continuam exibindo as premissas cadastradas.
- Projeções mensais e simulações passam a descontar os compromissos ainda abertos de referências anteriores. Ao simular uma quitação, as parcelas correspondentes deixam de ser contadas uma segunda vez.
- Lançamentos novos começam pelo valor e por uma escolha entre despesa paga, conta a pagar, compra no cartão e receita. Data local, categoria sugerida editável, cartão, fatura, previsão vinculada e parcela permanecem disponíveis.
- Paguei abre uma janela curta com data e tratamento do saldo. Pagamentos já incluídos no saldo inicial preservam o caixa. No pagamento do restante de uma previsão, o valor original é mantido.
- Faturas mostram total bancário, soma líquida dos detalhes e diferença. Valores conferem indica apenas igualdade numérica; detalhamento incompleto não é prova de duplicidade. Empréstimos separados da fatura continuam separados.
- A interface inclui modo escuro, preferência persistente de tema, fontes maiores, foco visível e controles principais com área mínima de toque de 44 px.
- Backup protegido usa janela própria de senha, confirmação, aviso de perda de acesso sem senha, compartilhamento de arquivo quando suportado e alternativa de download. O lembrete aparece dentro do aplicativo após sete dias da última geração/partilha registrada; não é uma notificação do sistema.

Compatibilidade: mesma chave de armazenamento local, formato de dados versão 4 e formato AES-GCM de backup. Nenhum dado pessoal está incorporado ao HTML público. Teste adicional: `node scripts/daily-cash-smoke.js index.html`, incluindo criptografia real e leitura do backup.

