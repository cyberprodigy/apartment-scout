import axios, { AxiosResponse } from "axios";
export async function getApartments(zip: number): Promise<Property[]> {
  const API_URL = "https://www.boligsiden.dk/propertyresult/updatesearch";

  const response = await axios.post<
    string,
    AxiosResponse<UpdateSearchResponse>
  >(API_URL, {
    searchId: "9115dd506ae64b9abacdd1351938ea87",
    displayState: "PAAAAAEAAAAADAAAAA==",
    name: "setSituationQuickSearch",
    arguments: `{"query":"${zip}","itemTypes":"300","completionType":null}`,
    pageNumber: 1,
    itemsPerPage: 120,
    sortKey: 12,
    sortDescending: false,
    displayTab: 1,
    changeType: null,
    changeDate: null,
    itemType: null,
    foreclosureAuctionDays: null,
    monthlyRentMax: null,
    monthlyRentMin: null,
    depositMin: null,
    depositMax: null,
    rentalDaysLeftMin: null,
    rentalDaysLeftMax: null,
    petsAllowed: null,
    purchaseAllowed: null,
  });
  return response.data.result.properties.map(
    (property) =>
      new Property(
        property.address,
        parseFloat(property.areaPaymentCash),
        parseInt(property.areaResidential),
        property.city,
        (() => {
          const d = new Date();
          d.setTime(Date.parse(property.dateAnnounced));
          console.log(d);
          return d;
        })(),
        parseInt(property.downPayment.split(".").join("")),
        property.id,
        property.imageLink300X200,
        parseInt(property.numberOfRooms),
        parseInt(property.paymentCash.split(".").join("")),
        parseInt(property.paymentExpenses.split(".").join("")),
        parseInt(property.postal),
        parseInt(property.priceDevelopment.split("%").join("")),
        property.redirectLink
      )
  );
}

interface PropertyUnnormalized {
  readonly address: string;
  readonly areaPaymentCash: string;
  readonly areaResidential: string;
  readonly city: string;
  readonly dateAnnounced: string;
  readonly downPayment: string;
  readonly id: string;
  readonly imageLink300X200: string;
  readonly numberOfRooms: string;
  readonly paymentCash: string;
  readonly paymentExpenses: string;
  readonly postal: string;
  readonly priceDevelopment: string;
  readonly redirectLink: string;
}
export class Property {
  constructor(
    public address: string,
    public areaPaymentCash: number,
    public areaResidential: number,
    public city: string,
    public dateAnnounced: Date,
    public downPayment: number,
    public id: string,
    public imageLink300X200: string,
    public numberOfRooms: number,
    public paymentCash: number,
    public paymentExpenses: number,
    public postal: number,
    public priceDevelopment: number,
    public redirectLink: string
  ) {}
}
interface UpdateSearchResponse {
  result: {
    properties: PropertyUnnormalized[];
  };
}
