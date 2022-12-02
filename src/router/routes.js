
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/users', name: 'users', component: () => import('pages/UsersPage.vue') },
      { path: '/profiles', name: 'profiles', component: () => import('pages/ProfilePage.vue') },
      { path: '/countries', name: 'countries', component: () => import('pages/CountryPage.vue') },
      { path: '/departments', name: 'departments', component: () => import('pages/DepartmentPage.vue') },
      { path: '/municipalities', name: 'municipalities', component: () => import('pages/MunicipalityPage.vue') },
      { path: '/thirds', name: 'thirds', component: () => import('pages/ThirdsPage.vue') }
    ]
  },
  { path: '/login', name: 'login', component: () => import('src/pages/LoginPage.vue') },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
