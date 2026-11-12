# VimmVault for Hydra

Projeto para integrar um catálogo retrô VimmVault diretamente à interface
nativa do Hydra Launcher, com pesquisa por jogo/plataforma, detalhes,
referências individuais do Vimm e integração segura com a biblioteca Classics.

**Meta de produto:** funcionar dentro do Hydra desktop, não apenas como um JSON
ou site separado. A integração nativa ainda está em desenvolvimento; veja
[contrato de integração nativa](docs/native-hydra-integration.md).

## Regras do projeto

- Cada jogo publicado no catálogo precisa ter um link individual e verificado para sua página no The Vault.
- Não inventar IDs, slugs ou URLs. Registros sem correspondência confirmada ficam em revisão e não entram no catálogo publicado.
- O catálogo pode conter jogos sem download disponível no Vimm.
- Link de página do Vimm e link de download são campos distintos.
- A saída de downloads do Hydra só pode conter arquivos cuja distribuição seja autorizada, como homebrew, domínio público ou conteúdo com permissão explícita.
- O literal `[BRANCO]` significa catálogo sem download: não pode gerar botão, tarefa ou requisição de download.
- Metadados desconhecidos permanecem `null`; não são estimados.
- O arquivo legado `Vimm_Lair Content` será preservado durante a migração.
- Não alegar suporte nativo a uma plataforma até sua integração com emulador ser testada.

## Estrutura

- `catalog/`: registros normalizados e índice público.
- `metadata/`: registro de plataformas e vocabulário comum.
- `hydra/`: contrato para integração com o download manager nativo.
- `schemas/`: contratos JSON para validação.
- `docs/native-hydra-integration.md`: arquitetura, pontos de integração e critérios de aceitação.

## Estado atual

A fundação de catálogo e os metadados de 36 plataformas foram registrados.
A inspeção do código-fonte upstream confirmou que o Hydra já possui Classics,
importação/varredura de ROMs locais e fluxos de emuladores. A integração
VimmVault deverá estender esses mecanismos nativos. Ainda não existe uma tela
VimmVault funcional nem um instalador modificado publicado.

Os 14 registros do arquivo legado continuam em revisão até que seus links
individuais do Vimm sejam confirmados.

## Fonte e atribuição

Vimm's Lair / The Vault: https://vimm.net/vault/

Hydra Launcher upstream: https://github.com/hydralauncher/hydra

Este projeto é independente e não é afiliado nem endossado pelo Vimm's Lair
ou pelo Hydra Launcher.
