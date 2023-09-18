const shopeeBtn = document.getElementById("shopee-icon");
const openTabsP = document.getElementById("open-tabs");
const copyBtn = document.getElementById("copy-btn");
const textArea = document.getElementById("textarea");
const activeWindowCheckBox = document.getElementById("active-window");
const productRegexes = [
  /-i[.]\d*[.]\d*[?]sp_atk/,
  /product[/]\d*[/]\d*/,
  /-i[.]\d*[.]\d*/,
];

// count number of tabs with products open - dependent on url regex match
const openTabsNum = new Promise((resolve, reject) => {
  chrome.tabs.query({}, function (tabs) {
    let productTabs = 0;
    tabs.forEach(function (tab) {
      if (productRegexes.some((rx) => rx.test(tab.url))) {
        productTabs++;
      }
    });
    resolve(productTabs);
  });
});

async function getTabsUrl(activeOnly) {
  return new Promise((resolve, reject) => {
    if (activeOnly) {
      chrome.tabs.query(
        {
          currentWindow: activeOnly,
        },
        function (tabs) {
          let arr = [];
          tabs.forEach(function (tab) {
            arr.push(tab.url);
          });
          resolve(arr);
        }
      );
    } else {
      chrome.tabs.query({}, function (tabs) {
        let arr = [];
        tabs.forEach(function (tab) {
          arr.push(tab.url);
        });
        resolve(arr);
      });
    }
  });
}

function cleanUrl(url) {
  try {
    return url
      .split(/-i\.|product\//)[1]
      .split("?sp_atk")[0]
      .split(".");
  } catch (e) {
    return null;
  }
}

function genShopItemIds(urls, reverse_order) {
  let arr = [];

  urls.forEach((url) => {
    let ids = cleanUrl(url);
    if (ids !== null) {
      arr.push(ids);
    }
  });

  if (reverse_order) {
    arr = arr.reverse();
  }

  return arr.map((lines) => lines.join("\t")).join("\n");
}

copyBtn.addEventListener("click", async () => {
  let isReverseChecked = document.getElementById("reverse-order").checked;
  let isActiveWindowChecked = document.getElementById("active-window").checked;
  const ids = genShopItemIds(
    await getTabsUrl(isActiveWindowChecked),
    isReverseChecked
  );
  textArea.textContent = ids;
  textArea.select();
  navigator.clipboard.writeText(textArea.textContent);
  textArea.textContent =
    ids.length != 0 ? "Copied!" : "Nothing to be copied :(";
});

activeWindowCheckBox.addEventListener("change", async (e) => {
  if (e.target.checked) {
    let currentOpenTabsNum = new Promise((resolve) => {
      chrome.tabs.query(
        {
          currentWindow: true,
        },
        function (tabs) {
          let productTabs = 0;
          tabs.forEach(function (tab) {
            if (productRegexes.some((rx) => rx.test(tab.url))) {
              productTabs++;
            }
          });
          resolve(productTabs);
        }
      );
    });
    openTabsP.innerText = "Open products: " + (await currentOpenTabsNum);
  } else {
    openTabsP.innerText = "Open products: " + (await openTabsNum);
  }
});

(async () => {
  openTabsP.innerText = "Open products: " + (await openTabsNum);
})().catch(console.error);
