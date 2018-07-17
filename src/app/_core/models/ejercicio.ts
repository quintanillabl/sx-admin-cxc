export class Ejercicio {
  static current(): Ejercicio {
    const hoy = new Date();
    return {
      ejercicio: hoy.getFullYear(),
      mes: hoy.getMonth()
    };
  }

  static getAnterior(meses: number): Ejercicio {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1 - meses;
    return {
      ejercicio: hoy.getFullYear(),
      mes
    };
  }

  constructor(public ejercicio, public mes) {}

  toString() {
    return `${this.ejercicio} / ${this.mes}`;
  }
}
