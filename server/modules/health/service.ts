import type { HealthModel } from "./model";

export abstract class Health {
  static check() {
    return {
      status: "ok",
    } satisfies HealthModel["checkResponse"];
  }
}
