export const ACTIVE = 1
export const INACTIVE = 2
export const NIT = 'NIT'

export const DOCUMENTTYPE = [
  { id: 1, description: 'Cédula de ciudadanía' },
  { id: 2, description: 'Tarjeta de identidad' },
  { id: 3, description: 'Tarjeta de extranjería' },
  { id: 4, description: 'Cédula de extranjería' },
  { id: 5, description: 'NIT' },
  { id: 6, description: 'Pasaporte' }
]
export const NATURAL = [
  { id: 1, description: 'Natural' },
  { id: 2, description: 'Legal' }
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

export const TAXPAYERTYPECATALOG = [
  { id: 1, description: 'Régimen Simplificado' },
  { id: 2, description: 'Régimen Común' },
  { id: 3, description: 'Gran Contribuyente' },
  { id: 4, description: 'Compañía del Estado' }
]

export const WITHHOLDINGTYPECATALOG = [
  { id: 1, description: 'Aplicar Retención' },
  { id: 2, description: 'Auto Retención' },
  { id: 3, description: 'Exento' }
]

export const ACCOUNTINGVALIDITYSTATUS = [
  { id: 1, description: 'Abierta' },
  { id: 2, description: 'Activa' },
  { id: 3, description: 'En cierre' },
  { id: 4, description: 'Cerrada' }
]

export const LISTDOCUMENTTYPE = {
  1: 'Cédula de ciudadanía',
  2: 'Tarjeta de identidad',
  3: 'Tarjeta de extranjería',
  4: 'Cédula de extranjería',
  5: 'NIT',
  6: 'Pasaporte'
}
export const LISTNATURAL = {
  1: 'Natural',
  2: 'Legal'
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

export const LISTTAXPAYERTYPECATALOG = {
  1: 'Régimen Simplificado',
  2: 'Régimen Común',
  3: 'Gran Contribuyente',
  4: 'Compañía del Estado'
}

export const LISTWITHHOLDINGTYPECATALOG = {
  1: 'Aplicar Retención',
  2: 'Auto Retención',
  3: 'Exento'
}

export const LISTACCOUNTINGVALIDITYSTATUS = {
  1: 'Abierta',
  2: 'Activa',
  3: 'En cierre',
  4: 'Cerrada'
}
/*
export const TYPESERVICESTATUS = {
  0: 'Ninguna',
  1: 'Hospitalarios',
  2: 'Ambulatorios',
  3: 'Urgencias',
  4: 'Quirurgicos',
  5: 'Farmaceuticos',
  6: 'Sala de partos',
  7: 'UCI Adultos',
  8: 'UCI Neonatal',
  9: 'Intramurales',
  10: 'Promoción y prevención',
  11: 'Administrativos'
}
*/
export const TYPESERVICESTATUS = [
  { id: 0, description: 'Ninguna' },
  { id: 1, description: 'Hospitalarios' },
  { id: 2, description: 'Ambulatorios' },
  { id: 3, description: 'Urgencias' },
  { id: 4, description: 'Quirurgicos' },
  { id: 5, description: 'Farmaceuticos' },
  { id: 6, description: 'Sala de partos' },
  { id: 7, description: 'UCI Adultos' },
  { id: 8, description: 'UCI Neonatal' },
  { id: 9, description: 'Intramurales' },
  { id: 10, description: 'Promoción y prevención' },
  { id: 11, description: 'Administrativos' }
]

export const BEDSTATUS = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Desocupada' },
  { id: 2, description: 'Ocupada' },
  { id: 3, description: 'Bloqueada' },
  { id: 4, description: 'Mantenimiento' },
  { id: 5, description: 'Inactiva' }
]

export const TYPEBED = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Unipersonal' },
  { id: 2, description: 'Bipersonal' },
  { id: 3, description: 'Tres camas' },
  { id: 4, description: 'Cuatro camas' }
]
