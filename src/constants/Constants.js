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

export const COMPLEXITYLEVEL = {
  1: 'Nivel I',
  2: 'Nivel II',
  3: 'Nivel III',
  4: 'Nivel IV'
}
export const LISTCOMPLEXITYLEVEL = [
  { id: 1, description: 'Nivel I' },
  { id: 2, description: 'Nivel II' },
  { id: 3, description: 'Nivel III' },
  { id: 4, description: 'Nivel IV' }
]
export const PROVIDERCLASS = {
  1: 'Ninguno',
  2: 'Ambulatoria',
  3: 'Hospitalaria',
  4: 'Mixta'
}

export const LISTPROVIDERCLASS = [
  { id: 1, description: 'Ninguno' },
  { id: 2, description: 'Ambulatoria' },
  { id: 3, description: 'Hospitalaria' },
  { id: 4, description: 'Mixta' }
]

export const SISBENLEVELTYPE = {
  0: 'Ninguno',
  1: 'Nivel 1',
  2: 'Nivel 2'
}

export const LISTSISBENLEVELTYPE = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Nivel 1' },
  { id: 2, description: 'Nivel 2' }
]

export const SISBENLEVELGROUP = {
  0: 'Ninguno',
  1: 'Grupo A',
  2: 'Grupo B',
  3: 'Grupo C',
  4: 'Grupo D'
}

export const LISTSISBENLEVELGROUP = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Grupo A' },
  { id: 2, description: 'Grupo B' },
  { id: 3, description: 'Grupo C' },
  { id: 4, description: 'Grupo D' }
]

export const SISBENLEVELSUBGROUP = {
  0: 'Ninguno',
  1: 'A1',
  2: 'A2',
  3: 'A3',
  4: 'A4',
  5: 'A5',
  6: 'B1',
  7: 'B2',
  8: 'B3',
  9: 'B4',
  10: 'B5',
  11: 'B6',
  12: 'B7',
  13: 'C1',
  14: 'C2',
  15: 'C3',
  16: 'C4',
  17: 'C5',
  18: 'C6',
  19: 'C7',
  20: 'C8',
  21: 'C9',
  22: 'C10',
  23: 'C11',
  24: 'C12',
  25: 'C13',
  26: 'C14',
  27: 'C15',
  28: 'C16',
  29: 'C17',
  30: 'C18',
  31: 'D1',
  32: 'D2',
  33: 'D3',
  34: 'D4',
  35: 'D5',
  36: 'D6',
  37: 'D7',
  38: 'D8',
  39: 'D9',
  40: 'D10',
  41: 'D11',
  42: 'D12',
  43: 'D13',
  44: 'D14',
  45: 'D15',
  46: 'D16',
  47: 'D17',
  48: 'D18',
  49: 'D19',
  50: 'D20',
  51: 'D21'
}

export const LISTSISBENLEVELSUBGROUP = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'A1' },
  { id: 2, description: 'A2' },
  { id: 3, description: 'A3' },
  { id: 4, description: 'A4' },
  { id: 5, description: 'A5' },
  { id: 6, description: 'B1' },
  { id: 7, description: 'B2' },
  { id: 8, description: 'B3' },
  { id: 9, description: 'B4' },
  { id: 10, description: 'B5' },
  { id: 11, description: 'B6' },
  { id: 12, description: 'B7' },
  { id: 13, description: 'C1' },
  { id: 14, description: 'C2' },
  { id: 15, description: 'C3' },
  { id: 16, description: 'C4' },
  { id: 17, description: 'C5' },
  { id: 18, description: 'C6' },
  { id: 19, description: 'C7' },
  { id: 20, description: 'C8' },
  { id: 21, description: 'C9' },
  { id: 22, description: 'C10' },
  { id: 23, description: 'C11' },
  { id: 24, description: 'C12' },
  { id: 25, description: 'C13' },
  { id: 26, description: 'C14' },
  { id: 27, description: 'C15' },
  { id: 28, description: 'C16' },
  { id: 29, description: 'C17' },
  { id: 30, description: 'C18' },
  { id: 31, description: 'D1' },
  { id: 32, description: 'D2' },
  { id: 33, description: 'D3' },
  { id: 34, description: 'D4' },
  { id: 35, description: 'D5' },
  { id: 36, description: 'D6' },
  { id: 37, description: 'D7' },
  { id: 38, description: 'D8' },
  { id: 39, description: 'D9' },
  { id: 40, description: 'D10' },
  { id: 41, description: 'D11' },
  { id: 42, description: 'D12' },
  { id: 43, description: 'D13' },
  { id: 44, description: 'D14' },
  { id: 45, description: 'D15' },
  { id: 46, description: 'D16' },
  { id: 47, description: 'D17' },
  { id: 48, description: 'D18' },
  { id: 49, description: 'D19' },
  { id: 50, description: 'D20' },
  { id: 51, description: 'D21' }
]

