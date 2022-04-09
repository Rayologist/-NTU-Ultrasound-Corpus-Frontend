import {
  Grid,
  CircularProgress,
  Box,
  Button,
  Stack,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography
} from "@mui/material";
import React from "react";
import { config } from "dotenv";

config();

const createData = (type, value) => {
  return { type, value };
};

function UltrasoundData(props) {
  const { ultrasound, isFetching } = props;

  if (isFetching) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (ultrasound == null) {
    return null;
  }

  if (ultrasound.status === "failed") {
    return <Typography variant="h5" align="center">{ultrasound.msg}</Typography>;
  }

  const rows = [
    createData("Language", ultrasound.data.language),
    createData("Platform", ultrasound.data.platform),
    createData("Segment", ultrasound.data.segment),
    createData("Type", ultrasound.data.type),
    createData("Syllable", ultrasound.data.syllable),
    createData("Context", ultrasound.data.context),
  ];

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      marginTop="1rem"
      columnSpacing={{ md: 5 }}
      style={{ textAlign: "center" }}
      spacing={1}
    >
      <Grid item xs={12} md={6}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <img
            src={ultrasound.data.rawImage}
            alt="raw"
            style={{ width: "100%" }}
          />

          <img
            src={ultrasound.data.tracedImage}
            alt="traced"
            style={{ width: "100%" }}
          />
        </Stack>
      </Grid>

      <Grid item md={6} xs={12} alignSelf="start">
        <Stack rowGap={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.type}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="center">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          
          <Button
            variant="outlined"
            href={ultrasound.data.rawImage.replace(
              "images/compressed",
              "downloadImage?imageUrl=ultrasound"
            )}
            download
          >
            Download Image
          </Button>
          <Button
            variant="outlined"
            href={ultrasound.data.tracedImage.replace(
              "images/compressed",
              "downloadImage?imageUrl=ultrasound"
            )}
            download
          >
            Download Trace
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default UltrasoundData;
