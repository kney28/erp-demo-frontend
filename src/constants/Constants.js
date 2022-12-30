export const ACTIVE = 1
export const INACTIVE = 2
export const NIT = 'NIT'

export const DOCUMENTTYPE = [
  { id: 'citizenship_card', description: 'Cédula de ciudadanía' },
  { id: 'foregner_ID', description: 'Cédula de extranjería' },
  { id: 'foreign_card', description: 'Tarjeta de extranjería' },
  { id: 'identity_card', description: 'Tarjeta de identidad' },
  { id: 'passport', description: 'Pasaporte' },
  { id: 'NIT', description: 'NIT' }
]
export const NATURAL = [
  { id: 'legal', description: 'Legal' },
  { id: 'natural', description: 'Natural' }
]

export const STATUS = {
  1: 'Activo',
  2: 'Inactivo'
}

export const STATUSNB = {
  1: 'active',
  2: 'inactive'
}

export const LEVELCATALOG = [
  { id: 1, description: 'Clase' },
  { id: 2, description: 'Grupo' },
  { id: 3, description: 'Cuenta' },
  { id: 4, description: 'Subcuenta' },
  { id: 5, description: 'Auxiliar' }
]

export const CLASSCATALOG = [
  { id: 1, description: 'Activo' },
  { id: 2, description: 'Pasivo' },
  { id: 3, description: 'Patrimonio' },
  { id: 4, description: 'Ingresos' },
  { id: 5, description: 'Gastos' },
  { id: 6, description: 'Costos ventas' },
  { id: 7, description: 'Costos producción' },
  { id: 8, description: 'Cuentas de orden deudoras' },
  { id: 9, description: 'Cuentas de orden acreedores' }
]

export const NATURECATALOG = [
  { id: 1, description: 'Débito' },
  { id: 2, description: 'Crédito' }
]

export const AVAILABILITYTYPECATALOG = [
  { id: 1, description: 'Cuenta corriente' },
  { id: 2, description: 'Cuenta no corriente' },
  { id: 3, description: 'Ambas' }
]

export const SELECTIONCATALOG = [
  { id: 1, description: 'Si' },
  { id: 2, description: 'No' }
]

export const AFFECTSRETENTIONCATALOG = [
  { id: 1, description: 'No afecta' },
  { id: 2, description: 'Rete Fuente' },
  { id: 3, description: 'Rete IVA' },
  { id: 4, description: 'Rete ICA' }
]

export const LISTDOCUMENTTYPE = {
  1: 'Cédula de ciudadanía',
  2: 'Cédula de extranjería',
  3: 'Tarjeta de extranjería',
  4: 'Tarjeta de identidad',
  5: 'Pasaporte',
  6: 'NIT'
}
export const LISTNATURAL = {
  1: 'Legal',
  2: 'Natural'
}

export const LISTSTATUS = {
  1: 'Activo',
  2: 'Inactivo'
}

export const LISTLEVELCATALOG = {
  1: 'Clase',
  2: 'Grupo',
  3: 'Cuenta',
  4: 'Subcuenta',
  5: 'Auxiliar'
}

export const LISTCLASSCATALOG = {
  1: 'Activo',
  2: 'Pasivo',
  3: 'Patrimonio',
  4: 'Ingresos',
  5: 'Gastos',
  6: 'Costos ventas',
  7: 'Costos producción',
  8: 'Cuentas de orden deudoras',
  9: 'Cuentas de orden acreedores'
}

export const LISTNATURECATALOG = {
  1: 'Débito',
  2: 'Crédito'
}

export const LISTAVAILABILITYTYPECATALOG = {
  1: 'Cuenta corriente',
  2: 'Cuenta no corriente',
  3: 'Ambas'
}

export const LISTSELECTIONCATALOG = {
  1: 'Si',
  2: 'No'
}

export const LISTAFFECTSRETENTIONCATALOG = {
  1: 'No afecta',
  2: 'Rete Fuente',
  3: 'Rete IVA',
  4: 'Rete ICA'
}
