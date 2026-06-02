import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import astroExpressiveCode from 'astro-expressive-code'
import rehypeComponents from 'rehype-components'
import rehypeKatex from 'rehype-katex'
import remarkDirective from 'remark-directive'
import remarkMath from 'remark-math'
import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { CodeGroupComponent } from './src/lib/rehype/rehype-component-code-group.mjs'
import { LeetCodeComponent } from './src/lib/rehype/rehype-component-leetcode.mjs'
import { LeetCodeListComponent } from './src/lib/rehype/rehype-component-leetcode-list.mjs'
import rehypeHeadingLinks from './src/lib/rehype/rehype-heading-links.mjs'
import rehypeThoughtLineBreaks from './src/lib/rehype/rehype-thought-line-breaks.mjs'
import remarkGithubAlerts from './src/lib/remark/github-alert.mjs'
import remarkDirectiveRehype from './src/lib/remark/remark-directive-rehype.mjs'
import remarkDemoteH1ToH2 from './src/lib/remark/remark-demote-h1.mjs'
import remarkExternalLinks from './src/lib/remark/remark-external-links.mjs'

function generateSitemap() {
  return {
    name: 'generate-sitemap',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const distDir = new URL(dir).pathname
        const src = join(distDir, 'sitemap-0.xml')
        const dest = join(distDir, 'sitemap.xml')
        if (!existsSync(src)) {
          console.warn('[@generate-sitemap] sitemap-0.xml not found, skipping.')
          return
        }
        copyFileSync(src, dest)
        console.log(
          '[@generate-sitemap] sitemap.xml generated from sitemap-0.xml',
        )
      },
    },
  }
}

const viteEnvPath = fileURLToPath(
  new URL('./node_modules/vite/dist/client/env.mjs', import.meta.url),
)

function resolveViteEnv() {
  return {
    name: 'resolve-vite-env',
    enforce: 'pre',
    resolveId(id) {
      if (id === '@vite/env') {
        return viteEnvPath
      }
    },
  }
}

export default defineConfig({
  site: 'https://blog.sleepwf.dev/',
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },

  output: 'static',
  adapter: vercel(),

  build: {
    inlineStylesheets: 'auto',
  },

  integrations: [
    astroExpressiveCode({
      themes: ['one-light', 'one-dark-pro'],
      useDarkModeMediaQuery: false,
      themeCssRoot: 'html',
      themeCssSelector: (theme) =>
        theme.type === 'dark' ? '.dark' : undefined,
      defaultProps: {
        frame: 'none',
      },
      frames: {
        showCopyToClipboardButton: true,
      },
      styleOverrides: {
        borderRadius: '0.375rem',
        borderWidth: '0',
        codeBackground: ({ theme }) =>
          theme.type === 'dark' ? '#1b1b1b' : '#f5f5f5',
        codeFontFamily: 'var(--font-mono)',
        codeFontSize: '0.875rem',
        codeLineHeight: '1.714',
        codePaddingBlock: '1rem',
        codePaddingInline: '1.5rem',
      },
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/offline'),
    }),
    generateSitemap(),
  ],

  markdown: {
    remarkPlugins: [
      remarkGithubAlerts,
      remarkDemoteH1ToH2,
      remarkMath,
      remarkDirective,
      remarkDirectiveRehype,
      [remarkExternalLinks, { allowHostnames: ['example.com'] }],
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeHeadingLinks,
      rehypeThoughtLineBreaks,
      [
        rehypeComponents,
        {
          components: {
            'code-group': CodeGroupComponent,
            leetcode: LeetCodeComponent,
            'leetcode-list': LeetCodeListComponent,
          },
        },
      ],
    ],
  },

  vite: {
    server: {
      watch: {
        ignored: ['**/.vercel/**', '**/dist/**'],
      },
    },
    resolve: {
      alias: {
        '@vite/env': viteEnvPath,
      },
    },
    plugins: [resolveViteEnv(), tailwindcss()],
  },
})
