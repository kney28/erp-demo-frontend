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
