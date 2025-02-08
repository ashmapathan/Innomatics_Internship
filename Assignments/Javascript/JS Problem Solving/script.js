
function withdrawMoney() {
    let balance = 5000;
    let pin = 1234;

    let enteredPin = parseInt(document.getElementById("pinInput").value);
    let amount = parseInt(document.getElementById("amountInput").value);
    let output = document.getElementById("atmOutput");

    if (enteredPin !== pin) {
        output.innerText = "Incorrect PIN";
        return;
    }
    if (amount > balance) {
        output.innerText = "Insufficient Funds";
        return;
    }
    if (amount % 100 !== 0) {
        output.innerText = "Enter amount in multiples of 100";
        return;
    }

    balance -= amount;
    output.innerText = `Withdrawal Successful: ₹${amount}, Remaining Balance: ₹${balance}`;
}


function calculateFinalAmount() {
    let orderAmount = parseFloat(document.getElementById("orderAmountInput").value);
    let output = document.getElementById("shoppingOutput");

    let discount = orderAmount > 1000 ? 0.2 : orderAmount >= 500 ? 0.1 : 0;
    let finalAmount = orderAmount - (orderAmount * discount);
    let shipping = finalAmount > 50 ? 0 : 10;

    output.innerText = `Final Amount: ₹${(finalAmount + shipping).toFixed(2)}`;
}

function calculateGrade() {
    let marks = parseInt(document.getElementById("marksInput").value);
    let attendance = parseInt(document.getElementById("attendanceInput").value);
    let output = document.getElementById("gradeOutput");

    if (attendance > 90) marks += 5;

    let grade = marks >= 90 ? 'A' :
                marks >= 80 ? 'B' :
                marks >= 70 ? 'C' :
                marks >= 60 ? 'D' : 'F';

    output.innerText = `Final Grade: ${grade}`;
}


function trafficLightControl() {
    let density = document.getElementById("densityInput").value;
    let output = document.getElementById("trafficOutput");

    let greenTime = density === "Heavy Traffic" ? 60 :
                    density === "Moderate Traffic" ? 40 : 20;

    output.innerText = `Green Light Duration: ${greenTime} seconds`;
}


function calculateTicketPrice() {
    let age = parseInt(document.getElementById("ageInput").value);
    let showTime = parseInt(document.getElementById("showTimeInput").value);
    let output = document.getElementById("ticketOutput");

    let price = 12;
    if (showTime < 17) price *= 0.8;
    if (age > 60) price *= 0.7;
    if (age < 12) price *= 0.6;

    output.innerText = `Ticket Price: ₹${price.toFixed(2)}`;
}


function isEligibleForJob() {
    let age = parseInt(document.getElementById("jobAgeInput").value);
    let experience = parseInt(document.getElementById("experienceInput").value);
    let qualification = document.getElementById("qualificationInput").value;
    let output = document.getElementById("jobOutput");

    let eligible = age >= 21 && age <= 55 && experience >= 2 && qualification === "Bachelor's Degree";
    output.innerText = eligible ? "Eligible for Job" : "Not Eligible";
}


function applyCoupon() {
    let orderAmount = parseFloat(document.getElementById("couponOrderInput").value);
    let couponCode = document.getElementById("couponCodeInput").value;
    let output = document.getElementById("couponOutput");

    let finalAmount = orderAmount;
    if (couponCode === "DISCOUNT10" && orderAmount > 500) {
        finalAmount *= 0.9;
    } else if (couponCode === "FREESHIP" && orderAmount > 200) {
        output.innerText = `Final Price: ₹${finalAmount} (Free Shipping)`;
        return;
    }

    output.innerText = `Final Price: ₹${finalAmount}`;
}


function choosePlan() {
    let planType = document.getElementById("planType").value;
    let wantsTrainer = document.getElementById("wantsTrainer").checked;
    let wantsDietPlan = document.getElementById("wantsDietPlan").checked;
    let output = document.getElementById("planOutput");

    let price = planType === "Basic" ? 20 :
                planType === "Premium" ? 50 : 80;

    output.innerText = `Selected Plan: ${planType}, Cost: ₹${price}`;
}


function calculateElectricityBill() {
    let units = parseInt(document.getElementById("unitsInput").value);
    let timeOfDay = document.getElementById("timeInput").value;
    let output = document.getElementById("billOutput");

    let rate = units < 100 ? 5 : units <= 300 ? 4 : 3;
    if (timeOfDay === "Peak") rate *= 1.1;

    output.innerText = `Total Bill: ₹${(units * rate).toFixed(2)}`;
}


function calculateFlightFare() {
    let classType = document.getElementById("classType").value;
    let luggageWeight = parseInt(document.getElementById("luggageWeight").value);
    let output = document.getElementById("flightOutput");

    let baseFare = 300;
    let classCharge = classType === "Business" ? 200 : classType === "First" ? 500 : 0;
    let extraLuggageCharge = luggageWeight > 20 ? Math.floor((luggageWeight - 20) / 10) * 50 : 0;

    output.innerText = `Total Fare: ₹${baseFare + classCharge + extraLuggageCharge}`;
}
