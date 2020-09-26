/* eslint-disable */
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import LaunchIcon from "@material-ui/icons/Launch";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import React, { useState } from "react";
import {
  addTag,
  deleteTag,
  EstimatedTaggedProperty,
  TagId,
} from "../TagProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: "inline-block",
    padding: "10px",
  },
  BAD: {
    backgroundColor: red[500],
    padding: "50px!important",
  },
  hidden: {},
  media: {
    width: 300,
    height: 200,
    cursor: "pointer",
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
  tooExpensive: {
    backgroundColor: red[500],
  },
  groupPaper: {
    margin: "5px 0",
    padding: "5px 0",
  },
}));

export default function ApartmentBlock(props: ApartmentBlockProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);

  const { property } = props;
  const [tags, setTags] = useState(property.tag);
  const toggleTag = (tag: TagId) => {
    const newTags = tags.filter((curTag) => curTag !== tag);
    if (newTags.length === tags.length) {
      newTags.push(tag);
      addTag(property.id, tag);
    } else {
      deleteTag(property.id, tag);
    }
    setTags(newTags);
  };

  return (
    <Card
      className={classes.root}
      style={{
        border: tags.includes(TagId.BAD) ? "1px solid #FF0000" : "inherit",
        backgroundColor: tags.includes(TagId.GOOD) ? "#99FF99" : "inherit",
        opacity: tags.includes(TagId.VISITED) ? 0.5 : "inherit",
      }}
      elevation={3}
    >
      <CardHeader
        avatar={
          property.tooExpensive ? (
            <Avatar aria-label="recipe" className={classes.tooExpensive}>
              <NotInterestedIcon />
            </Avatar>
          ) : null
        }
        action={
          <>
            <IconButton
              aria-label="settings"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => {toggleTag(TagId.GOOD); setAnchorEl(null)}}>Good</MenuItem>
              <MenuItem onClick={() => {toggleTag(TagId.BAD); setAnchorEl(null)}}>Bad</MenuItem>
              <MenuItem onClick={() => {toggleTag(TagId.VISITED); setAnchorEl(null)}}>
                Visited
              </MenuItem>
            </Menu>
          </>
        }
        title={property.address}
        subheader={property.city + " " + property.postal}
      />
      <CardMedia
        className={classes.media}
        image={property.imageLink300X200}
        onClick={() => window.open(property.redirectLink)}
      />
      <CardContent>
        <Paper className={classes.groupPaper}>
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
        </Paper>
        <Paper className={classes.groupPaper}>
          <Typography>RIO: {formatMoney(property.roi)} dkk</Typography>
          <Typography>
            Could sell for: {formatMoney(property.couldSellFor)} dkk
          </Typography>
        </Paper>
        <Paper className={classes.groupPaper}>
          <Typography>Loan: {formatMoney(property.loan.amount)} dkk</Typography>
          <Typography>
            <PeopleIcon /> Monthly payment :
            {formatMoney(property.loan.monthlyPayment)} dkk
          </Typography>
          <Typography>
            <PersonIcon /> Monthly payment :
            {formatMoney(property.loan.monthlyPayment / 2)} dkk
          </Typography>
          <Typography>
            <PersonIcon /> Remainig loan :
            {formatMoney(property.loan.remainingLoan)} dkk
          </Typography>

          <Typography>
            Monthly afdrag loan :{formatMoney(property.loan.monthlyAfdrag)} dkk
          </Typography>

          <Typography>
            Monthly rent loan :{formatMoney(property.loan.monthlyRent)} dkk
          </Typography>

          {property.openHouseRedirectLink && (
            <Link href={property.openHouseRedirectLink} target="blank">
              Open house
            </Link>
          )}
        </Paper>
      </CardContent>
    </Card>
  );
}

interface ApartmentBlockProps {
  property: EstimatedTaggedProperty;
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
