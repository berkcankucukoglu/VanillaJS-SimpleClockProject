const canvas = document.getElementById("canvas");

const faceColor = document.getElementById("face-color");
const borderColor = document.getElementById("border-color");
const lineColor = document.getElementById("line-color");
const largeColor = document.getElementById("large-hand-color");
const secondColor = document.getElementById("second-hand-color");

function clock() {
  const date = new Date();
  const ctx = canvas.getContext("2d");

  //Setup Canvas
  ctx.save(); //save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250);
  ctx.rotate(-Math.PI / 2);

  //Set Default Styles
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#f4f4f4";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  //Draw clock border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.fillStyle = faceColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  //Draw hour lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  //Draw minutes lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  //Get Current time
  const hr = date.getHours() % 12;
  const mn = date.getMinutes();
  const sc = date.getSeconds();
  console.log(`${hr}:${mn}:${sc}`);

  //Draw Hour hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * mn + (Math.PI / 21600) * sc
  );
  ctx.strokeStyle = largeColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  //Draw Minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * mn + (Math.PI / 1800) * sc);
  ctx.strokeStyle = largeColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  //Draw Minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * sc);
  ctx.strokeStyle = secondColor.value;
  ctx.fillStyle = secondColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); //restore the default state
  requestAnimationFrame(clock); //recursive function
}

requestAnimationFrame(clock);

document.getElementById("save-btn").addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "clock.png";
  link.href = dataURL;
  link.click();
});
