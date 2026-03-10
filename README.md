# contentful-monorepo

This monorepo is a structured CMS-as-Code platform that centralizes Contentful schema management, shared design tokens, and application logic in a single repository. It separates responsibilities into frontend applications (e.g., Next.js site and Contentful App), shared packages (content models, generated TypeScript types, UI components, design tokens), and automation scripts for schema synchronization, comparison, and content migrations. The content model is treated as a versioned snapshot stored in Git, with environments synchronized via controlled apply scripts, while runtime content remains managed inside Contentful. This setup ensures consistency, reproducibility, and governance across multiple environments without sacrificing editorial flexibility.

## Structure

```
0.0 Contentful

1.0 repo/
│
├── 2.0 apps/
│   │
│   ├── 2.1 web/                 
│   │       Next.js frontend [reads from 0.0, 3.2, 3.3, 3.4]
│   │       Components might include a simple version to display in 2.2
│   │
│   ├── 2.2 contentful-app/      
│   │       Contentful App (UI extensions like colorpicker, entry-field, sidebar, etc.)
│   │       [reads from 0.0, 3.1] [writes to 0.0]
│   │
│   └── 2.3 cms-admin/           
│           Model creation & migrations (just visual feedback or actions)
│           Schema comparison (and detect manual merges in 0.0)
│           Versioning management
│           Content migration (validates schemas before it)
│           [reads from 0.0, 3.1, 4.0] [writes to 0.0, 3.1]
│
├── 3.0 packages/
│   │
│   ├── 3.1 cms-schema/          
│   │       Content model
│   │ 			Schema as code; content model source of truth; schemaVersion (1)
│   │       Taxonomy
│   │
│   ├── 3.2 types/           
│   │       Generated TypeScript types
│   │
│   ├── 3.3 ui/                  
│   │       Shared UI components [reads from 3.2]
│   │
│   └── 3.4 utils/               
│           Shared helpers (data only)
│           colors, spacing, translations, etc
│
└── 4.0 scripts
        schema/
		      bootstrap-from-contentful.ts (initial import from 0.0 to 3.1)
		      update-model.ts (writes content model from 3.1 to 0.0)
		      compare-model.ts (compares content model from 3.1 to 0.0)
		      compare-env.ts (compares content models between envs in 0.0)
		      export-schema.ts
		
		    taxonomy/
		      sync-taxonomy.ts
		
		    typescript/
		      generate-types.ts [reads from 3.1] [writes to 3.2]
		      
		    content/
			    create-dummy-blog-posts.ts
			    create-dummy-dynamic-page.ts
			    etc... (content tests)
```

## How to start

| Command          | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| **`pnpm web`**   | Starts the **apps/web** (frontend) application on port 3000.  |
| **`pnpm admin`** | Starts the **apps/cms-admin** (admin) application on port 3001.    |
| **`pnpm app`**   | Starts the **apps/contentful-app** (Ctf app) on port 3002.           |
| **`pnpm all`**   | Runs `web`, `cms-admin`, and `contentful-app` in parallel. |
