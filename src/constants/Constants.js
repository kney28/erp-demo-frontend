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

export const OPTIONSINTERFACECXC = [
  { id: 1, description: 'Ninguno' },
  { id: 2, description: 'CXC' },
  { id: 3, description: 'Anticipos' }
]

export const OPTIONNATURE = [
  { id: 1, description: 'Ninguno' },
  { id: 2, description: 'Debito' },
  { id: 3, description: 'Credito' }
]

export const OPTIONSINTERFACECXP = [
  { id: 1, description: 'Ninguno' },
  { id: 2, description: 'CXP' },
  { id: 3, description: 'Anticipos' }
]
export const TYPESEX = [
  { id: 1, description: 'FEMENINO', word: 'M' },
  { id: 2, description: 'MASCULINO', word: 'H' },
  { id: 3, description: 'AMBOS', word: 'A' }
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

export const TYPEGOODS = [
  { id: 1, description: 'MUEBLE' },
  { id: 2, description: 'INMUEBLE' }
]

export const RESIDUALVALUETYPE = [
  { id: 1, description: 'VALOR' },
  { id: 2, description: 'PORCENTAJE' }
]

export const GENDEP = [
  { id: 1, description: 'SI' },
  { id: 2, description: 'NO' }
]

export const TYPEUSEFULLIFE = [
  { id: 1, description: 'AÑOS' },
  { id: 2, description: 'MESES' }
]

export const NATURE = [
  { id: 1, description: 'DÉBITO' },
  { id: 2, description: 'CRÉDITO' }
]

export const STATEDOCUMENT = [
  { id: 1, description: 'SIN APROBAR' },
  { id: 2, description: 'APROBADO' },
  { id: 3, description: 'DEROGADO' }
]

export const TYPEGLOSS = [
  { id: 1, description: 'NINGUNO' },
  { id: 2, description: 'FACTURACIÓN' },
  { id: 3, description: 'TARIFAS' },
  { id: 4, description: 'AUTORIZACIÓN' },
  { id: 5, description: 'COBERTURA' },
  { id: 6, description: 'PERTINENCIA' },
  { id: 7, description: 'DEVOLUCIÓN' },
  { id: 8, description: 'RESPUESTA' }
]

export const COCEPTTYPE = [
  { id: 1, description: 'NINGUNO' },
  { id: 2, description: 'CUENTAS POR COBRAR' },
  { id: 3, description: 'NOTAS' }
]

export const CONCEPTTYPEPAY = [
  { id: 1, description: 'NINGUNO' },
  { id: 2, description: 'CUENTAS POR PAGAR' },
  { id: 3, description: 'NOTAS' }
]

export const SELECTION = [
  { id: 1, description: 'SI' },
  { id: 2, description: 'NO' }
]

export const PROVIDERTYPE = [
  { id: 0, description: 'NINGUNO' },
  { id: 1, description: 'PRODUCTOS' },
  { id: 2, description: 'SERVICIOS' },
  { id: 3, description: 'AMBOS' }
]

export const EMEROFFICE = [
  { id: 1, description: 'SI' },
  { id: 2, description: 'NO' }
]

export const ROLTYPE = [
  { id: 1, description: 'FABRICANTE' },
  { id: 2, description: 'IMPORTADOR' }
]

export const NATURES = [
  { id: 1, description: 'DÉBITO' },
  { id: 2, description: 'CRÉDITO' }
]
export const MINORMAJOR = [
  { id: 1, description: 'Mayor' },
  { id: 2, description: 'Menor' }
]

export const TYPEANESTHESIA = [
  { id: 1, description: 'LOCAL' },
  { id: 2, description: 'REGIONAL - ANESTESIA EPIDURAL ANESTESIA ESPINAL' },
  { id: 3, description: 'REGIONAL - ANESTESIA MEDIANTE BLOQUEO NERVIOS PERIFÉRICOS' },
  { id: 4, description: 'GENERAL' }
]

export const TYPEALLERG = [
  { id: 1, description: 'RESPIRATORIA' },
  { id: 2, description: 'ALIMENTOS' },
  { id: 3, description: 'FÁRMACOS' },
  { id: 4, description: 'HIMENÓPTEROS' },
  { id: 5, description: 'MEDICAMENTOS' },
  { id: 6, description: 'AMBIENTAL' },
  { id: 7, description: 'ANIMALES' }
]

export const TYPE = [
  { id: 1, description: 'Cuota Moderadora' },
  { id: 2, description: 'Copago' },
  { id: 3, description: 'Régimen subsidiado' },
  { id: 4, description: 'Vinculados' }
]

export const TYPEADMIN = [
  { id: 0, description: 'EPS' },
  { id: 1, description: 'EAS' },
  { id: 2, description: 'ARS' },
  { id: 3, description: 'ARP' },
  { id: 4, description: 'MP' },
  { id: 5, description: 'ESE' },
  { id: 6, description: 'EEPS' },
  { id: 7, description: 'IPS' },
  { id: 8, description: 'EMP' },
  { id: 9, description: 'PPN' },
  { id: 10, description: 'PPJ' },
  { id: 11, description: 'OTRAS' },
  { id: 12, description: 'EPS_S' }
]

export const TYPEIDENT = [
  { id: 1, description: 'NIT' },
  { id: 2, description: 'Municipio' },
  { id: 3, description: 'Departamento' },
  { id: 4, description: 'Distrito' }
]

export const DOCUMENTTYPE2 = [
  { id: 1, abbrevation: 'CC', description: 'Cedula de ciudadanía' },
  { id: 2, abbrevation: 'CE', description: 'Cedula de extranjería' },
  { id: 3, abbrevation: 'CD', description: 'Carnet diplomático' },
  { id: 4, abbrevation: 'PA', description: 'Pasaporte' },
  { id: 5, abbrevation: 'SC', description: 'Salvoconducto' },
  { id: 6, abbrevation: 'PE', description: 'Permiso especial de permanencia' },
  { id: 7, abbrevation: 'RC', description: 'Registro civil de nacimiento' },
  { id: 8, abbrevation: 'TI', description: 'Tarjeta de identidad' },
  { id: 9, abbrevation: 'CN', description: 'Certificado de nacido vivo' },
  { id: 10, abbrevation: 'AS', description: 'Adulto sin identificar' },
  { id: 11, abbrevation: 'MS', description: 'Menor sin identificar' },
  { id: 12, abbrevation: 'DE', description: 'Documento extranjero' },
  { id: 13, abbrevation: 'SI', description: 'Sin Identificar' }
]

export const SEXTYPE = [
  { id: 1, description: 'Ninguno' },
  { id: 2, description: 'Femenino' },
  { id: 3, description: 'Masculino' }
]

export const MARITALSTATUS = [
  { id: 1, description: 'Soltero(a)' },
  { id: 2, description: 'Casado(a)' },
  { id: 3, description: 'Divorciado(a)' },
  { id: 4, description: 'Separado(a)' },
  { id: 5, description: 'Viudo(a)' },
  { id: 6, description: 'Unión Libre' }
]

export const REGIMENTYPE = [
  { id: 1, description: 'Contributivo' },
  { id: 2, description: 'Subsidiado' },
  { id: 3, description: 'Vinculado' },
  { id: 4, description: 'Particular' },
  { id: 5, description: 'Otro' }
]

export const CONTRIBUTORTYPE = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Cotizante' },
  { id: 2, description: 'Beneficiario' },
  { id: 3, description: 'Adicional' },
  { id: 4, description: 'Jubilado retirado' },
  { id: 5, description: 'Pensionado' }
]

