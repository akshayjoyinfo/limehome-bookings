export interface HotelHereItemModel {
  title: string;
  id: string;
  language: string;
  ontologyId: string;
  resultType: string;
  address: Address;
  position: Position;
  access: Position[];
  distance: number;
  categories: Category[];
  references: Reference[];
  foodTypes: Category[];
  contacts: Contact[];
  payment: Payment;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  county: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
  houseNumber: string;
}

export interface Category {
  id: string;
  name: string;
  primary?: boolean;
}

export interface Contact {
  phone: Phone[];
  www: Phone[];
}

export interface Phone {
  value: string;
  categories?: Supplier[];
}

export interface Supplier {
  id: string;
}

export interface Payment {
  methods: Method[];
}

export interface Method {
  id: string;
  accepted: boolean;
}

export interface Reference {
  supplier: Supplier;
  id: string;
}
