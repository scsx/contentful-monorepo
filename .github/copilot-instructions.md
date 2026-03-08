# Copilot Project Instructions

## Architecture

This is a pnpm monorepo structured as:

- apps/ → runtime applications (Next.js site, Contentful App, CMS admin)
- packages/ → shared packages (cms-models, cms-types, ui, utils)
- scripts/ → automation scripts for schema sync, comparison, and migrations

The source of truth for the Contentful content model lives in:
packages/cms-models

Read the main README for folder structure and basic roles.

## Conventions

- All shared packages are imported using the @cms/* alias
- Content model definitions must be deterministic and id-based
- No runtime logic inside cms-models (schema only)
- Scripts must be idempotent when possible
- Do not modify Contentful manually without syncing back to cms-models

## Technical

- Package manager: pnpm
- Language: TypeScript
- Node version: latest LTS
- Use ESM modules
- Github: Using Github desktop

## Communication

- Code and commentaries only in English
- Always speak Portuguese (PT-PT) with user