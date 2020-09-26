import axios, { AxiosResponse } from "axios";
export async function getApartments(zips: number[]): Promise<Property[]> {
  const PAGE_SIZE = 60;
  var allProperties = new Array<Property>();
  var remaining: number | undefined = undefined;
  var pageId = 1;

  do {
    const results = await fetchPaged(zips, pageId, PAGE_SIZE);
    const total = results.totalCount;
    if (remaining === undefined) {
      remaining = total;
    }

    allProperties = allProperties.concat(results.properties);
    remaining -= PAGE_SIZE;
    pageId++;
  } while (remaining > 0);

  return allProperties;
}

async function fetchPaged(zips: number[], pageIdx: number, pageSize: number) {
  const API_URL = "https://www.boligsiden.dk/propertyresult/updatesearch";

  const zipObj = zips.map((zip) => {
    return {
      number: zip.toString(),
    };
  });

  const response = await axios.post<
    string,
    AxiosResponse<UpdateSearchResponse>
  >(API_URL, {
    searchId: "57c834a444fd41efb2ff9f7fa286ec7e",
    displayState: "PAAAAAEAAAAADAAAAA==",
    name: "setSituationClickableMap",
    arguments: `{"countries":[],"municipalities":[],"postals":${JSON.stringify(
      zipObj
    )}}`,
    pageNumber: pageIdx,
    itemsPerPage: pageSize,
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
  const properties = response.data.result.properties.map(
    (property) =>
      new Property(
        property.address,
        parseFloat(property.areaPaymentCash),
        parseInt(property.areaResidential),
        property.city,
        (() => {
          const d = new Date();
          d.setTime(Date.parse(property.dateAnnounced));
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
        property.redirectLink,
        property.openHouseRedirectLink
      )
  );

  return { properties, totalCount: response.data.result.totalCount };
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
  readonly openHouseRedirectLink: string;

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
    public redirectLink: string,
    public openHouseRedirectLink: string
  ) {}
}
interface UpdateSearchResponse {
  result: {
    totalCount: number;
    properties: PropertyUnnormalized[];
  };
}
