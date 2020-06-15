import gpio from "rpi-gpio";

const PIN_UP = 20;
const PIN_DOWN = 21;

const START = false;
const STOP = true;

gpio.setMode(gpio.MODE_BCM);

const loadUp = gpio.promise.setup(PIN_UP, gpio.DIR_HIGH).then(() => gpio.promise.write(PIN_UP, STOP));
const loadDown = gpio.promise.setup(PIN_DOWN, gpio.DIR_HIGH).then(() => gpio.promise.write(PIN_DOWN, STOP));

export function up(time=2000) {
  console.log(`Going up for ${time} milliseconds`);
  return loadUp
    .then(() => gpio.promise.write(PIN_UP, START))
    .then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve.bind(null), time);
      }); 
    })
    .then(() => gpio.promise.write(PIN_UP, STOP))
    .then(() => console.log('Finished'))
    .catch(err => console.error(err));
}

export function down(time=2000) {
  console.log(`Going down for ${time} milliseconds`);
  return loadUp
    .then(() => gpio.promise.write(PIN_DOWN, START))
    .then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve.bind(null), time);
      }); 
    })
    .then(() => gpio.promise.write(PIN_DOWN, STOP))
    .then(() => console.log('Finished'))
    .catch(err => console.error(err));

}

export function finished() {
  return gpio.promise.destroy();
}

