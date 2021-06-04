import Layout1 from '@/layout/Layout1'

export default [
  {
    path: '/',
    component: Layout1,
    children: [
      {
        path: 'language/edit',
        name: 'Language Settings',
        meta: {
          auth: false
        },
        component: () => import('@/pages/language/Edit')
      }
    ]
  }
]