export const KINDSHIP = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Hermano(a)' },
  { id: 2, description: 'Abuelo(a)' },
  { id: 3, description: 'Nieto(a)' },
  { id: 4, description: 'Biznieto(a)' },
  { id: 5, description: 'Sobrino(a)' },
  { id: 6, description: 'Tío(a)' },
  { id: 7, description: 'Bisabuelo(a)' },
  { id: 8, description: 'Primo(a) hermano(a)' },
  { id: 9, description: 'Yerno' },
  { id: 10, description: 'Nuera' },
  { id: 11, description: 'Suegro(a)' },
  { id: 12, description: 'Cuñado(a)' },
  { id: 13, description: 'Otro' }
]

export const GROUPQX = [
  { id: 1, description: 'GRUPO 02' },
  { id: 2, description: 'GRUPO 03' },
  { id: 3, description: 'GRUPO 04' },
  { id: 4, description: 'GRUPO 05' },
  { id: 5, description: 'GRUPO 06' },
  { id: 6, description: 'GRUPO 07' },
  { id: 7, description: 'GRUPO 08' },
  { id: 8, description: 'GRUPO 09' },
  { id: 9, description: 'GRUPO 10' },
  { id: 10, description: 'GRUPO 11' },
  { id: 11, description: 'GRUPO 12' },
  { id: 12, description: 'GRUPO 13' },
  { id: 13, description: 'GRUPO ESPECIAL 20' },
  { id: 14, description: 'GRUPO ESPECIAL 21' },
  { id: 15, description: 'GRUPO ESPECIAL 22' },
  { id: 16, description: 'GRUPO ESPECIAL 23' }
]

