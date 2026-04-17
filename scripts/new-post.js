/* This is a script to create a new post with folder + index.md structure */

import fs from "fs"
import path from "path"

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error(`Error: No post name argument provided
Usage: npm run new-post -- <post-name>`)
  process.exit(1)
}

const postName = args[0]
const postsDir = "./src/content/posts/"
const postDir = path.join(postsDir, postName)

if (fs.existsSync(postDir)) {
  console.error(`Error: Directory ${postDir} already exists`)
  process.exit(1)
}

fs.mkdirSync(postDir, { recursive: true })

const content = `---
title: ${postName}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
---
`

fs.writeFileSync(path.join(postDir, "index.md"), content)

console.log(`Post ${postDir}/index.md created`)
