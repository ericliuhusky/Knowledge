module.exports = {
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
        'Foundation'
      ],
      '/Web/': [
        '',
        'Taro'
      ]
    }
  }
}
