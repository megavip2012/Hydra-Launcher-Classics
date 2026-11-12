# VimmVault for Hydra

Catálogo público de jogos retrô com referências para as páginas individuais do Vimm's Lair / The Vault e uma saída separada para fontes Hydra com downloads autorizados.

## Regras do projeto

- Cada jogo publicado no catálogo precisa ter um link individual e verificado para sua página no The Vault.
- Não inventar IDs, slugs ou URLs. Registros sem correspondência confirmada ficam em revisão e não entram no catálogo publicado.
- O catálogo pode conter jogos sem download disponível no Vimm.
- Link de página do Vimm e link de download são campos distintos.
- A saída de downloads do Hydra só pode conter arquivos cuja distribuição seja autorizada, como homebrew, domínio público ou conteúdo com permissão explícita.
- Metadados desconhecidos permanecem `null`; não são estimados.
- O arquivo legado `Vimm_Lair Content` será preservado durante a migração.

## Estrutura

- `catalog/`: registros normalizados e índice público.
- `metadata/`: registro de plataformas e vocabulário comum.
- `hydra/`: documentação e saída separada para downloads autorizados.
- `schemas/`: contratos JSON para validação.

## Estado inicial

A estrutura foi criada em uma branch de desenvolvimento. Os 14 registros do arquivo legado ainda não foram promovidos ao catálogo novo porque seus IDs e links individuais do Vimm precisam ser confirmados primeiro.

## Fonte e atribuição

Vimm's Lair / The Vault: https://vimm.net/vault/

Este projeto é independente e não é afiliado nem endossado pelo Vimm's Lair ou pelo Hydra Launcher.
