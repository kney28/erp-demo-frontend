
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/configuration/profiles', name: 'profiles', component: () => import('pages/configuration/ProfilePage.vue') },
      { path: '/configuration/users', name: 'users', component: () => import('pages/configuration/UsersPage.vue') },
      { path: '/configuration/erp_moduless', name: 'erp_modules', component: () => import('pages/configuration/Erp_modulessPage.vue') },
      { path: '/configuration/neighborhoods', name: 'neighborhoods', component: () => import('pages/configuration/NeighborhoodsPage.vue') },
      { path: '/configuration/validities', name: 'validities', component: () => import('pages/configuration/ValidityPage.vue') },
      { path: '/configuration/companies', name: 'companies', component: () => import('pages/configuration/CompanyPage.vue') },
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

      { path: '/admissions/headquarters', name: 'headquarters', component: () => import('pages/admissions/HeadquarterssPage.vue') },
      { path: '/admissions/healthproviders', name: 'healthproviders', component: () => import('pages/admissions/HealthproviderssPage.vue') },
      { path: '/admissions/charges', name: 'charges', component: () => import('pages/admissions/ChargesPage.vue') },
      { path: '/admissions/groundsdenialcares', name: 'groundsdenialcares', component: () => import('pages/admissions/GroundsdenialcaresPage.vue') },
      { path: '/admissions/sisbenlevels', name: 'sisbenlevels', component: () => import('pages/admissions/SisbenlevelsPage.vue') },
      { path: '/admissions/specialpopulations', name: 'specialpopulations', component: () => import('pages/admissions/SpecialpopulationsPage.vue') },
      { path: '/admissions/moderatingcopays', name: 'moderatingcopays', component: () => import('pages/admissions/ModeratingcopaysPage.vue') },
      { path: '/admissions/moderatingcopaysdets', name: 'moderatingcopaysdets', component: () => import('pages/admissions/ModeratingcopaysdetsPage.vue') },
      { path: '/admissions/healthadministrators', name: 'healthadministrators', component: () => import('pages/admissions/HealthadministratorsPage.vue') },
      { path: '/admissions/requirementslists', name: 'requirementslists', component: () => import('pages/admissions/RequirementslistsPage.vue') },
      { path: '/admissions/requirementslistdets', name: 'requirementslistdets', component: () => import('pages/admissions/RequirementslistdetsPage.vue') },
      { path: '/admissions/patients', name: 'patients', component: () => import('pages/admissions/PatientsPage.vue') },

      { path: '/hiring/categoriescupss', name: 'categoriescupss', component: () => import('pages/hiring/CategoriescupssPage.vue') },
      { path: '/hiring/entitytemplates', name: 'entitytemplates', component: () => import('pages/hiring/EntitytemplatesPage.vue') },
      { path: '/hiring/parameterizationcupss', name: 'parameterizationcupss', component: () => import('pages/hiring/ParameterizationcupssPage.vue') },
      { path: '/hiring/subcatcupss', name: 'subcatcupss', component: () => import('pages/hiring/SubcatcupssPage.vue') },
      { path: '/hiring/subgruposcupss', name: 'subgruposcupss', component: () => import('pages/hiring/SubgruposcupssPage.vue') },
      { path: '/hiring/percentageqxs', name: 'percentageqxs', component: () => import('pages/hiring/PercentageqxsPage.vue') },
      { path: '/hiring/percentajeqxdets', name: 'percentajeqxdets', component: () => import('pages/hiring/PercentageqxdetsPage.vue') },
      { path: '/hiring/healthservices', name: 'healthservices', component: () => import('pages/hiring/HealthservicesPage.vue') },
      { path: '/hiring/parameterizationqxs', name: 'parameterizationqxs', component: () => import('pages/hiring/ParameterizationqxsPage.vue') },

      { path: '/treasury/tscasreccons', name: 'tscasreccons', component: () => import('pages/treasury/TscasrecconsPage.vue') },
      { path: '/treasury/tsdiscons', name: 'tsdiscon', component: () => import('pages/treasury/TsdisconsPage.vue') },

      { path: '/accounting/acccongens', name: 'acccongens', component: () => import('pages/accounting/AcccongensPage.vue') },
      { path: '/accounting/accountingtermss', name: 'accountingtermss', component: () => import('pages/accounting/AccountingtermssPage.vue') },
      { path: '/accounting/acccostcenterss', name: 'Acccostcenterss', component: () => import('pages/accounting/AcccostcenterssPage.vue') },
      { path: '/accounting/accbalmovs', name: 'Accbalmovs', component: () => import('pages/accounting/AccbalmovsPage.vue') },
      { path: '/accounting/accentsubdets', name: 'accentsubdets', component: () => import('pages/accounting/AccentsubdetsPage.vue') },
      { path: '/accounting/accinicialruns', name: 'accinicialruns', component: () => import('pages/accounting/AccinicialrunsPage.vue') },
      { path: '/accounting/accountingentriesdets', name: 'accountingentriesdets', component: () => import('pages/accounting/AccountingentriesdetsPage.vue') },
      { path: '/accounting/accountingentriess', name: 'accountingentriess', component: () => import('pages/accounting/AccountingentriessPage.vue') },
      { path: '/accounting/accannclos', name: 'accannclos', component: () => import('pages/accounting/AccannclosPage.vue') },
      { path: '/accounting/accannualclosingentrys', name: 'accannualclosingentrys', component: () => import('pages/accounting/AccannualclosingentrysPage.vue') },
      { path: '/accounting/accmontopes', name: 'accmontopes', component: () => import('pages/accounting/AccmontopesPage.vue') },
      { path: '/accounting/accmonclos', name: 'accmonclos', component: () => import('pages/accounting/AccmonclosPage.vue') },
      { path: '/accounting/accbeginningbalancess', name: 'accbeginningbalancess', component: () => import('pages/accounting/AccbeginningbalancessPage.vue') },
      { path: '/accounting/accbeginningbalancesdets', name: 'accbeginningbalancesdets', component: () => import('pages/accounting/AccbeginningbalancesdetsPage.vue') },
      { path: '/accounting/accbeginningbalancesdet2s', name: 'accbeginningbalancesdet2s', component: () => import('pages/accounting/Accbeginningbalancesdet2sPage.vue') },
      { path: '/accounting/accbeginningbalancesdet3s', name: 'accbeginningbalancesdet3s', component: () => import('pages/accounting/Accbeginningbalancesdet3sPage.vue') },

      { path: '/clinichistory/hcdignosess', name: 'hcdignosess', component: () => import('pages/clinic-history/HcdignosessPage.vue') },
      { path: '/clinichistory/hchealthpros', name: 'hchealthpros', component: () => import('pages/clinic-history/HchealthprosPage.vue') },
      { path: '/clinichistory/hcspecialtiess', name: 'hcspecialtiess', component: () => import('pages/clinic-history/HcspecialtiessPage.vue') },
      { path: '/clinichistory/hcvadsispromipress', name: 'hcvadsispromipress', component: () => import('pages/clinic-history/HcvadsispromipressPage.vue') },
      { path: '/clinichistory/hcclassanestrecords', name: 'hcclassanestrecords', component: () => import('pages/clinic-history/HcclassanestrecordsPage.vue') },
      { path: '/clinichistory/hcadvereventclasss', name: 'hcadvereventclasss', component: () => import('pages/clinic-history/HcadvereventclasssPage.vue') },
      { path: '/clinichistory/hcallerclasss', name: 'hcallerclasss', component: () => import('pages/clinic-history/HcallerclasssPage.vue') },
      { path: '/clinichistory/hcvacunclasss', name: 'hcvacunclasss', component: () => import('pages/clinic-history/HcvacunclasssPage.vue') },
      { path: '/clinichistory/hccauserefusrefers', name: 'hccauserefusrefers', component: () => import('pages/clinic-history/HccauserefusrefersPage.vue') },
      { path: '/clinichistory/hccauseremisrefers', name: 'hccauseremisrefers', component: () => import('pages/clinic-history/HccauseremisrefersPage.vue') },

      { path: '/goods/goopars', name: 'goopars', component: () => import('pages/goods/GooparsPage.vue') },
      { path: '/goods/gooconfs', name: 'gooconfs', component: () => import('pages/goods/GooconfsPage.vue') },
      { path: '/goods/gooclas', name: 'gooclas', component: () => import('pages/goods/GooclasPage.vue') },

      { path: '/accountsreceivable/cxcaccrecs', name: 'cxcaccrecs', component: () => import('pages/accounts-receivable/CxcaccrecsPage.vue') },
      { path: '/accountsreceivable/cxccoucons', name: 'cxccoucons', component: () => import('pages/accounts-receivable/CxccouconsPage.vue') },

      { path: '/accountspayable/cxpcoucons', name: 'cxpcoucons', component: () => import('pages/accounts-payable/CxpcouconsPage.vue') },
      { path: '/accountspayable/cxpproviderss', name: 'cxpproviderss', component: () => import('pages/accounts-payable/CxpproviderssPage.vue') },

      { path: '/medicalappointments/appofficess', name: 'appofficess', component: () => import('pages/medical-appointments/AppofficessPage.vue') },
      { path: '/medicalappointments/appreacans', name: 'appreacans', component: () => import('pages/medical-appointments/AppreacansPage.vue') },

      { path: '/inventory/invaccpars', name: 'invaccpars', component: () => import('pages/inventory/InvaccparsPage.vue') },
      { path: '/inventory/invunitsmeas', name: 'invunitsmeas', component: () => import('pages/inventory/InvunitsmeasPage.vue') },
      { path: '/inventory/invmanufroless', name: 'invmanufroless', component: () => import('pages/inventory/InvmanufrolessPage.vue') },
      { path: '/inventory/invcums', name: 'invcums', component: () => import('pages/inventory/InvcumsPage.vue') },
      { path: '/inventory/invpharfors', name: 'invpharfors', component: () => import('pages/inventory/InvpharforsPage.vue') },
      { path: '/treasury/tsnotcons', name: 'tsnotcons', component: () => import('pages/treasury/TsnotconsPage.vue') },
      { path: '/treasury/tsboxess', name: 'tsboxess', component: () => import('pages/treasury/TsboxessPage.vue') },
      { path: '/treasury/tsbankss', name: 'tsbankss', component: () => import('pages/treasury/TsbankssPage.vue') },
      { path: '/treasury/tsconpays', name: 'tsconpays', component: () => import('pages/treasury/TsconpaysPage.vue') }

      // { path: '/budget/preconfigenerals', name: 'preconfigenerals', component: () => import('pages/budget/PreconfigeneralsPage.vue') }
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
