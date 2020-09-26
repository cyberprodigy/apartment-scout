
const values = [
  { startZip: 1000, endZip: 1499, name: "Copenhagen K", increase: 13922.75 },
  { startZip: 1500, endZip: 1799, name: "Copenhagen V", increase: 12839.25 },
  { startZip: 1800, endZip: 1999, name: "Frederiksberg C", increase: 12934.5 },
  { startZip: 2000, endZip: 2000, name: "Frederiksberg", increase: 11622.75 },
  { startZip: 2100, endZip: 2100, name: "Copenhagen Ø", increase: 12995.25 },
  { startZip: 2150, endZip: 2150, name: "Nordhavn", increase: 12000.0 },
  { startZip: 2200, endZip: 2200, name: "Copenhagen N", increase: 14332.25 },
  { startZip: 2300, endZip: 2300, name: "Copenhagen S", increase: 12286.25 },
  { startZip: 2400, endZip: 2400, name: "Copenhagen NV", increase: 12676.5 },
  { startZip: 2412, endZip: 2412, name: "Greenland", increase: 7000.0 },
  { startZip: 2450, endZip: 2450, name: "Copenhagen SV", increase: 11946.5 },
  { startZip: 2500, endZip: 2500, name: "Valby", increase: 10740.75 },
  { startZip: 2600, endZip: 2600, name: "Glostrup", increase: 9231.5 },
  { startZip: 2605, endZip: 2605, name: "Brøndby", increase: 12000.0 },
  { startZip: 2610, endZip: 2610, name: "Rødovre", increase: 11322.0 },
  { startZip: 2620, endZip: 2620, name: "Albertslund", increase: 9381.5 },
  { startZip: 2625, endZip: 2625, name: "Vallensbæk", increase: 5000.0 },
  { startZip: 2630, endZip: 2630, name: "Taastrup", increase: 9116.75 },
  { startZip: 2635, endZip: 2635, name: "Ishøj", increase: 8549.25 },
  { startZip: 2640, endZip: 2640, name: "Hedehusene", increase: 7660.25 },
  { startZip: 2650, endZip: 2650, name: "Hvidovre", increase: 9673.0 },
  { startZip: 2660, endZip: 2660, name: "Brøndby Strand", increase: 5000.0 },
  { startZip: 2665, endZip: 2665, name: "Vallensbæk Strand", increase: 9491.0 },
  { startZip: 2670, endZip: 2670, name: "Greve", increase: 8213.5 },
  { startZip: 2680, endZip: 2680, name: "Solrød Strand", increase: 8848.25 },
  { startZip: 2690, endZip: 2690, name: "Karlslunde", increase: 5000.0 },
  { startZip: 2700, endZip: 2700, name: "Brønshøj", increase: 11659.0 },
  { startZip: 2720, endZip: 2720, name: "Vanløse", increase: 12460.5 },
  { startZip: 2730, endZip: 2730, name: "Herlev", increase: 11345.25 },
  { startZip: 2740, endZip: 2740, name: "Skovlunde", increase: 5000.0 },
  { startZip: 2750, endZip: 2750, name: "Ballerup", increase: 9593.75 },
  { startZip: 2760, endZip: 2760, name: "Måløv", increase: 7935.25 },
  { startZip: 2765, endZip: 2765, name: "Smørum", increase: 8988.333333 },
  { startZip: 2770, endZip: 2770, name: "Kastrup", increase: 11199.5 },
  { startZip: 2791, endZip: 2791, name: "Dragør", increase: 11000.0 },
  { startZip: 2800, endZip: 2800, name: "Kongens Lyngby", increase: 7385.0 },
  { startZip: 2820, endZip: 2820, name: "Gentofte", increase: 9554.5 },
  { startZip: 2830, endZip: 2830, name: "Virum", increase: 9770.5 },
  { startZip: 2840, endZip: 2840, name: "Holte", increase: 7106.25 },
  { startZip: 2850, endZip: 2850, name: "Nærum", increase: 8716.25 },
  { startZip: 2860, endZip: 2860, name: "Søborg", increase: 11329 },
  { startZip: 2870, endZip: 2870, name: "Dyssegård", increase: 12242.25 },
  { startZip: 2880, endZip: 2880, name: "Bagsværd", increase: 8324.75 },
  { startZip: 2900, endZip: 2900, name: "Hellerup", increase: 11801.5 },
  { startZip: 2920, endZip: 2920, name: "Charlottenlund", increase: 11633.75 },
  { startZip: 2930, endZip: 2930, name: "Klampenborg", increase: 13000.0 },
  { startZip: 2942, endZip: 2942, name: "Skodsborg", increase: 10000.0 },
  { startZip: 2950, endZip: 2950, name: "Vedbæk", increase: 10000.0 },
  { startZip: 2960, endZip: 2960, name: "Rungsted Kyst", increase: 10000.0 },
  { startZip: 2970, endZip: 2970, name: "Hørsholm", increase: 7848.5 },
  { startZip: 2980, endZip: 2980, name: "Kokkedal", increase: 4963.75 },
  { startZip: 2990, endZip: 2990, name: "Nivå", increase: 5000.0 },
];

export function getApprectionationForNext5YearsInAreaPer1Sqm(zip: number) {
  return (
    values.find((value) => zip >= value.startZip && zip <= value.endZip)!
      .increase * 0.8
  ); // 0.6 a pestimistic forecast
}
