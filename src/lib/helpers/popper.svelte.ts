export interface ConfettiOptions {
    x: number;
    y: number;
    rounded?: boolean;
    colors?: string[];
    amount?: number;
    delay?: number;
}

export class Popper {
    public duration: number = $state(2000);
    public amount: number = $state(20);
    public delay: number = $state(250);
    public fallDistance: number = $state(20);

    public confettis: ConfettiOptions[] = $state([]);

    private timeout: number|null = $state(null);

    public addConfetti(options: ConfettiOptions): void {
        this.confettis.push(options);

        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.confettis = [], this.duration);
    }
}

export default new Popper();