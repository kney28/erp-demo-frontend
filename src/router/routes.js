
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/users', name: 'users', component: () => import('pages/UsersPage.vue') },
      { path: '/profiles', name: 'profiles', component: () => import('pages/ProfilePage.vue') },
      { path: '/neighborhoods', name: 'neighborhoods', component: () => import('pages/NeighborhoodsPage.vue') },
      { path: '/configuration/validities', name: 'validities', component: () => import('pages/configuration/ValidityPage.vue') },
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
      { path: '/admissions/occupations', name: 'occupations', component: () => import('pages/admissions/OccupationsPage.vue') },
      { path: '/hiring/groupsCUPS', name: 'groupsCUPS', component: () => import('pages/hiring/GroupsCUPSPage.vue') },
      { path: '/thirds', name: 'thirds', component: () => import('pages/ThirdsPage.vue') },

      { path: '/billing/careservices', name: 'careservices', component: () => import('pages/billing/CareservicesPage.vue') },
      { path: '/billing/numerationdian', name: 'numerationDIAN', component: () => import('pages/billing/NumerationdiansPage.vue') },

      { path: '/hospitalization/beds', name: 'beds', component: () => import('pages/hospitalization/BedsPage.vue') },
      { path: '/hospitalization/fees', name: 'fees', component: () => import('pages/hospitalization/FeesPage.vue') },
      { path: '/hospitalization/floors', name: 'floorservices', component: () => import('pages/hospitalization/FloorsPage.vue') },
      { path: '/hospitalization/locations', name: 'locations', component: () => import('pages/hospitalization/LocationsPage.vue') },

      { path: '/configuration/holidays', name: 'holidays', component: () => import('pages/configuration/HolidayssPage.vue') },
      { path: '/configuration/permissionss', name: 'permissionss', component: () => import('pages/configuration/PermissionssPage.vue') },

      { path: '/admissions/headquarters', name: 'headquarters', component: () => import('pages/admissions/HeadquarterssPage.vue') },
      { path: '/admissions/healthproviders', name: 'healthproviders', component: () => import('pages/admissions/HealthproviderssPage.vue') },
      { path: '/admissions/charges', name: 'charges', component: () => import('pages/admissions/ChargesPage.vue') },
      { path: '/admissions/groundsdenialcares', name: 'groundsdenialcares', component: () => import('pages/admissions/GroundsdenialcaresPage.vue') },
      { path: '/admissions/sisbenlevels', name: 'sisbenlevels', component: () => import('pages/admissions/SisbenlevelsPage.vue') },
      { path: '/admissions/specialpopulations', name: 'specialpopulations', component: () => import('pages/admissions/SpecialpopulationsPage.vue') },

      { path: '/hiring/categoriescupss', name: 'categoriescupss', component: () => import('pages/hiring/CategoriescupssPage.vue') },
      { path: '/hiring/entitytemplates', name: 'entitytemplates', component: () => import('pages/hiring/EntitytemplatesPage.vue') },
      { path: '/hiring/parameterizationcupss', name: 'parameterizationcupss', component: () => import('pages/hiring/ParameterizationcupssPage.vue') },
      { path: '/hiring/subcatcupss', name: 'subcatcupss', component: () => import('pages/hiring/SubcatcupssPage.vue') },
      { path: '/hiring/subgruposcupss', name: 'subgruposcupss', component: () => import('pages/hiring/SubgruposcupssPage.vue') },

      { path: '/accounting/acccongens', name: 'acccongens', component: () => import('pages/accounting/AcccongensPage.vue') },
      { path: '/accounting/accountingtermss', name: 'accountingtermss', component: () => import('pages/accounting/AccountingtermssPage.vue') },
      { path: '/accounting/acccostcenterss', name: 'Acccostcenterss', component: () => import('pages/accounting/AcccostcenterssPage.vue') },
      { path: '/accounting/accbalmovs', name: 'Accbalmovs', component: () => import('pages/accounting/AccbalmovsPage.vue') }
    ]
  },
  { path: '/login', name: 'login', component: () => import('src/pages/LoginPage2.vue') },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
