# Native Hydra integration

## Verified upstream baseline

- Upstream: https://github.com/hydralauncher/hydra
- Inspected upstream commit: `ff952e2312e191bcf0836210540ca03b169b80d3`
- Upstream package version at that commit: `4.4.1`
- Stack: Electron, React, TypeScript and Rust native addon.
- The upstream application already contains a Classics catalogue and local ROM scanning/import flows. The VimmVault integration must extend those native flows rather than create a separate launcher or require a browser.

This document is an implementation contract, not a claim that the integration is already complete.

## Product behavior

1. Add a first-party **VimmVault** destination inside Hydra's renderer navigation and catalogue UI.
2. Load the published VimmVault manifest/catalogue from a versioned HTTPS endpoint, with local cache, schema validation, timeout, and graceful offline behavior.
3. Search and filter by title, platform, region, year, publisher, and developer.
4. A game details view displays metadata, cover when available, and the verified individual Vimm page link.
5. The Vimm page link is informational/navigation only. It is never treated as a download URI.
6. A record with `download: "[BRANCO]"` is catalog-only: no download button, no download task, and no fake install state.
7. An authorized downloadable record may use Hydra's native download manager only after its authorization metadata and URI pass validation.
8. Local ROM discovery, emulator setup, library insertion, and launch must reuse Hydra Classics and its configured emulator integrations. The VimmVault feature must not silently download commercial ROMs.
9. If a catalogue entry has no local ROM and no authorized installer, the UI offers the verified source page and explains that the user must supply a legally obtained local copy.

## Upstream integration points inspected

- `src/renderer/src/main.tsx`: React Router route registration.
- `src/renderer/src/pages/catalogue/catalogue.tsx`: existing catalogue screen and search/filter flow.
- `src/renderer/src/pages/catalogue/game-item-classics.tsx`: native Classics catalogue card.
- `src/main/events/emulators/import-launchbox-roms.ts`: local ROM import/matching flow.
- `src/types/emulator.types.ts`: current emulator-system type and ROM metadata.
- `src/types/index.ts`: `CatalogueSearchResult` and library presentation types.
- `src/types/game.types.ts`: `GameShop` currently includes `steam | epic | custom | launchbox`.

The current upstream Classics implementation is LaunchBox-oriented. Do not pretend a VimmVault record can simply be inserted as a LaunchBox record: identity, details, artwork, library persistence, and emulator mapping need an explicit adapter.

## Recommended implementation design

### Renderer
- Add a VimmVault route and navigation entry using existing Hydra components, translations, loading/error/empty states, and theme tokens.
- Build a typed VimmVault client and catalogue hook with abortable requests, pagination, debounced search, and cached results.
- Reuse the native game-card visual language, but make source-page and install actions distinct.
- Add platform filters driven by `catalog/platforms.json`; do not infer unsupported emulator compatibility from a platform name.

### Main process and security
- Keep network access and download orchestration behind the existing Electron IPC boundary.
- Validate all catalogue records against the checked-in schema before they reach the renderer.
- Allow only HTTPS URLs from explicitly configured hosts.
- Treat `vimmUrl` as an external information URL, never as a file URI.
- Only authorized download records can be converted to Hydra download-source options. Reject `[BRANCO]`, missing authorization, malformed URIs, and unapproved hosts before creating a task.
- Do not scrape or bulk-download ROM files from Vimm, and do not bypass unavailable/removed downloads.

### Library and emulator handoff
- Prefer matching a catalogue entry to an already-scanned local ROM using stable platform/title/region identifiers.
- Where no safe match exists, let the user choose an existing local ROM file/folder through Hydra's native file picker and confirm the match.
- Use Hydra's existing Classics launch path and configured emulator. Never create a fake installed game when no local file exists.
- Keep VimmVault catalogue identity separate from LaunchBox identity until upstream library types and persistence have been deliberately extended and tested.

## Platform compatibility policy

The VimmVault platform list has 36 entries. Hydra's inspected upstream `EmulatorSystem` currently exposes only `ps1 | ps2 | ps3 | ps4 | psp | dolphin`. Therefore the integration must maintain an explicit compatibility map with three states:

- `native-supported`: upstream Hydra has a tested emulator and launch path for this platform.
- `metadata-only`: the platform can be browsed in VimmVault but has no verified native launch mapping in this build.
- `blocked-pending-test`: a proposed mapping exists but must not be exposed until integration tests pass.

Do not claim all 36 platforms can be launched natively merely because they appear in the catalogue. Expand emulator support only through tested upstream-compatible integrations.

## Acceptance tests

- Catalogue loads and remains searchable when online.
- Last successful catalogue snapshot remains browsable offline.
- Every published game has a verified individual Vimm page URL.
- `[BRANCO]` never creates a download button, IPC request, or download task.
- Unauthorized or malformed download records are rejected in both renderer and main process.
- An authorized test fixture can be downloaded through Hydra's native download manager.
- A local ROM can be matched, added to the native library, and launched through its configured emulator.
- Unsupported platforms remain browseable but cannot display a false native Play button.
- Existing Steam, Epic, custom, LaunchBox, Classics, and Big Picture flows continue to pass regression tests.
- Windows development build, typecheck, and automated tests pass before calling the feature usable.

## Delivery stages

1. **Foundation:** pin upstream baseline, create a maintained fork/branch, add the typed provider, schema validation, and catalogue UI.
2. **Library bridge:** match catalogue records to local ROMs and reuse native Classics launch flows.
3. **Authorized downloads:** implement and test a separate authorized-download adapter; keep catalog-only records inert.
4. **Coverage:** add emulator mappings platform by platform, only after tests.
5. **Release:** build Windows installer, test on a clean Windows 11 profile, and publish versioned releases.

## Current status

Planning and upstream source inspection only. No native Hydra code has yet been merged into this repository, no VimmVault screen has been implemented, and no Windows build has been produced. The existing catalogue/schema work remains the data foundation.
