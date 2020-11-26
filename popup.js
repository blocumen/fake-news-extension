// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
changeColor.onclick = function (element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: 'document.body.style.backgroundColor = "' + color + '";' });
  });
};




function onUrlSubmit() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    "GET",
    'http://localhost:5754/api/v1/getAllPosts',
    false
  );
  xmlHttp.send(null);
  data = JSON.parse(xmlHttp.response);

  // $.ajax({
  //   type: "GET",
  //   url: "http://localhost:5754/api/v1/getAllPosts",
  //   headers: { Authorization: "Bearer " + loginToken },
  //   dataType: "json",
  //   success: function (dataString) {
  //     posts = dataString.posts;
  //     console.log("posts : ", posts);
  //     getUserInfo();
  //     populatePostOnDom(posts);
  //   },
  //   error: function (failureResponse) {
  //     console.log("**failure response : ", failureResponse);
  //   },
  // });
}