export const PERCENTAGETYPE = [
  { id: 1, description: 'Ninguno' },
  { id: 2, description: 'Cirujano o Ginecobstetra' },
  { id: 3, description: 'Anestesiólogo' },
  { id: 4, description: 'Ayudantía quirúrgica' },
  { id: 5, description: 'Derechos de sala' },
  { id: 6, description: 'Materiales' }
]

export const LISTYESNOT = [
  { id: 1, description: 'Si' },
  { id: 2, description: 'No' }
]

export const LISTSERVICETYPE = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'No quirúrgico' },
  { id: 2, description: 'Quirúrgico' },
  { id: 3, description: 'Paquete' }
]

export const LISTNQXSERVICE = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Cirujano o Ginecoobstetra' },
  { id: 2, description: 'Anestesiólogo' },
  { id: 3, description: 'Ayudantía quirúrgica' },
  { id: 4, description: 'Derechos de sala' },
  { id: 5, description: 'Material de sutura' },
  { id: 6, description: 'Instrumentación Quirúrgica' }
]

export const LISTPROPOSEPROCEDURE = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Diagnóstico' },
  { id: 2, description: 'Terapéutico' },
  { id: 3, description: 'Protección específica' },
  { id: 4, description: 'Detección temprana de enfermedad general' },
  { id: 5, description: 'Detección temprana de enfermedad laboral' }
]

export const LISTCONCEPHEALTH = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Estancia Individual' },
  { id: 2, description: 'Habitación Compartida' },
  { id: 3, description: 'UCI de adultos' },
  { id: 4, description: 'UCI neonatal' },
  { id: 5, description: 'CI de cuidados medianos' },
  { id: 6, description: 'Incubadora' },
  { id: 7, description: 'Consulta médica general' },
  { id: 8, description: 'Consulta especialista' },
  { id: 9, description: 'Interconsulta' },
  { id: 10, description: 'Visitas hospitalarias' },
  { id: 11, description: 'Honorarios de cirujanos' },
  { id: 12, description: 'Honorarios de Anestesia' },
  { id: 13, description: 'Honorarios de ayudantía' },
  { id: 14, description: 'Honorarios de Instrumentación' },
  { id: 15, description: 'Derechos de salas' },
  { id: 16, description: 'Derechos de Anestesia' },
  { id: 17, description: 'Derechos de equipos' },
  { id: 18, description: 'Insumos Hospitalarios' },
  { id: 19, description: 'Material Quirúrgico' },
  { id: 20, description: 'Medicamentos' },
  { id: 21, description: 'Oxigeno' },
  { id: 22, description: 'Laboratorio' },
  { id: 23, description: 'Radiología' },
  { id: 24, description: 'Tomografías' },
  { id: 25, description: 'Medicina nuclear' },
  { id: 26, description: 'Resonancia magnética' },
  { id: 27, description: 'Exámenes Complementarios' },
  { id: 28, description: 'Exámenes vasculares' },
  { id: 29, description: 'Hemodinamia' },
  { id: 30, description: 'Banco de sangre' },
  { id: 31, description: 'Terapias' },
  { id: 32, description: 'Ambulancia' },
  { id: 33, description: 'Facturación integral' }
]

