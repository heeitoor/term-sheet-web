export class Deal {
    name: string;
    address: string;
    purchasePrice: number;
    netOperatingIncome: number;

    get capRate(): number {
        return this.netOperatingIncome / this.purchasePrice * 100;
    }
}
