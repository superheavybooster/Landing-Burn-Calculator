let mode = 'altToTime'; // default mode

function calcAltToTime(h) {
    const h0 = 2450;
    const t0 = 24;
    const x = Math.log(h / h0);
    const y = -0.05*x**3 + 0.47*x**2 + 0.53*x;
    return t0 * Math.exp(y);
}

function calcTimeToAlt(t) {
    const h0 = 2450;
    const t0 = 24;
    let x = 1.0; // initial guess
    const lnRatio = Math.log(t / t0);
    for(let i=0;i<20;i++){
        const f = -0.05*x**3 + 0.47*x**2 + 0.53*x - lnRatio;
        const df = -0.15*x**2 + 0.94*x + 0.53;
        x = x - f/df;
    }
    return h0 * Math.exp(x);
}

document.getElementById('switchBtn').onclick = () => {
    mode = mode === 'altToTime' ? 'timeToAlt' : 'altToTime';
    const label = document.getElementById('inputLabel');
    label.textContent = mode === 'altToTime' ? "Enter spawn altitude (m):" : "Enter wait time (s):";
    document.getElementById('result').textContent = '';
};

document.getElementById('calcBtn').onclick = () => {
    const val = parseFloat(document.getElementById('inputValue').value);
    if(isNaN(val) || val <= 0){
        document.getElementById('result').textContent = 'Please enter a valid positive number.';
        return;
    }
    let res;
    if(mode === 'altToTime'){
        res = calcAltToTime(val);
        document.getElementById('result').textContent = `Recommended wait time: ${res.toFixed(2)} seconds`;
    } else {
        res = calcTimeToAlt(val);
        document.getElementById('result').textContent = `Approximate spawn altitude: ${res.toFixed(2)} meters`;
    }
};

document.getElementById('switchBtn').onclick = () => {
    const btn = document.getElementById('switchBtn');
    const label = document.getElementById('inputLabel');

    // Toggle mode
    if(mode === 'altToTime'){
        mode = 'timeToAlt';
        label.textContent = "Enter wait time (s):";
        btn.textContent = "Switch to Altitude → Wait";
    } else {
        mode = 'altToTime';
        label.textContent = "Enter spawn altitude (m):";
        btn.textContent = "Switch to Wait → Altitude";
    }

    // Clear previous result
    document.getElementById('result').textContent = '';
};