export const LISTCOMPLEXITYLEVEL2 = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Nivel 1' },
  { id: 2, description: 'Nivel 2' },
  { id: 3, description: 'Nivel 3' },
  { id: 4, description: 'Nivel 4' },
  { id: 5, description: 'Nivel 5' }
]

export const LISTCONCEPRIPS = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Consultas' },
  { id: 2, description: 'Procedimientos Diagnostico' },
  { id: 3, description: 'Procedimientos Terapéuticos No Quirúrgicos' },
  { id: 4, description: 'Procedimientos Terapéuticos Quirúrgicos' },
  { id: 5, description: 'Procedimientos Promoción y Prevención' },
  { id: 6, description: 'Estancias' },
  { id: 7, description: 'Honorarios' },
  { id: 8, description: 'Derechos Sala' },
  { id: 9, description: 'Materiales Insumos' },
  { id: 10, description: 'Banco Sangre' },
  { id: 11, description: 'Prótesis Ortesis' },
  { id: 12, description: 'Medicamentos POS' },
  { id: 13, description: 'Medicamentos No POS' },
  { id: 14, description: 'Traslado Pacientes' },
  { id: 15, description: 'Otros Servicios' }
]

export const SEX = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Femenino' },
  { id: 2, description: 'Masculino' },
  { id: 3, description: 'Ambos' }
]

export const DOCUMENTTYPE2 = [
  { id: 1, abbrevation: 'CC', description: 'Cedula de ciudadanía' },
  { id: 2, abbrevation: 'CE', description: 'Cedula de extranjería' },
  { id: 3, abbrevation: 'CD', description: 'Carnet diplomático' },
  { id: 4, abbrevation: 'PA', description: 'Pasaporte' },
  { id: 5, abbrevation: 'SC', description: 'Salvoconducto' },
  { id: 6, abbrevation: 'PE', description: 'Permiso especial de permanencia' },
  { id: 7, abbrevation: 'RC', description: 'Registro civil de nacimiento' },
  { id: 8, abbrevation: 'TI', description: 'Tarjeta de identidad' },
  { id: 9, abbrevation: 'CN', description: 'Certificado de nacido vivo' },
  { id: 10, abbrevation: 'AS', description: 'Adulto sin identificar' },
  { id: 11, abbrevation: 'MS', description: 'Menor sin identificar' },
  { id: 12, abbrevation: 'DE', description: 'Documento extranjero' },
  { id: 13, abbrevation: 'SI', description: 'Sin Identificar' }
]

export const SEXTYPE = [
  { id: 1, description: 'Ninguno' },
  { id: 2, description: 'Femenino' },
  { id: 3, description: 'Masculino' }
]

export const MARITALSTATUS = [
  { id: 1, description: 'Soltero(a)' },
  { id: 2, description: 'Casado(a)' },
  { id: 3, description: 'Divorciado(a)' },
  { id: 4, description: 'Separado(a)' },
  { id: 5, description: 'Viudo(a)' },
  { id: 6, description: 'Unión Libre' }
]

export const REGIMENTYPE = [
  { id: 1, description: 'Contributivo' },
  { id: 2, description: 'Subsidiado' },
  { id: 3, description: 'Vinculado' },
  { id: 4, description: 'Particular' },
  { id: 5, description: 'Otro' }
]

