# Hydra download output

This directory is reserved for a Hydra-compatible download-source adapter.

The public game catalog and the Hydra download source are deliberately separate:
a game may have a verified Vimm Vault page while having no downloadable file
that can be redistributed.

Only add a download URI after confirming that the file is authorized for
redistribution (for example, homebrew, public-domain software, or explicit
permission from the rights holder). Do not place commercial ROM/ISO links,
scraped Vimm download endpoints, or ordinary Vault page URLs in the download
source.

Before publishing the adapter, validate its exact shape against the current
Hydra version and test it with a harmless authorized fixture.
