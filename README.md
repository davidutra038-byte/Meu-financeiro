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