export const CONTRIBUTORTYPE = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Cotizante' },
  { id: 2, description: 'Beneficiario' },
  { id: 3, description: 'Adicional' },
  { id: 4, description: 'Jubilado retirado' },
  { id: 5, description: 'Pensionado' }
]

export const KINDSHIP = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Hermano(a)' },
  { id: 2, description: 'Abuelo(a)' },
  { id: 3, description: 'Nieto(a)' },
  { id: 4, description: 'Biznieto(a)' },
  { id: 5, description: 'Sobrino(a)' },
  { id: 6, description: 'Tío(a)' },
  { id: 7, description: 'Bisabuelo(a)' },
  { id: 8, description: 'Primo(a) hermano(a)' },
  { id: 9, description: 'Yerno' },
  { id: 10, description: 'Nuera' },
  { id: 11, description: 'Suegro(a)' },
  { id: 12, description: 'Cuñado(a)' },
  { id: 13, description: 'Otro' }
]

export const GROUPQX = [
  { id: 1, description: 'GRUPO 02' },
  { id: 2, description: 'GRUPO 03' },
  { id: 3, description: 'GRUPO 04' },
  { id: 4, description: 'GRUPO 05' },
  { id: 5, description: 'GRUPO 06' },
  { id: 6, description: 'GRUPO 07' },
  { id: 7, description: 'GRUPO 08' },
  { id: 8, description: 'GRUPO 09' },
  { id: 9, description: 'GRUPO 10' },
  { id: 10, description: 'GRUPO 11' },
  { id: 11, description: 'GRUPO 12' },
  { id: 12, description: 'GRUPO 13' },
  { id: 13, description: 'GRUPO ESPECIAL 20' },
  { id: 14, description: 'GRUPO ESPECIAL 21' },
  { id: 15, description: 'GRUPO ESPECIAL 22' },
  { id: 16, description: 'GRUPO ESPECIAL 23' }
]

export const PERCENTAGETYPE = [
  { id: 1, description: 'Ninguno' },
  { id: 2, description: 'Cirujano o Ginecobstetra' },
  { id: 3, description: 'Anestesiólogo' },
  { id: 4, description: 'Ayudantía quirúrgica' },
  { id: 5, description: 'Derechos de sala' },
  { id: 6, description: 'Materiales' }
]

export const LISTYESNOT = [
  { id: 1, description: 'Si' },
  { id: 2, description: 'No' }
]

export const LISTSERVICETYPE = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'No quirúrgico' },
  { id: 2, description: 'Quirúrgico' },
  { id: 3, description: 'Paquete' }
]

export const LISTNQXSERVICE = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Cirujano o Ginecoobstetra' },
  { id: 2, description: 'Anestesiólogo' },
  { id: 3, description: 'Ayudantía quirúrgica' },
  { id: 4, description: 'Derechos de sala' },
  { id: 5, description: 'Material de sutura' },
  { id: 6, description: 'Instrumentación Quirúrgica' }
]

export const LISTPROPOSEPROCEDURE = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Diagnóstico' },
  { id: 2, description: 'Terapéutico' },
  { id: 3, description: 'Protección específica' },
  { id: 4, description: 'Detección temprana de enfermedad general' },
  { id: 5, description: 'Detección temprana de enfermedad laboral' }
]

