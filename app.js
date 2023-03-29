// Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  //hide results
  document.getElementById('results').style.display = 'none';
  //show results
  document.getElementById('loading').style.display = 'block';
  //set time
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});
//add fuction calculateResults
function calculateResults() {
  console.log('calculating..');
  //UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayments = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    console.log('enter if...')
    monthlyPayments.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    //hide loader
    document.getElementById('loading').style.display = 'none';
    //show result
    document.getElementById('results').style.display = 'block';
    
  } else {
    showError('please check your numbers');
  }
 
}
// funciton showErrors
function showError(error) {
   //hide loader
    document.getElementById('loading').style.display = 'none';
    //hide result
    document.getElementById('results').style.display = 'none';
//create Div
  const errorDiv = document.createElement('div');
  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //Add class
  errorDiv.className = 'alert alert-danger';
  // create textNode and append to div
  errorDiv.appendChild(document.createTextNode(error));
  //insert error before heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearError, 3000);


}
// create function clearError
function clearError() {
  document.querySelector(".alert").remove();
}