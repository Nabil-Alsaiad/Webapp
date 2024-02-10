export declare type Email = `${string}@${string}.${string}`;

export declare type Phone = `${number}` | `+${number}`;

// export declare type ID = `${string}-${string}-${string}-${string}-${string}`
export declare type ID = number;

export declare type AccountTypes = "visitor" | "delivery" | "develoepr" | "admin" | "tenant" | "security" | "contractor";

export declare type FullAccount = Account & AccountExtra;

export declare type Announcement = {
  id: ID;
  title: string;
  description: string;
  created_at?: Date;
};

export declare type Account = {
  id: ID;
  accType: AccountTypes;
  email: Email;
  password: string;
  name?: string;
  phone?: Phone;
  register_date?: Date;
};

export declare type AccountExtra = {
  license_id?: number;
  vehicle_plate?: string;
  company_name?: string;
};
