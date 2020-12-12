// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

let changeColor = document.getElementById("changeColor");
chrome.storage.sync.get("color", function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});
changeColor.onclick = function (element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.backgroundColor = "' + color + '";',
    });
  });
};

var button = document.getElementById("loginButton");

// button.addEventListener("click", function(){
//   const url = document.getElementById("tweetUrl").value;
//   alert(url);
//     const req = new XMLHttpRequest();
//     const baseUrl = "http://localhost:5754/api/v1/createPost";
//     const urlParams = `tweetLink=${url}`;
// console.log(urlParams);
//     req.open("POST", baseUrl, true);
//     req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     req.send(urlParams);

//     req.onreadystatechange = function() { // Call a function when the state changes.
//         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//             console.log("Got response 200!");
//         }
//     }
// });
button.addEventListener("click", function () {
  //const url = document.getElementById("tweetUrl").value;

  const req = new XMLHttpRequest();
  const baseUrl = "http://localhost:5754/api/v1/getTweetData";
 
 
  req.open("GET", baseUrl, true);

  req.send();
  req.onreadystatechange = function () {
    // Call a function when the state changes.
    if (req.readyState === XMLHttpRequest.DONE) {
      let data = JSON.parse(req.responseText);
      if(data.status == true)
      alert(JSON.stringify(data.tweets.tweetData));

      console.log("Got response 200!");
    }
  };
});



// function onUrlSubmit() {
//   let xmlHttp = new XMLHttpRequest();
//   xmlHttp.open(
//     "GET",
//     'http://localhost:5754/api/v1/getAllPosts',
//     false
//   );
//   xmlHttp.send(null);
//   data = JSON.parse(xmlHttp.response);

//   // $.ajax({
//   //   type: "GET",
//   //   url: "http://localhost:5754/api/v1/getAllPosts",
//   //   headers: { Authorization: "Bearer " + loginToken },
//   //   dataType: "json",
//   //   success: function (dataString) {
//   //     posts = dataString.posts;
//   //     console.log("posts : ", posts);
//   //     getUserInfo();
//   //     populatePostOnDom(posts);
//   //   },
//   //   error: function (failureResponse) {
//   //     console.log("**failure response : ", failureResponse);
//   //   },
//   // });
// }
