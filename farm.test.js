const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
} = require('./farm');

describe('getYieldForPlant', () => {
    test('Get yield for plant with no environment factors', () => {
        const corn = {
            name: 'corn',
            yield: 30,
        };
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test('Get yield for plant with two environment factors', () => {
        const corn = {
            name: 'corn',
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const environmentFactors = {
            sun: 'low',
            wind: 'medium',
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(10.5);
    });
});


describe('getYieldForCrop', () => {
    test('Get yield for crop, simple', () => {
        const corn = {
            name: 'corn',
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });

    test('Get yield for crop with environment factors', () => {
        const corn = {
            name: 'corn',
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        }
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: 'high',
            wind: 'low',
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(45);
    });
});

describe('getTotalYield', () => {
    test('Calculate total yield with multiple crops', () => {
        const corn = {
            name: 'corn',
            yield: 3,
        };
        const pumpkin = {
            name: 'pumpkin',
            yield: 4,
        };
        const crops = [{crop: corn, numCrops: 5}, {crop: pumpkin, numCrops: 2},];
        expect(getTotalYield({crops})).toBe(23);
    })

    test('Calculate total yield with environment factors', () => {
        const corn = {
            name: 'corn',
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const pumpkin = {
            name: 'pumpkin',
            yield: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };

        const environmentFactors = {
            sun: 'medium',
            wind: 'high',
        }
        const crops = [{crop: corn, numCrops: 5}, {crop: pumpkin, numCrops: 2},];

        expect(getTotalYield({crops}, environmentFactors)).toBe(9.2);
    });

    test('Calculate total yield with 0 amount', () => {
        const corn = {
            name: 'corn',
            yield: 3,
        };
        const crops = [{crop: corn, numCrops: 0}];
        expect(getTotalYield({crops})).toBe(0);
    });
});

describe('getCostsForCrop', () => {
    test('Calculate costs for crop', () => {
        const corn = {
            name: 'corn',
            cost: 1,
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getCostsForCrop(input)).toBe(10);
    });
});

describe('getRevenueForCrop', () => {
    test('Calculate revenue for crop', () => {
        const corn = {
            name: 'corn',
            salePrice: 2,
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getRevenueForCrop(input)).toBe(60);
    });

    test('Calculate revenue for crop with environment factors', () => {
        const corn = {
            name: 'corn',
            salePrice: 2,
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: 'high',
            wind: 'medium',
        };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(63);
    });
});

describe('getProfitForCrop', () => {
    test('Calculate profit for crop', () => {
        const corn = {
            name: 'corn',
            cost: 1,
            salePrice: 2,
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getProfitForCrop(input)).toBe(50);
    });

    test('Calculate profit for crop with environment factors', () => {
        const corn = {
            name: 'corn',
            cost: 1,
            salePrice: 2,
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: 'low',
            wind: 'high',
        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(2);
    });
});

describe('getTotalProfit', () => {
    test('Calculate total profit', () => {
        const corn = {
            name: 'corn',
            yield: 3,
            salePrice: 2,
            cost: 1
        };

        const pumpkin = {
            name: 'pumpkin',
            yield: 4,
            salePrice: 10.5,
            cost: 3
        };

        const crops = [{crop: corn, numCrops: 5}, {crop: pumpkin, numCrops: 2},];

        expect(getTotalProfit(crops)).toBe(103);
    });

    test('Calculate total profit with environment factors', () => {
        const corn = {
            name: 'corn',
            yield: 3,
            salePrice: 2,
            cost: 1,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        
        const pumpkin = {
            name: 'pumpkin',
            yield: 4,
            salePrice: 10.5,
            cost: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };

        const environmentFactors = {
            sun: 'medium',
            wind: 'high',
        }
        const crops = [{crop: corn, numCrops: 5}, {crop: pumpkin, numCrops: 2},];

        expect(getTotalProfit(crops, environmentFactors)).toBe(34.6);
    });
});