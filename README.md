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


## Interface V15 — mês a mês, repetições e comparação visual

As sugestões visuais foram incorporadas à interface existente, preservando categoria, cartão, referência da fatura, tratamento de pagamentos anteriores, recebíveis e meta do apartamento.

- Plano permite olhar 12, 24, 36 ou 48 meses de salário, com gráfico de saldo acumulado e barras de entradas e saídas previstas. As datas e os valores completos aparecem ao abrir um mês.
- A visão mensal separa resultado do mês, saldo acumulado, contas por categoria, receitas e aportes. Faturas, empréstimos separados e encargo de obra são identificados sem somar os detalhes do cartão uma segunda vez.
- A projeção do dinheiro guardado é apresentada separadamente do caixa. Aportes já feitos no mês não são adicionados novamente à projeção do cofre.
- Nova previsão mensal cria de uma a 60 ocorrências. Edições podem atingir somente um mês, o mês selecionado e os seguintes, ou todos os meses ainda previstos. Datas com dias inexistentes são ajustadas ao fim do mês.
- Pagamentos, recebimentos e registros marcados como não utilizados são preservados ao editar uma sequência. Para dados antigos sem identificador de repetição, a interface sugere um grupo somente quando nome, categoria e pagamento coincidem, sem ocorrências duplicadas no mesmo mês; a prévia informa quantos itens serão afetados.
- Valores abaixo de gastos já vinculados, duplicidades e alterações em previsões cobertas por uma fatura bancária são validados antes da gravação. Alterações em sequência podem ser revertidas com Desfazer.
- O quadro de parcelamentos informa valores conhecidos, término estimado e qualidade do calendário. Só apresenta alívio mensal quando a sequência cadastrada está completa e consistente. Detalhes cobertos por fatura não geram outra dívida no quadro.
- A comparação inclui gráfico por proposta, resumo da opção selecionada e uma proposta FUNCEF personalizada para simulação. O líquido deve já descontar a quitação FUNCEF anterior; a prestação substitui o desconto anterior no modelo de refinanciamento.
- O teste de aumento do encargo de obra usa uma hipótese isolada da premissa salva. Percentuais digitados são aplicados pelo botão Aplicar hipótese; atalhos também estão disponíveis. Nenhum teste registra crédito, quitação ou transferência real.
- Gráficos usam rótulos legíveis no celular; déficits pequenos não são arredondados para menos zero. Dezembro/janeiro identifica os dois anos. O botão flutuante de lançamento ficou compacto.

A soma nominal de uma proposta personalizada é prestação × quantidade. Modalidades variáveis permanecem estimativas, sem projetar INPC futuro. O menor saldo das comparações mensais considera a posição imediata e o fim dos meses; a visão diária de Hoje verifica as datas dos próximos 90 dias.

Validação: `node scripts/planning-smoke.js index.html`, além dos testes de dados, simulação, lançamentos, caixa por datas e criptografia já executados no fluxo de validação. O HTML público continua sem dados financeiros pessoais e o backup continua na versão 4.


## V16 — categorias e uso diário

- Finalidade separada de forma de pagamento; categorias legadas são padronizadas na leitura, sem regravar o histórico. Classificações confirmadas manualmente são preservadas.
- Compras em linhas compactas, edição ao tocar, busca na fatura e análises sob demanda.
- Hoje com menos repetição e teste de gasto à vista, considerando contas, aportes, folga mínima, datas de 90 dias e fechamentos de 12 meses. O resultado depende das premissas cadastradas.
- Revisão local de metas, entrega/mudança, receitas extras, vencimentos, cotações e encargo de obra. Datas desconhecidas não são preenchidas automaticamente.
- Cotações de quitação editáveis, com data de consulta e validade distintas; atualizar cotação não registra pagamento.
- Não há migração destrutiva ou alteração automática de saldo, pagamentos, contratos, metas ou dados pessoais. Registros e anotações continuam locais e fazem parte do backup protegido.

Validação: executar os cinco testes existentes e `node scripts/review-smoke.js index.html`.

## Faturas — confirmação do total e detalhamento

Os cartões separam valor, vencimento, confiabilidade do total, detalhamento e registro de pagamento. “Valores conferem” indica igualdade numérica, sem afirmar conferência manual. A soma líquida dos detalhes considera créditos e ajustes. A confirmação do total não altera a projeção ou registra pagamentos.