export const LISTCONCEPHEALTH = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Estancia Individual' },
  { id: 2, description: 'Habitación Compartida' },
  { id: 3, description: 'UCI de adultos' },
  { id: 4, description: 'UCI neonatal' },
  { id: 5, description: 'CI de cuidados medianos' },
  { id: 6, description: 'Incubadora' },
  { id: 7, description: 'Consulta médica general' },
  { id: 8, description: 'Consulta especialista' },
  { id: 9, description: 'Interconsulta' },
  { id: 10, description: 'Visitas hospitalarias' },
  { id: 11, description: 'Honorarios de cirujanos' },
  { id: 12, description: 'Honorarios de Anestesia' },
  { id: 13, description: 'Honorarios de ayudantía' },
  { id: 14, description: 'Honorarios de Instrumentación' },
  { id: 15, description: 'Derechos de salas' },
  { id: 16, description: 'Derechos de Anestesia' },
  { id: 17, description: 'Derechos de equipos' },
  { id: 18, description: 'Insumos Hospitalarios' },
  { id: 19, description: 'Material Quirúrgico' },
  { id: 20, description: 'Medicamentos' },
  { id: 21, description: 'Oxigeno' },
  { id: 22, description: 'Laboratorio' },
  { id: 23, description: 'Radiología' },
  { id: 24, description: 'Tomografías' },
  { id: 25, description: 'Medicina nuclear' },
  { id: 26, description: 'Resonancia magnética' },
  { id: 27, description: 'Exámenes Complementarios' },
  { id: 28, description: 'Exámenes vasculares' },
  { id: 29, description: 'Hemodinamia' },
  { id: 30, description: 'Banco de sangre' },
  { id: 31, description: 'Terapias' },
  { id: 32, description: 'Ambulancia' },
  { id: 33, description: 'Facturación integral' }
]

export const LISTCOMPLEXITYLEVEL2 = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Nivel 1' },
  { id: 2, description: 'Nivel 2' },
  { id: 3, description: 'Nivel 3' },
  { id: 4, description: 'Nivel 4' },
  { id: 5, description: 'Nivel 5' }
]

export const LISTCONCEPRIPS = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Consultas' },
  { id: 2, description: 'Procedimientos Diagnostico' },
  { id: 3, description: 'Procedimientos Terapéuticos No Quirúrgicos' },
  { id: 4, description: 'Procedimientos Terapéuticos Quirúrgicos' },
  { id: 5, description: 'Procedimientos Promoción y Prevención' },
  { id: 6, description: 'Estancias' },
  { id: 7, description: 'Honorarios' },
  { id: 8, description: 'Derechos Sala' },
  { id: 9, description: 'Materiales Insumos' },
  { id: 10, description: 'Banco Sangre' },
  { id: 11, description: 'Prótesis Ortesis' },
  { id: 12, description: 'Medicamentos POS' },
  { id: 13, description: 'Medicamentos No POS' },
  { id: 14, description: 'Traslado Pacientes' },
  { id: 15, description: 'Otros Servicios' }
]

export const SEX = [
  { id: 0, description: 'Ninguno' },
  { id: 1, description: 'Femenino' },
  { id: 2, description: 'Masculino' },
  { id: 3, description: 'Ambos' }
]

export const TYPECAU = [
  { id: 1, description: 'NINGUNO' },
  { id: 2, description: 'ADMINISTRATIVA' },
  { id: 3, description: 'MEDICA' }
]

export const STATUSVALIDITY = [
  { id: 1, description: 'ABIERTO' },
  { id: 2, description: 'ACTIVO' },
  { id: 3, description: 'EN CIERRE' },
  { id: 4, description: 'CERRADO' }
]

export const STATEDOCUMENTVIGENCIA = [
  { id: 1, description: 'SIN APROBAR' },
  { id: 2, description: 'APROBADO' },
  { id: 3, description: 'ANULADO' }
]
export const findBy = function (arrayName, column) {
  /*
    permite crear solo un array de objetos tanto para mostrar
    en los porp.row y para ser utilizado en los select
    y asi evitar crear dos objetos diferentes
    ej:
     DOCUMENTTYPE
     LISTDOCUMENTTYPE
     solo crear (LISTDOCUMENTTYPE[{}])
    * Devolverá un array que coincida con el valor de la llave id
    * argumentos de la función.
    @param arrayName recibe un array en el cual buscar por id
    @param column recibe el id en cuestion
    Ej:
    findById(LISTDOCUMENTTYPE, props.row.documenttype)[0].description
  */
  const results = arrayName.filter(function (arrayNom) { return arrayNom.id === column })
  return results
}