export const TIPOFACTURACION = [
  { id: 1, description: 'En computador' },
  { id: 2, description: 'Máquina registradora' },
  { id: 3, description: 'Electrónica' }
]

export const OPTIONPERMISSIONS = [
  { id: 1, description: 'Configuración - Maestros - Configuración General' },
  { id: 2, description: 'Configuración - Maestros - Perfiles' },
  { id: 3, description: 'Configuración - Maestros - Usuarios' },
  { id: 4, description: 'Configuración - Maestros - Paises' }
]

export const CONSECONTVALIPROCESS = [
  { id: 1, description: 'Gestión Presupuestal' },
  { id: 2, description: 'Gestión Contable' }
]

export const CONSECONTVALIOPTION = [
  { id: 1, description: 'Programación Presupuestal Ingresos' },
  { id: 2, description: 'Adiciones/Reducciones Presupuestales Ingresos' },
  { id: 3, description: 'Traslados Presupuestales Ingresos' },
  { id: 4, description: 'Recaudos' },
  { id: 5, description: 'Ajustes Recaudos' },
  { id: 6, description: 'Programación Presupuestal Gastos' },
  { id: 7, description: 'Adiciones/Reducciones Presupuestales Gastos' },
  { id: 8, description: 'Traslados Presupuestales Gastos' },
  { id: 9, description: 'Solicitudes Disponibilidades Presupuestales' },
  { id: 10, description: 'Disponibilidades Presupuestales' },
  { id: 11, description: 'Ajustes Disponibilidades Presupuestal' },
  { id: 12, description: 'Compromisos' },
  { id: 13, description: 'Ajustes Compromisos' },
  { id: 14, description: 'Reservas Presupuestales' },
  { id: 15, description: 'Ajustes Reservas Presupuestales' },
  { id: 16, description: 'Obligaciones' },
  { id: 17, description: 'Ajustes Obligaciones' },
  { id: 18, description: 'Cuentas por Pagar Presupuestales' },
  { id: 19, description: 'Ajustes Cuentas por Pagar Presupuestales' },
  { id: 20, description: 'Pagos' },
  { id: 21, description: 'Ajustes Pagos' },
  { id: 22, description: 'Asientos Contables' }
]

export const MES = [
  { id: 1, description: 'ENERO' },
  { id: 2, description: 'FEBRERO' },
  { id: 3, description: 'MARZO' },
  { id: 4, description: 'ABRIL' },
  { id: 5, description: 'MAYO' },
  { id: 6, description: 'JUNIO' },
  { id: 7, description: 'JULIO' },
  { id: 8, description: 'AGOSTO' },
  { id: 9, description: 'SEPTIEMBRE' },
  { id: 10, description: 'OCTUBRE' },
  { id: 11, description: 'NOVIEMBRE' },
  { id: 12, description: 'DICIEMBRE' }
]

export const LISTREDONDING = [
  { id: 1, description: 'SIN REDONDEO' },
  { id: 2, description: 'AL PESO' }
]

export const LISTSTATUSCOUNTING = [
  { id: 1, description: 'ACTIVO' },
  { id: 2, description: 'INACTIVO' }
]

export const LISINUSOCOUNTING = [
  { id: 1, description: 'SI' },
  { id: 2, description: 'NO' }
]

export const TYPESEX = [
  { id: 1, description: 'NINGUNA' },
  { id: 2, description: 'FEMENINO' },
  { id: 3, description: 'MASCULINO' },
  { id: 4, description: 'AMBOS' }
]

export const TYPEPROF = [
  { id: 1, description: 'MÉDICOGENERAL' },
  { id: 2, description: 'MÉDICO ESPECIALISTA' },
  { id: 3, description: 'ENFERMERA' },
  { id: 4, description: 'AUXILIAR DE ENFERMERÍA' },
  { id: 5, description: 'ODONTÓLOGO GENERAL' },
  { id: 6, description: 'ODONTÓLOGO ESPECIALISTA' },
  { id: 7, description: 'HIGIENISTA' },
  { id: 8, description: 'NUTRICIONISTA' },
  { id: 9, description: 'PSICOLOGÍA' },
  { id: 10, description: 'TRABAJADORA SOCIAL' },
  { id: 11, description: 'BACTERIÓLOGO' },
  { id: 12, description: 'TERAPISTA' },
  { id: 13, description: 'OPTÓMETRA' },
  { id: 13, description: 'QUÍMICO FARMACÉUTICO' }
]

export const TYPECONT = [
  { id: 1, description: 'VINCULACIÓN LEGAL Y REGLAMENTARIA' },
  { id: 2, description: 'CONTRATO DE PRESTACIÓN DE SERVICIOS' },
  { id: 3, description: 'TERCERIZACIÓN LABORAL ' },
  { id: 4, description: 'CONTRATO INDIVIDUAL DE TRABAJO' },
  { id: 5, description: 'CONTRATO COLECTIVO DE TRABAJO' }
]