Verificação: `node scripts/invoice-smoke.js index.html`. Opcionalmente, informe os caminhos de um backup original e do ajustado para comparar saldo e projeções; a prévia com dados pessoais é gerada apenas em `dados-privados/`, pasta ignorada pelo Git.

Registros explicitamente marcados com `excludedFromInvoiceDetails` são preservados em seção separada e excluídos apenas da soma de conciliação; isso não registra pagamento nem altera o total da fatura. Créditos sem essa marca continuam participando normalmente.

## V17 — gastos, dívidas e apartamento no mesmo plano

- Hoje prioriza saldo registrado, compromissos próximos e risco de caixa; a agenda aparece antes dos caminhos para organizar gastos, comparar dívidas e acompanhar o apartamento.
- O teste de compra e o resumo da reserva ficam ao lado da agenda no desktop e abaixo dela no celular.
- Plano reúne alerta de aperto, evolução do caixa e cartão da meta. Caixa e dinheiro guardado permanecem separados.
- O gráfico mensal mantém proporções e exibe referências de valor fora do SVG, com texto responsivo. A linha de zero é preservada.
- A comparação de entradas e saídas usa barras horizontais com valores exatos, resultado do mês e seleção por botão ou lista. Exibe até seis meses de cada vez, sem rolagem horizontal; todo o horizonte continua acessível no seletor.
- Selecionar um mês atualiza também as contas detalhadas. O botão Ver contas leva diretamente ao detalhamento. Seletores e botões têm foco visível.
- O gráfico diário usa distância real entre datas e degraus por evento, preservando os mínimos dentro do dia.
- A interface não altera lançamentos, pagamentos ou cálculos. O formato de backup v4 e a chave do aplicativo foram preservados.

Teste adicional: `node scripts/redesign-smoke.js index.html`. Com backup e HTML anterior como argumentos adicionais, compara caixa e projeções de 48 meses e 90 dias e gera uma prévia privada com armazenamento isolado. Nenhuma alteração dessa prévia sincroniza com a versão em uso.

### Ajustes de composição e término das parcelas

- Faturas com total confirmado e soma de detalhes inferior usam “Detalhes parciais”, em tom neutro. “Sem detalhamento cadastrado” explica a parte não distribuída; não é cobrança adicional nem erro no total confirmado.
- Términos de parcelas agrupados por competência, com dois níveis de abertura: compras/contratos no mês e registros de cada sequência.
- O cabeçalho soma as últimas parcelas efetivamente cadastradas. A redução mensal identificada considera somente calendários completos e começa na competência seguinte. Registros restantes e redução mensal têm rótulos distintos.
- Testes adicionais em `scripts/planning-smoke.js` verificam soma por competência e exclusão de calendários parciais do alívio mensal.

### Correção do Nubank e vínculo das parcelas atuais/futuras

O pagamento antigo retirado pelo usuário fica arquivado no backup, com `excludedFromInvoiceDetails` e `invoiceRecordVisibility: archive-only`, sem aparecer na composição atual. Não gera pagamento de caixa. As parcelas atuais de faturas são associadas às séries futuras apenas quando há correspondência única entre cartão, competência, valor e parcela (número/total), eliminando sequências visuais repetidas de C&A e Renner sem apagar dados nem alterar projeções. Testes reais opcionais: `node scripts/planning-smoke.js index.html <backup-ajustado>`.

### Dados e backup em um só lugar

Um único acesso no cabeçalho abre criação de backup protegido e restauração. Importação de parcelas e exportação para análise ficam em ferramentas expansíveis nessa área. Removidos os atalhos repetidos da lateral, cabeçalho móvel, cartões, revisão de planejamento, preferências e simulação. A tela inicial vazia preserva o atalho de recuperação; o lembrete periódico leva à central. Criptografia, arquivos aceitos e confirmação de substituição continuam iguais.

## Contas e entrada pela conversa

Contas prioriza A pagar, Pagas e recebidas e A conferir; outras visualizações ficam recolhidas. Ações secundárias por conta ficam em Mais opções. Novo lançamento começa por valor e descrição, com atalhos de tipo e categoria nos detalhes opcionais.

**Contas → Trazer do ChatGPT** recebe blocos `MEU-FINANCEIRO-CHAT-V1` como sugestões. Cada item exige confirmação antes de criar registro financeiro. Isso não é sincronização com o chat e não usa restauração de backup. Veja [CONVERSA_CHATGPT.md](CONVERSA_CHATGPT.md) para o contrato, exemplos e limites. Teste: `node scripts/chat-entry-smoke.js index.html`.

