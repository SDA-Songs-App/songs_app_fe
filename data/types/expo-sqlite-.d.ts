// declare module "expo-sqlite" {
//   export type SQLTransactionCallback = (tx: SQLTransaction) => void;
//   export type SQLResultSetCallback = (tx: SQLTransaction, resultSet: SQLResultSet) => void;
//   export type SQLResultSetErrorCallback = (tx: SQLTransaction, error: Error) => boolean;

//   export interface SQLResultSet {
//     rows: { _array: any[]; length: number };
//     insertId: number;
//     rowsAffected: number;
//   }

//   export interface SQLTransaction {
//     executeSql(
//       sqlStatement: string,
//       args?: any[],
//       success?: SQLResultSetCallback,
//       error?: SQLResultSetErrorCallback
//     ): void;
//   }

//   export interface Database {
//     transaction(fn: (tx: SQLTransaction) => void): void;
//     readTransaction(fn: (tx: SQLTransaction) => void): void;
//   }
//   // Add openDatabase explicitly so TS recognizes it
//   export function openDatabase(name: string, version?: string, description?: string, size?: number): Database;
//   export function openDatabaseSync(name: string, version?: string, description?: string, size?: number): Database;
// }
