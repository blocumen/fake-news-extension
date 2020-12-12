// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log("The color is green.");
  });
  // let active_tab_id = 0;

  // chrome.tabs.onActivated.addListener(tab => {
  //     chrome.tabs.get(tab.tabId, current_tab_info => {
  //         active_tab_id = tab.tabId;
  
        
             
  //             chrome.tabs.executeScript(null, { file: './content.js' }, () => console.log('i injected'))
          
  //     });
  // });


 

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { schemes: ['http', 'https'] },
        // schemes: ['http', 'https']
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

});