## V18 — arquivo diário do ChatGPT

Contas → Trazer do ChatGPT → Escolher arquivo do ChatGPT (.json) lê pacotes MEU-FINANCEIRO-CHAT-V1 de até 100 itens e 500 KB. A leitura ocorre localmente; itens válidos entram em A conferir, sem substituir a base ou movimentar o caixa. IDs estáveis impedem reenvios do mesmo item. Blocos inválidos ou backups completos não são aceitos nessa entrada. Copiar e colar continua disponível em opção expansível.

Para usar no celular, compartilhe CONVERSA_CHATGPT.md com a nova conversa, anote os gastos e peça o arquivo quando desejar. Não há geração diária automática nem sincronização com o navegador. O teste chat-entry-smoke.js cobre também seleção de arquivo, reenvio, tamanho máximo e formatos incompatíveis.


## V19 — revisão das faturas e padronização

Pagamentos e refinanciamentos anteriores deixam a composição atual quando os demais lançamentos somam exatamente o total da fatura. Exclusões são respeitadas nas compras, créditos, orçamento e conferência. Estornos atuais permanecem. Não há remoção por coincidência de valor, data ou estabelecimento.

Categorias antigas são normalizadas pela finalidade, preservando classificações manuais, viagens opcionais, empréstimos separados e valores de caixa. Parcelas futuras sem categoria herdam uma classificação inequívoca do mesmo cartão e estabelecimento. Previsões mensais recebem vínculos estáveis, sem criar cobranças ou reativar meses resolvidos.

O fechamento exato é preservado. Sem uma data exata, o dia habitual é exibido como previsão anterior ao vencimento, com ajuste para o último dia do mês. Datas inexistentes e fechamentos posteriores ao vencimento são recusados.

Em **Dados e backup → Aplicar revisão do ChatGPT**, um arquivo `MEU-FINANCEIRO-REVIEW-V1` confirma somente faturas cujo identificador, cartão, competência e total ainda coincidam. Faturas alteradas depois da revisão são preservadas, com aviso. Aplicar novamente não duplica registros. A revisão mantém lançamentos novos e não restaura uma base antiga. Totais estimados só passam a confirmados mediante esse arquivo ou edição explícita; igualdade numérica não confirma uma estimativa automaticamente.

Validação: `node scripts/financial-review-smoke.js index.html`; opcionalmente, passe o caminho de um backup privado para comparar caixa, 48 meses, projeção por data e composição de todas as faturas. Dados privados e arquivos de revisão nunca são publicados neste repositório.

## V19.1 — valores previstos consistentes

Editar um lançamento previsto atualiza também seu ajuste de orçamento. O formulário comum e a edição de repetição exibem o valor efetivo do mês, inclusive quando existe um ajuste anterior. Criar ou editar uma sequência de lazer grava o valor escolhido para cada mês selecionado, sem ser substituído pelo padrão mensal.

A edição de orçamento aberta pela lista de vários meses mantém a competência do lançamento. Valor previsto total, valor já utilizado/reservado e restante têm rótulos próprios. As leituras de Hoje, Contas, Plano, detalhamento mensal e simulação usam a mesma previsão. A hipótese de obra é aplicada uma única vez; seus formulários identificam a base editada.

Pagamentos continuam separados das previsões. Alterações de um mês não modificam automaticamente os meses seguintes; a edição de repetição mantém essa escolha explícita. O formulário impede reduzir a previsão abaixo dos gastos vinculados ou mover uma previsão utilizada para outro mês. Não é necessário importar outro arquivo para esta atualização.

Teste: `node scripts/forecast-sync-smoke.js index.html`. O teste compara os caminhos de edição, reservas vinculadas, recorrências, competência, persistência, reabertura e hipótese de obra. Pode receber um backup privado e a versão anterior do HTML como argumentos opcionais para verificar que previsões não editadas mantêm seus valores.

## V20 — vencimento por cartão e fim da repetição

Em Cartões → Vencimento, cadastre o dia fixo e escolha o ajuste para o próximo dia útil. A regra vale a partir da referência selecionada, sem criar faturas ou alterar seus totais. Datas de faturas pagas são preservadas. Uma data específica informada para uma fatura prevalece sobre a regra; esse campo também pode ser limpo para voltar ao cálculo automático.

