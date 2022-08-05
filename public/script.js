const value = document.getElementById("value");
const valueMq7 = document.getElementById("value-mq7");
const toogle = document.getElementById("toggle");

const url = "http://localhost:8080/api";

var api = {};

setInterval(() => {
  fetch(url)
    .then((hasil) => hasil.json())
    .then((res) => {
      api = res;
      console.log(api);
      valueMq7.innerHTML = api.sensor1.mq7.toString();
      if (api.sensor2.kipas == 1) {
        value.innerHTML = "ON";
        toogle.checked = true;
      } else {
        value.innerHTML = "OFF";
        toogle.checked = false;
      }
    });
}, 1000);

toogle.addEventListener("click", toogleInfo);

async function toogleInfo() {
  if (toogle.checked == true) {
    api.sensor2.kipas = 1;
  } else {
    api.sensor2.kipas = 0;
  }
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parcel: api.sensor2,
    }),
  });
}
