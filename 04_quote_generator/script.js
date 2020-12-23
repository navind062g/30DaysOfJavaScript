let urlQuote = `https://api.quotable.io/random`;

let inspireBtn = document.getElementById("get-quote-btn");

let fetchDetails = async () => {
  let updateUrl = `${urlQuote}`;
  const response = await fetch(updateUrl);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  let jsonRes = await response.json();
  if (!jsonRes || !jsonRes.content) {
    return undefined;
  } else {
    let quoteObj = jsonRes;

    return {
      quoteMessage: quoteObj.content,
      authorName: quoteObj.author,
      tags: quoteObj.tags,
    };
  }
};

function makeHashtag(str) {
  let wordArray = str.split(" ").filter((char) => char !== "");
  let result = "#";

  if (wordArray.length === 0) {
    return false;
  }

  let stringObj = wordArray
    .map((word) => {
      let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
      return capitalizedWord;
    })
    .join("");

  result = result + stringObj;
  if (result.length > 140) {
    return false;
  } else {
    return result;
  }
}

function createTagsForQuote(tagsArray) {
  if (tagsArray === undefined || tagsArray.length === 0) {
    return [];
  }

  return tagsArray.map((element) => {
    let hashTag = makeHashtag(element);
    if (hashTag) {
      hashTag = `<div class="quote-tags">${hashTag}</div>`;
      return hashTag;
    }
    return `<div>${element}</div>`;
  });
}

function mapToHtml(hashTagsArray) {
  let hashTagsEmbed = "";
  hashTagsArray.forEach((element) => {
    hashTagsEmbed = hashTagsEmbed + element;
  });
  return hashTagsEmbed;
}

async function updateQuoteDetails() {
  let quoteMesDiv = document.querySelector("h3");
  let quoteAuthDiv = document.querySelector("div cite");
  let quoteTagsDiv = document.getElementById("hash-tags");

  //update the value of h3 tag
  let newQuote = "";
  let authorName = "";
  let tagsArray = [];
  try {
    let quoteObject = await fetchDetails();
    newQuote = quoteObject.quoteMessage;
    authorName = quoteObject.authorName;
    tagsArray = quoteObject.tags;
  } catch (error) {
    // When fetch ends with a bad http status
    console.log(error.message);
  }
  //replace the value of h3 tag in html
  quoteMesDiv.innerHTML = newQuote;
  quoteAuthDiv.innerHTML = authorName;

  let hashTags = mapToHtml(createTagsForQuote(tagsArray));
  quoteTagsDiv.innerHTML = hashTags;
}

inspireBtn.addEventListener("click", (event) => {
  event.preventDefault();
  updateQuoteDetails();
});

updateQuoteDetails();
