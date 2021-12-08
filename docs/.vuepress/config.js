module.exports = {
  base: '/Knowledge/',
  title: 'EricLiu\'s Blog',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/images/杉.svg' }]],

  themeConfig: {
    navbar: [
      { text: 'CS', link: '/CS/' },
      {
        text: 'Swift', children: [
          {
            text: 'Swift语言参考',
            link: '/Swift/ReferenceManual/'
          }
        ]
      },
      { text: 'iOS', link: '/iOS/' },
      { text: 'Web', link: '/Web/' },
      { text: 'Books', link: '/Books/' },
      { text: 'Tools', link: '/Tools/' },
      { text: 'GitHub', link: 'https://github.com/ericliuhusky' },
    ],

    sidebar: {
      '/CS/': [
        {
          text: '计算机科学',
          children: [
            'AsynchronyProgramming.md',
            'DesignPatterns.md'
          ]
        }
      ],
      '/Swift/ReferenceManual/': [
        {
          text: 'Swift语言参考',
          children: [
            'LexicalStructure.md',
            'Types.md',
            'Attributes.md',
          ]
        }
      ],
      '/iOS/': [
        {
          text: 'iOS',
          children: [
            'Data-structure.md',
            'Algorithm.md',
            'Swift.md',
            'String.md',
            'Foundation.md',
            'UIKit.md',
            'WebKit.md',
            'Memory-management.md',
            'Network.md',
            'Data-storage.md',
            'Multi-thread.md',
            'Design-patterns.md',
            'Concurrency.md',
            'Alamofire.md',
            'OC->Swift.md'
          ]
        }
      ],
      '/Web/': [
        {
          text: 'Web',
          children: [
            'CSS.md',
            'HTML.md',
            'JavaScript.md',
            'React.md',
            'Taro.md',
            'Vue.md',
            'http.md',
            'Performance-optimization.md'
          ]
        }
      ],
      '/Books/': [
        {
          text: '书籍',
          children: [
            'Swifter-SwiftTips.md'
          ]
        }
      ],
      '/Tools/': [
        {
          text: '工具',
          children: [
            'SwiftToolChain.md',
            'Git.md',
            'DocC.md',
            'Gitmoji.md',
            'UsefulWebsites.md',
            'Vuepress.md',
            'Markdown.md'
          ]
        }
      ]
    }
  }
}
