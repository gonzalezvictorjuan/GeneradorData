export class CPMModel {
    lvl: number;
    value: number;

    constructor(cpm?) {
        if (cpm){
            this.lvl = cpm.lvl;
            this.value = cpm.value;
        }
    }
}
