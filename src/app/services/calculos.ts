import { Utils } from './utils';
import { HttpClientModule, HttpClient } from '@angular/common/http';


export class Calcular {
    // Bases STATS

    private static BaseAtk: number = 0;
    private static BaseDef: number = 0;
    private static BaseStam: number = 0;

    // IVs STATS
    private static AtkIV: number = 0;
    private static DefIV: number = 0;
    private static StamIV: number = 0;

    // Utils.filterArrayByString()
    constructor(private httpClient: HttpClientModule) { }

    public static getLevel(): number {
        if (this._getM12() === 1500) {
            const aux = this._getO12() + 0.5;
            const aux2 = 40;

            if (aux >= aux2) {
                return aux2;
            } else {
                return aux;
            }

        } else {
            return this._getO12();
        }

        return -1;
    }

    private static _getO12(): number {

        return -1;
    }





    private static _getQ12(): number {
        return -1;
    }

    private static _getM12(): number {
        return ((15000 / this._getCPAux()) ^ 0.5);
    }



    private static _getCPAux(): number {
        return ((this.BaseAtk + this.AtkIV) * ((this.BaseDef + this.DefIV) ^ 0.5) * ((this.BaseStam + this.StamIV) ^ 0.5));
    }

    private static _buscar(): number {
        const = this.httpClient.get('api/cpm').subscribe();
        return 0;
    }
}
