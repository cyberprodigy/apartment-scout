/* eslint-disable */
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import LaunchIcon from "@material-ui/icons/Launch";
import React from "react";
import { Property } from "../BoligSidenService";
import { EstimatedProperty } from "../PropertyEstimator";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: "inline-block",
  },
  media: {
    width: 315,
    height: 40,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ApartmentBlock(props: ApartmentBlockProps) {
  const classes = useStyles();

  const { property } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton onClick={() => window.open(property.redirectLink)}>
            <LaunchIcon />
          </IconButton>
        }
        title={property.address}
        subheader={property.city + " " + property.postal}
      />
      <CardMedia className={classes.media} image={property.imageLink300X200} />
      <CardContent>
        <Typography>
          Price: {formatMoney(property.paymentCash, 0)} dkk
        </Typography>
        <Typography>
          Area: {formatMoney(property.areaResidential)} m<sup>2</sup>
        </Typography>
        <Typography>
          Price per sqm: {formatMoney(property.areaPaymentCash, 2)}
        </Typography>
        <Typography>
          Monthly expenses: {formatMoney(property.paymentExpenses)}
        </Typography>
        <Typography>
          Time online: {formatDate(property.dateAnnounced)}
        </Typography>

        <Typography>RIO: {formatMoney(property.roi)} dkk</Typography>
        <Typography>
          Could sell for: {formatMoney(property.couldSellFor)} dkk
        </Typography>
      </CardContent>
    </Card>
  );
}

interface ApartmentBlockProps {
  property: EstimatedProperty;
}

function formatMoney(
  amount: any,
  decimalCount = 0,
  decimal = ".",
  thousands = " "
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

function formatDate(date: Date) {
  try {
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
    ] = dateTimeFormat.formatToParts(date);
    return `${day}-${month}-${year}`;
  } catch (e) {
    return "unknown";
  }
}
