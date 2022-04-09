import React, { useState } from "react";
import UltrasoundForm from "../components/Form/UltrasoundForm/UltrasoundForm";
import UltrasoundData from "../components/UltrasoundData/UltrasoundData";
import { Divider} from "@mui/material";

function Corpus() {
  const [ultrasound, setUltrasound] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  return (
    <div>
      <UltrasoundForm
        setUltrasound={setUltrasound}
        setIsFetching={setIsFetching}
      />
      <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
      <UltrasoundData ultrasound={ultrasound} isFetching={isFetching} />
    </div>
  );
}

export default Corpus;
