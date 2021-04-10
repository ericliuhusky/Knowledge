module.exports = {
  base: '/Knowledge/',
  title: 'EricLiu\'s Blog',

  themeConfig: {
    nav: [
      { text: 'iOS', link: '/iOS/' },
      { text: 'Web', link: '/Web/' },
      { text: 'GitHub', link: 'https://github.com/ericliuhusky' },
    ],

    sidebar: {
      '/iOS/': [
        '',
        'Data-structure',
        'Algorithm',
        'Foundation',
        'UIKit',
        'WebKit',
        'Memory-management',
        'Network',
        'Data-storage'
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
      ]
    }
  }
}
