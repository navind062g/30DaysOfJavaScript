let inspireBtn = document.getElementById("btn-inspire");

inspireBtn.addEventListener("click", (event) => {
  let quoteDiv = document.querySelector("h3");

  //update the value of h3 tag
  let newQuote;
  newQuote =
    "The Matrix is the world that has been pulled over your eyes to blind you from the truth.";
  let movieName = "The Matrix";
  newQuote = newQuote.concat("\n", movieName);

  //replace the value of h3 tag in html
  quoteDiv.innerHTML = newQuote;
});
