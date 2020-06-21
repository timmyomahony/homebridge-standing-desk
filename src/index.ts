import {
  AccessoryConfig,
  AccessoryPlugin,
  API,
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service
} from "homebridge";

const redis = require("redis");


let hap: HAP;
const subscriber = redis.createClient();

export = (api: API) => {
  hap = api.hap;
  api.registerAccessory("StandingDeskPlugin", StandingDeskPlugin);
};

class StandingDeskPlugin implements AccessoryPlugin {
  private readonly log: Logging;
  private readonly name: string;
  private switchOn = false;

  private readonly switchService: Service;
  private readonly informationService: Service;

  constructor(log: Logging, config: AccessoryConfig, api: API) {
    this.log = log;
    this.name = config.name;

    this.switchService = new hap.Service.Switch(this.name);
    this.switchService.getCharacteristic(hap.Characteristic.On)
      .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {
        log.info("Current state of the switch was returned: " + (this.switchOn? "ON": "OFF"));
        callback(undefined, this.switchOn);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
        this.switchOn = value as boolean;
        if (this.switchOn) {
          // Send "up_preset" to redis
          subscriber.publish('standing_desk', 'up_preset');
        } else {
          // Send "bottom_preset" to redis
          subscriber.publish('standing_desk', 'down_preset');
        }
        log.info("Switch state was set to: " + (this.switchOn? "ON": "OFF"));
        callback();
      });

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, "Conset")
      .setCharacteristic(hap.Characteristic.Model, "501-29");

    log.info("Switch finished initializing!");
  }

  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }
}
