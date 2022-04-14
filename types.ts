export interface ICity {
  Id: number;
  Name: string;
  Country: string;
}

export interface IStoppage {
  Id: number;
  Name: string;
  CityId: number;
  RouteIndex: number;
  FareFromRoot: number;
  City: ICity;
}

export interface ITransport {
  Id: number;
  Name: string;
  MaximumSeat: number;
  CreatedBy: number;
}

export interface IFlight {
  Id: number;
  TransportId: number;
  FromStoppageId: number;
  ToStoppageId: number;
  Day: string;
  Time: number;
  Date: string;
  Transport: ITransport;
  FromStoppage: IStoppage;
  ToStoppage: IStoppage;
}

export interface ICity {
  Id: number;
  Name: string;
  Country: string;
}
