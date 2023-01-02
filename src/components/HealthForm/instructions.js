function getInstruction(data) {
  const { hrate, bsugar, sbp, dbp } = data;

  let smp = 0;
  let shrm = 0;
  let sbsm = 0;

  if (sbp > 140 || dbp > 190) {
    smp = 1;
  }

  if (hrate > 95 || hrate < 70) {
    shrm = 1;
  }

  if (bsugar > 99) {
    sbsm = 1;
  }

  const str = smp + "" + shrm + "" + sbsm;
  let msg = "";

  switch (str) {
    case "000":
      msg = "Reminder: Take regular medicines.";
      break;

    case "001":
      msg = "Please take blood sugar regulation medicine";
      break;

    case "011":
      msg = "⚠ Calling Ambulance...";
      break;

    case "100":
      msg = "Remider: Take regular medicines.";
      break;

    case "101":
      msg = "⚠ Calling Hospital.. ... Medical Support arriving";
      break;

    case "110":
      msg = "⚠ Calling Hospital.. ... Medical Support arriving";
      break;

    case "111":
      msg = "⚠ Calling Hospital.. ... Medical Support arriving";
      break;

    default:
      msg = "Remider: Take regular medicines";
  }

  return { str, msg };
}

export default getInstruction;
