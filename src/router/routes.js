
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/modules/pokedex/pages/PokedexWelcome.vue') }
    ]
  },
  {
    path: '/pokedex',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/pokedexGame', name: "Dashoard", component: () => import('src/modules/pokedex/pages/PokedexGame.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
