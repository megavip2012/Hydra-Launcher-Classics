# VimmVault catalog

The public catalog at `index.json` contains only entries whose individual Vimm's Lair Vault page has been verified.

## Download field

- Use the literal string `"[BRANCO]"` when a title is listed for reference but must not expose a download source.
- Such entries must set `availability.downloadAvailable` and `availability.authorizedDownload` to `false`.
- Only authorized homebrew, public-domain, or explicitly licensed content may use a download object with `authorized: true` and one or more `uris`.

## Import status

Do not infer Vault IDs, page URLs, platform membership, or download availability from a game title alone. Unmatched entries remain in `pending/` until their individual Vault page is checked. The legacy PS1 import currently contains 14 titles awaiting that verification; it is not a complete Vault export.
