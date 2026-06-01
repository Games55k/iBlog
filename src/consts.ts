import type { Metadata, Projects, Site, Socials, TechStack } from '@types'

export const SITE: Site = {
  NAME: 'Hi, this is Sleepwf',
  EMAIL: 'Games55k@163.com',
  DESCRIPTION: 'Have the confidence to accomplish anything.',
  NUM_POSTS_ON_HOMEPAGE: 4,
  NUM_THOUGHTS_ON_HOMEPAGE: 3,
  NUM_RELATED_POSTS_ON_POST: 5,
}

export const HOME: Metadata = {
  TITLE: '主页',
  DESCRIPTION: '一个简洁轻量的 Astro 博客网站.',
}

export const BLOG: Metadata = {
  TITLE: '文章',
  DESCRIPTION: '记录我的思考和学习.',
}

export const THOUGHTS: Metadata = {
  TITLE: '碎碎念',
  DESCRIPTION: '日常随想与生活点滴.',
}

export const ABOUT: Metadata = {
  TITLE: '关于',
  DESCRIPTION: '关于我.',
}

export const FRIENDS: Metadata = {
  TITLE: '友链',
  DESCRIPTION: '我的朋友们.',
}

export const MESSAGES: Metadata = {
  TITLE: '留言板',
  DESCRIPTION: '在这里留下你的足迹和想说的话.',
}

export const PROJECTS: Projects = [
  // {
  //   category: '项目',
  //   items: [
  //     {
  //       name: 'My Blog',
  //       href: 'https://github.com/username/blog',
  //       homepage: 'https://example.com',
  //       description: '我的个人博客，基于 Astro Doge 主题',
  //     },
  //     {
  //       name: 'Side Project',
  //       href: 'https://github.com/username/side-project',
  //       badge: 'WIP',
  //       description: '一个正在开发中的项目',
  //     },
  //   ],
  // },
]

export const TECH_STACK: TechStack = [
  {
    category: '语言',
    items: [
      {
        name: 'Go',
        href: 'https://go.dev',
        description: '简洁而优雅',
      },
      {
        name: 'C/C++',
        href: 'https://isocpp.org',
        description: '无须多言',
      },
      {
        name: 'Python',
        href: 'https://www.python.org',
        description: '人生苦短，我用Pyhton',
      },
    ],
  },
  {
    category: '运行时',
    items: [
      {
        name: 'Bun',
        href: 'https://bun.sh/',
        description: '一个快速、全能的 JS/TS/JSX 运行时、工具包',
      },
      {
        name: 'Vercel',
        href: 'https://vercel.com/',
        description: '可选的评论、点赞和在线发布 API 部署平台',
      },
    ],
  },
]

export const SOCIALS: Socials = [
  {
    NAME: 'GitHub',
    HREF: 'https://github.com/Games55k',
  },
]
