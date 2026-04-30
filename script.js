const data = {
    mass: {
        units: ['Kilograms', 'Grams', 'Pounds', 'Ounces'],
        ratios: { 'Kilograms': 1, 'Grams': 1000, 'Pounds': 2.20462, 'Ounces': 35.274 }
    },
    length: {
        units: ['Meters', 'Kilometers', 'Miles', 'Feet'],
        ratios: { 'Meters': 1, 'Kilometers': 0.001, 'Miles': 0.000621371, 'Feet': 3.28084 }
    },
    volume: {
        units: ['Liters', 'Milliliters', 'Gallons', 'Cups'],
        ratios: { 'Liters': 1, 'Milliliters': 1000, 'Gallons': 0.264172, 'Cups': 4.22675 }
    }
};

const categorySelect = document.getElementById('category');
const unitFrom = document.getElementById('unitFrom');
const unitTo = document.getElementById('unitTo');
const inputVal = document.getElementById('inputVal');
const outputVal = document.getElementById('outputVal');

function updateUnits() {
    const cat = categorySelect.value;
    const units = data[cat].units;
    
    unitFrom.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
    unitTo.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join('');
    convert();
}

function convert() {
    const cat = categorySelect.value;
    const val = parseFloat(inputVal.value);
    if (isNaN(val)) {
        outputVal.value = "";
        return;
    }

    // Convert input to base unit, then to target unit
    const baseValue = val / data[cat].ratios[unitFrom.value];
    const result = baseValue * data[cat].ratios[unitTo.value];
    
    outputVal.value = result.toLocaleString(undefined, {maximumFractionDigits: 4});
}

categorySelect.addEventListener('change', updateUnits);
unitFrom.addEventListener('change', convert);
unitTo.addEventListener('change', convert);
inputVal.addEventListener('input', convert);

// Init
updateUnits();

// Clock Logic
setInterval(() => {
    const now = new Date();
    document.getElementById('clock').textContent = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
}, 1000);