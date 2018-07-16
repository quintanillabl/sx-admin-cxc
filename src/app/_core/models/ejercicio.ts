export class Ejercicio {
  constructor(public ejercicio, public mes) {}

  toString() {
    return `${this.ejercicio} / ${this.mes}`;
  }
}
