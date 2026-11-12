# Native Hydra integration

VimmVault is intended to become a first-party catalogue destination inside the
Hydra desktop application. This folder documents the separate download adapter
boundary; it is not a standalone launcher and it is not yet an implemented
Hydra plugin.

## Non-negotiable separation

- A Vimm Vault page URL is metadata/navigation, never a download URI.
- A catalogue record may exist without a downloadable file.
- The literal `[BRANCO]` means catalog-only. It must never create a download
  button, IPC request, or download task.
- Only homebrew, public-domain software, or files with explicit redistribution
  permission may enter the authorized download adapter.
- Commercial ROM/ISO files without authorization are not redistributed.
- Do not scrape or bulk-download ROM files, or bypass unavailable/removed links.

## Native behavior

The intended implementation extends Hydra's own renderer, Electron IPC,
catalogue, local library, Classics scanner, and emulator launch flows. It must
not require users to open a separate website to browse the catalogue.

The upstream Hydra source inspected for the current design is pinned in
[the native integration contract](../docs/native-hydra-integration.md). Hydra
already has a Classics catalogue and local ROM scanning/import support, but
its current platform/emulator model does not cover all 36 VimmVault platforms.
Each platform must be explicitly marked as natively supported or metadata-only
until its emulator path has been implemented and tested.

## Download adapter

Do not guess the Hydra download-source JSON shape. Before enabling downloads:

1. Inspect the exact target Hydra commit and its current download-source types.
2. Implement an adapter for authorized fixture records only.
3. Validate records in both the Electron main process and renderer boundary.
4. Test a harmless authorized fixture through Hydra's native download manager.
5. Verify that `[BRANCO]` and unauthorized records are rejected.

## Status

The catalogue/schema foundation exists. Native UI, library bridge, download
adapter, emulator coverage, and Windows installer are still pending. See
[Native Hydra integration contract](../docs/native-hydra-integration.md) for
the implementation plan and acceptance tests.