O calendário considera fins de semana, feriados bancários nacionais, Carnaval, Sexta-Feira da Paixão, Corpus Christi e o último dia de atendimento bancário do ano para pagamento de contas. Feriados adicionais aceitam DD/MM (anual) ou AAAA-MM-DD. As previsões usam esse calendário, mas a data específica comunicada pelo banco pode ser registrada como exceção. Referências: [calendário FEBRABAN](https://feriadosbancarios.febraban.org.br/), [orientação FEBRABAN sobre pagamentos no fim do ano](https://portal.febraban.org.br/Noticia/4403/pt_br), [Resolução CMN 4.880/2020](https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=4880&tipo=RESOLU%C3%87%C3%83O%20CMN).

Dias 1 a 19 pertencem ao segundo mês do ciclo salarial, e dias 20 a 31 ao primeiro. Dias que não existem no mês são limitados ao último dia, antes do ajuste bancário. O deslocamento para o próximo dia útil não transfere o compromisso para outra referência salarial. As próximas parcelas conhecidas ganham vencimento, sem misturar empréstimos separados ou alterar pagamentos e dados de compras.

Em Contas → Mais opções → Parar de repetir, escolha o primeiro mês sem a conta e confirme Encerrar repetição. O mesmo acesso existe em Editar repetição. A operação retira previsões pendentes a partir do mês escolhido, mantém os registros e permite Desfazer. Pagamentos anteriores, receitas recebidas e gastos vinculados permanecem. Uma reserva que já possua gastos vinculados é encerrada apenas quanto ao restante ainda previsto. Para retirar somente uma ocorrência, continua disponível Não ocorreu.

Validação: `node scripts/due-recurrence-smoke.js index.html`. Testes abrangem calendários, anos bissextos, virada de ano, feriados locais, exceções, persistência, integridade financeira, mês de encerramento, histórico, despesas vinculadas e desfazer.

## V20.1 — encontrar e editar valores a receber

Contas passa a oferecer A receber como filtro principal, com receitas previstas e programações compartilhadas ainda pendentes na mesma lista. O filtro abre todos os meses e mantém busca por descrição, pessoa e valor. O botão Editar aparece por escrito; recebimentos já concluídos ficam no histórico. A visualização escolhida é preservada ao recarregar.

Novas receitas previstas, incluindo as confirmadas a partir de sugestões do ChatGPT, abrem essa lista após o cadastro. Programações compartilhadas novas também chegam à lista. A página de reembolsos oferece um acesso para todos os valores a receber, além de botões de edição com texto. Os registros continuam em seus formatos originais; não há migração, cópia ou nova movimentação de saldo.

A edição de uma programação compartilhada atualiza as parcelas pendentes e preserva os eventos de recebimento anteriores. Mudanças que deslocariam a identidade de uma parcela já recebida são recusadas antes de qualquer gravação. Mês inicial, valor e numeração passam por validação.

Validação: `node scripts/receivable-edit-smoke.js index.html`. Cobre cadastro, descoberta, edição, persistência, dois tipos de recebíveis, projeções, integridade de identificadores e preservação do histórico financeiro.

### V21 — busca e ações do dia

Busca geral por descrição, pessoa, cartão, categoria ou valor em todos os meses, com acesso ao editor original. Excluídos e créditos arquivados não reaparecem. A tela Hoje reúne atalhos, Resolver primeiro com edição direta, progresso da meta e categorias que abrem seus lançamentos. Gastos vinculados descontam o restante previsto no gráfico, sem somar pagamentos de faturas. A revisão abre todos os meses para alcançar pendências anteriores. Nenhuma migração ou alteração automática de valores.

Validação: `node scripts/discovery-smoke.js index.html` e demais testes de regressão.

### V21.1 — organizar datas e repetições

Previsões mensais de Diversão, Passagem e Cabelo ficam reservadas sem virar alerta de boleto sem data. Datas conhecidas da mesma série e das faturas servem de projeção quando não há regra ou exceção, com identificação de origem. Histórico ambíguo exige preenchimento. Organizar datas reúne as ocorrências dos próximos 90 dias por conta e permite definir dia mensal, orçamento ao longo do mês ou manter sem data. Empréstimos têm calendário próprio. A configuração preserva datas específicas, valores, recebimentos e pagamentos.

Validação: `node scripts/date-organization-smoke.js index.html`.
