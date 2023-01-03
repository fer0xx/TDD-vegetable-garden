// Apply environment factors to yield result
const applyEnvironmentFactors = (cropFactors, yieldResult, environmentFactors) => {
    if (!environmentFactors || !yieldResult) {
        return yieldResult;
    }

    for (const [key, value] of Object.entries(environmentFactors)) {
        const factorValue = cropFactors[key][value];
        if (factorValue) {
            yieldResult *= (100 + factorValue) / 100;
        }
    }

    return yieldResult;
}

// Get yield for plant
const getYieldForPlant = (input, environmentFactors) => {
    return applyEnvironmentFactors(
        input.factors,
        input.yield,
        environmentFactors
    );
};

// Calculate yield for crop
const getYieldForCrop = (input, environmentFactors) => {
    return applyEnvironmentFactors(
        input.crop.factors,
        input.crop.yield * input.numCrops,
        environmentFactors
    );
};

// Get total yield for plant
const getTotalYield = (input, environmentFactors) => {
    return input.crops
        .map((crop) => getYieldForCrop(crop, environmentFactors))
        .reduce((accumulator, currentValue) => accumulator + currentValue);
};

// Calculate revenue for crop
const getRevenueForCrop = (input, environmentFactors) => {
    let revenueForCrop = getYieldForCrop(input, environmentFactors) * input.crop.salePrice;

    return parseFloat(revenueForCrop.toFixed(2));
};

// Calculate costs for crop
const getCostsForCrop = (input) => {
    return input.numCrops * input.crop.cost;
};

// Calculate profit for crop
const getProfitForCrop = (input, environmentFactors) => {
    return getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input);
};

// Calculate total profit
const getTotalProfit = (crops, environmentFactors) => {
    const profit = crops.map((crop) => getProfitForCrop(crop, environmentFactors));

    return profit.reduce((accumulator, currentValue) => accumulator + currentValue);
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};