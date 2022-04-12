export interface ICity {
  id: number;
  name: string;
  country: string;
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
