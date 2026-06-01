import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function randomId(len = 3) {
  let s = ''
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10)
  return s
}

// 获取命令行参数
const args = process.argv.slice(2)
const name = args[0] || randomId()
const content = args[1] || '' // 可选的内容参数

// 转换为本地 ISO 8601 格式
function toLocalISOString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const offset = -date.getTimezoneOffset()
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0')
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0')
  const offsetSign = offset >= 0 ? '+' : '-'

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`
}

// 获取当前日期时间
const now = new Date()
const year = now.getFullYear()
const month = String(now.getMonth() + 1).padStart(2, '0')
const day = String(now.getDate()).padStart(2, '0')

const dateStr = toLocalISOString(now)

const dirPath = path.join(
  __dirname,
  '../src/content/thoughts',
  String(year),
  month,
)

// 创建目录（如果不存在）
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true })
  console.log('📁 创建目录:', dirPath)
}

const filename = `${day}_${name}.md`
const filePath = path.join(dirPath, filename)

const thoughtContent = content || '暂未输入'
const fileContent = `---
date: ${dateStr}
tags: ["日常"]
draft: false
---

${thoughtContent}
`

// 写入文件
fs.writeFileSync(filePath, fileContent, 'utf-8')

console.log('\n✨ 成功创建想法！\n')
console.log('📅 日期:', dateStr)
console.log('📄 文件:', filePath)
console.log('📝 内容:', thoughtContent)
console.log('\n💡 现在可以继续编辑你的想法了！')
