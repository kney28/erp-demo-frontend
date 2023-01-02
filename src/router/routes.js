
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/users', name: 'users', component: () => import('pages/UsersPage.vue') },
      { path: '/profiles', name: 'profiles', component: () => import('pages/ProfilePage.vue') },
      { path: '/neighborhoods', name: 'neighborhoods', component: () => import('pages/NeighborhoodsPage.vue') },
      { path: '/validities', name: 'validities', component: () => import('pages/ValidityPage.vue') },
      { path: '/companies', name: 'companies', component: () => import('pages/CompanyPage.vue') },
      { path: '/changePasswords', name: 'changePasswords', component: () => import('pages/ChangePasswordPage.vue') },
      { path: '/logsAudits', name: 'logsAudits', component: () => import('pages/LogAuditPage.vue') },
      { path: '/accountingSettings', name: 'accountingSettings', component: () => import('pages/AccountingSettingsPage.vue') },
      { path: '/thirdsAccountants', name: 'thirdsAccountants', component: () => import('pages/ThirdsAccountantsPage.vue') },
      { path: '/accountingTerms', name: 'accountingTerms', component: () => import('pages/AccountingTermsPage.vue') },
      { path: '/typeSeats', name: 'typeSeats', component: () => import('pages/TypeSeatsPage.vue') },
      { path: '/retentionConcept', name: 'retentionConcept', component: () => import('pages/RetentionConceptpage.vue') },
      { path: '/costCenter', name: 'costCenter', component: () => import('pages/CostCenterpage.vue') },
      { path: '/accountBalance', name: 'accountBalance', component: () => import('pages/AccountBalancePage.vue') },
      { path: '/openingBalances', name: 'openingBalances', component: () => import('pages/OpeningBalancePage.vue') },
      { path: '/accountingEntries', name: 'accountingEntries', component: () => import('pages/AccountingEntriesPage.vue') },
      { path: '/monthlyClosure', name: 'monthlyClosure', component: () => import('pages/MonthlyClosurePage.vue') },
      { path: '/monthlyOpening', name: 'monthlyOpening', component: () => import('pages/MonthlyOpeningPage.vue') },
      { path: '/yearSeatClosure', name: 'yearSeatClosure', component: () => import('pages/YearSeatClosurePage.vue') },
      { path: '/yearClosure', name: 'yearClosure', component: () => import('pages/YearClosurePage.vue') },
      { path: '/accountCatalog', name: 'accountCatalog', component: () => import('pages/AccountCatalogPage.vue') },
      { path: '/occupations', name: 'occupations', component: () => import('pages/OccupationsPage.vue') },
      { path: '/occupations', name: 'occupations', component: () => import('pages/OccupationsPage.vue') },
      { path: '/groupsCUPS', name: 'groupsCUPS', component: () => import('pages/GroupsCUPSPage.vue') }
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
