export interface ICity {
  id: number;
  name: string;
  country: string;
  stopages: IStoppage[];
}

export interface IStoppage {
  id: number;
  name: string;
  city_id: number;
  route_index: number;
  fare_from_root: number;
  city: ICity;
}

export interface ITransport {
  id: number;
  name: string;
  maximum_seat: number;
  created_by: number;
  tickets: ITicket[];
}

export interface IFlight {
  id: number;
  transport_id: number;
  from_stopage_id: number;
  to_stopage_id: number;
  day: string;
  time: number;
  date: string;
  transport: ITransport;
  fromstopage: IStoppage;
  tostopage: IStoppage;
}

export interface ICity {
  id: number;
  name: string;
  country: string;
}

export interface ITicket {
  id: number;
  start_time: string;
  seat_no: number;
  ticket_id: number;
  transport_id: number;
  age_class: string;
  seat_class: string;
  status: string;
}

export interface IUser {
  id: number;
  username: string;
  name: string;
  date_of_birth: string;
  family_id: number;
  address: string;
  city_id: number;
  email: string;
  verified: 0 | 1;
  phone: string;
  role: string;
  city: ICity;
}
