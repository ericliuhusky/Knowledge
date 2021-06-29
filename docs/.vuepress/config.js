module.exports = {
  base: '/Knowledge/',
  title: 'EricLiu\'s Blog',

  themeConfig: {
    nav: [
      { text: 'CS', link: '/CS/'},
      { text: 'iOS', link: '/iOS/' },
      { text: 'Web', link: '/Web/' },
      { text: 'Books', link: '/Books/' },
      { text: 'Tools', link: '/Tools/' },
      { text: 'GitHub', link: 'https://github.com/ericliuhusky' },
    ],

    sidebar: {
      '/CS/': [
        '',
        'AsynchronyProgramming',
      ],
      '/iOS/': [
        '',
        'Data-structure',
        'Algorithm',
        'Swift',
        'String',
        'Foundation',
        'UIKit',
        'WebKit',
        'Memory-management',
        'Network',
        'Data-storage',
        'Multi-thread',
        'Design-patterns',
        'Concurrency'
      ],
      '/Web/': [
        '',
        'CSS',
        'HTML',
        'JavaScript',
        'React',
        'Taro',
        'Vue',
        'http',
        'Performance-optimization'
      ],
      '/Books/': [
        '',
        'Swifter-SwiftTips'
      ],
      '/Tools/': [
        '',
        'SwiftToolChain',
        'Git',
        'DocC'
      ]
    }
  }
}
