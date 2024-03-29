export declare type Email = `${string}@${string}.${string}`;

export declare type Phone = `${number}` | `+${number}`;

// export declare type ID = `${string}-${string}-${string}-${string}-${string}`
export declare type ID = number;

export declare type AccountTypes = "visitor" | "delivery" | "develoepr" | "admin" | "tenant" | "security" | "contractor";

export declare type FullAccount = Account & AccountExtra;

export declare type SQLCommand = SQLSelect | SQLInsert | SQLUpdate | SQLDelete;
export declare type SQLSelect = `SELECT ${string} FROM ${string}`;
export declare type SQLInsert = `INSERT INTO ${string} (${string}) VALUES (${string})`;
export declare type SQLUpdate = `UPDATE ${string} SET ${string} WHERE ${string}`;
export declare type SQLDelete = `DELETE FROM ${string} WHERE ${string}`;

export declare type Report = {
  type: MaintenanceTypes | "other";
  title: string;
  description: string;
};

export declare type Announcement = {
  id: ID;
  title: string;
  description: string;
  created_at?: string | Date;
};

export declare type Maintenance = {
  id: ID;
  title: string;
  type: MaintenanceTypes;
  assigned_to?: ID | Email;
  maintenance_datetime: string | Date;
};

export declare type MaintenanceReport = {
  id: ID;
  maintenance_id: ID;
  title?: string;
  description: string;
  resolved: boolean | 1 | 0;
  approved: boolean | 1 | 0;
  submitted_by?: ID | Email;
  submission_date: string | Date;
};

export declare type MaintenanceTypes = "facility" | "webapp";

export declare type Account = {
  id: ID;
  type_id?: ID;
  accType?: AccountTypes;
  email: Email;
  password?: string;
  name?: string;
  phone?: Phone;
  register_date?: string | Date;
};

export declare type AccountExtra = {
  acc_id?: ID;
  license_id?: number;
  vehicle_plate?: string;
  company_name?: string;
};
