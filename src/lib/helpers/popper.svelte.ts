export class Popper {
    public duration: number = $state(2000);
    public amount: number = $state(20);
    public delay: number = $state(250);
    public fallDistance: number = $state(20);

    public confettis: {  x: number; y: number; }[] = $state([]);

    private timeout: number|null = $state(null);

    public addConfetti(x: number, y: number): void {
        this.confettis.push({ x, y });

        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.confettis = [], this.duration);
    }
}

export default new Popper();