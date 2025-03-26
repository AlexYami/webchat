export function sort<T>(arr: T[], callback: (a: T | undefined, b: T | undefined) => number): T[] {
    const sorted = [...arr];

    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
            if (callback(sorted[j], sorted[j + 1]) > 0) {
                let temp = sorted[j]!;
                sorted[j] = sorted[j + 1]!;
                sorted[j + 1] = temp;
            }
        }
    }

    return sorted;
}
