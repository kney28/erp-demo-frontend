
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
      { path: '/neighborhoods', name: 'neighborhoods', component: () => import('pages/NeighborhoodsPage.vue') },
      { path: '/validities', name: 'validities', component: () => import('pages/ValidityPage.vue') },
      { path: '/companies', name: 'companies', component: () => import('pages/CompanyPage.vue') },
      { path: '/changePasswords', name: 'changePasswords', component: () => import('pages/ChangePasswordPage.vue') },
      { path: '/logsChangePasswords', name: 'logsChangePasswords', component: () => import('pages/LogChangePasswordPage.vue') },
      { path: '/logsAudits', name: 'logsAudits', component: () => import('pages/LogAuditPage.vue') },
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
