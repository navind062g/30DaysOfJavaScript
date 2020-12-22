let urlQuote = `https://api.paperquotes.com/apiv1/quotes/?language=en&limit=1&offset=`;

let offsetCounter = Math.floor(Math.random() * 50000);

let headers = {
  method: "GET",
  headers: {
    Authorization: "Token 5fa328cca2de825e33c4b0c6ebf76f4a3497267e",
  },
};
let inspireBtn = document.getElementById("get-quote-btn");

let fetchDetails = async () => {
  let updateUrl = `${urlQuote}${offsetCounter}`;
  const response = await fetch(updateUrl, headers);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  let jsonRes = await response.json();
  if (!jsonRes || !jsonRes.results) {
    return undefined;
  } else {
    let quoteObj = jsonRes.results[0];

    return {
      quoteMessage: quoteObj.quote,
      authorName: quoteObj.author,
      tags: quoteObj.tags,
    };
  }
};

inspireBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  let quoteDiv = document.querySelector("h3");

  //update the value of h3 tag
  let newQuote = "";
  let authorName = "";
  let tagsArray = [];
  try {
    offsetCounter++;
    let quoteObject = await fetchDetails();
    newQuote = quoteObject.quoteMessage;
    authorName = quoteObject.authorName;
    tagsArray = quoteObject.tags;
  } catch (error) {
    // When fetch ends with a bad http status
    console.log(error.message);
  }

  newQuote = `${newQuote} <br> ~~ ${authorName}`;

  //replace the value of h3 tag in html
  quoteDiv.innerHTML = newQuote;
});
