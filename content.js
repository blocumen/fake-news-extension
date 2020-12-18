// Functions
let tweetsData=[];
let tweetParser = async function (tweetDom) {
    let tweetContent = tweetDom.innerText;
    let tweet = {
      name: "",
      username: "",
      time: "",
      content: "",
      interaction: {
        reply: "",
        retweets: "",
        like: "",
      },
    };
    //console.log("Tweet Content", tweetContent)
    let timeElm = tweetDom.getElementsByTagName("time")[0];
    let timeDis = timeElm.innerText;
    //console.log("Tweet Time Element ",timeElm)
    let dateTimeAtri = timeElm.getAttribute("datetime");
    let splitTweet = tweetContent.split(/\n/);
    let splitLength = splitTweet.length;
    let breakpoint = 4;
    let endContent = splitLength - 4;
    for (let i = 0; i < splitLength; i++) {
      if (splitTweet[i] === timeDis) {
        breakpoint = i;
      }
    }
    //console.log("Split Tweet",splitTweet)
    tweet.name = splitTweet[0];
    tweet.username = splitTweet[1];
    tweet.time = dateTimeAtri;
    tweet.content = splitTweet.slice(breakpoint + 1, endContent + 1);
    tweet.content = tweet.content.join("\n");
    tweet.interaction.reply = splitTweet[endContent + 1];
    tweet.interaction.retweets = splitTweet[endContent + 2];
    tweet.interaction.like = splitTweet[endContent + 3];
    //console.log(tweet)
    return tweet;
  };
  
  async function getTweets() {
    // Function to get New Tweet Bodies
    let divs = document.querySelectorAll("div"); // Load Div Elements
// alert(divs,"4444444444");
//   for (var i = 0, element; (element = divs[i]); i++) {
//       alert(element);
//     console.log(element);
// }


    tweets = [];
    tweetIds = [];
  
    for (let div of divs) {
      //console.log(div.innerHTML)
      let dataTestId = div.getAttribute("data-testid");
      
      // data-tweet-id
      if (dataTestId == "tweet") {
        tweets.push(div);
      }
    } // Load Tweet Elements by checking for specific Attribute
  
    tweetContent = {};
    let parsedTweets = {};
  
    for (let tweet of tweets) {
  
      let aTags = tweet.getElementsByTagName("a");
     
      for (let aTag of aTags) {
        let href = aTag.getAttribute("href");
        if (href.includes("/status/")) {
  
          let start = href.indexOf("/status/");
          let tweetId = href.split("/status/");
          tweetId = tweetId[1];
          if (!(tweetId in parsedTweets)) {
            
        //    if(endPointTweets[tweetId]){
             
        //        if(endPointTweets[tweetId].result){
        //            tweet.style.backgroundColor = "green";
        //        }else{
        //         tweet.style.backgroundColor = "red";
        //        }
        //    }

        
        for(let i=0;i<tweetsData.length;i++){
            if(tweetsData[i].tweetId == tweetId){
                if(tweetsData[i].result == "positiveStatus"){
                    tweet.style.backgroundColor = "green";
                }else if(tweetsData[i].result == "negativeStatus"){
                    tweet.style.backgroundColor = "red";
                }
            }
        }
            tweetIds.push(tweetId);
            //console.log(tweet.innerText)
            parsedTweets[tweetId] = await tweetParser(tweet);
          }
        }
      } // Finding Tweet Id for every tweet by processing all <a> tags within the tweet
    } // Iterating through tweets
  
    return parsedTweets;
  }
  // ------- End of Functions ------
  
  // Main
  let main = async function () {
    let parsedTweetsGlobal = {};
    parsedTweetsGlobal = await getTweets();
 
    const req = new XMLHttpRequest();
  const baseUrl = "http://localhost:5754/api/v1/getAllPosts";
 
 
  req.open("GET", baseUrl, true);

  await req.send();
 
   req.onreadystatechange = async function () {
    // Call a function when the state changes.
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        
      let data = await JSON.parse(req.responseText);

      if(data.status == true){
      if(data.posts){
          for(let i=0;i<data.posts.length;i++){
              if(data.posts[i].tweetLink){
                
                  let getTweetId = data.posts[i].tweetLink.split("/").pop();
                  let finalResult = data.posts[i].result;
                  let finalTweet = {};
                  finalTweet.tweetId = getTweetId;
                  finalTweet.result=finalResult;
                tweetsData.push(finalTweet);
              }
          }
          
      }
     
        //  endPointTweets = data.tweets.tweetData;
      }
     

      console.log("Got response 200!");
    }
  };
  
    window.addEventListener("scroll", async function () {
      let newParsedTweets = await getTweets();
      console.log(
        "From Scroll Event Listener ",
        Object.keys(newParsedTweets).length
      );
      let newDistinctTweets = new Object();
      for (let newTweetID in newParsedTweets) {
        if (!(newTweetID in parsedTweetsGlobal)) {
          newDistinctTweets[newTweetID] = newParsedTweets[newTweetID];
          console.log("New Distinct Tweet from Scroll Event");
        }
      }
  
      parsedTweetsGlobal = { ...parsedTweetsGlobal, ...newParsedTweets };
      console.log(
        "New Key Length From Scroll Even",
        Object.keys(parsedTweetsGlobal).length
      );
    });
  };
  main();
  