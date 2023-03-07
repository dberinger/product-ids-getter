const shopeeBtn = document.getElementById("shopee-icon");
const openTabsP = document.getElementById("open-tabs");
const copyBtn = document.getElementById("copy-btn");
const textArea = document.getElementById("textarea");
const activeWindowCheckBox = document.getElementById('active-window')

const openTabsNum = new Promise((res) => {

    let regexList = [/-i[.]\d*[.]\d*[?]sp_atk/, /product[/]\d*[/]\d*/, /-i[.]\d*[.]\d*/];

    chrome.tabs.query({}, function (tabs) {
        let productTabs = 0;
        tabs.forEach(function (tab) {
            if (regexList.some(rx => rx.test(tab.url))) {
                productTabs++;
            }
        })
        res(productTabs);
    })
})

async function getTabsUrl(activeOnly) {
    return new Promise((resolve, reject) => {
        if(activeOnly == true) {
            chrome.tabs.query({
                currentWindow: activeOnly
            }, function (tabs) {
                let arr = [];
                tabs.forEach(function (tab) {
                    arr.push(tab.url);
                })
                resolve(arr);
            })
        } else {
            chrome.tabs.query({}, function (tabs) {
                let arr = [];
                tabs.forEach(function (tab) {
                    arr.push(tab.url);
                })
                resolve(arr);
            })
        }
    })
}

function cleanUrl(url) {
    try {
        return url.split("-i.")[1].split("?sp_atk")[0].split('.');
    } catch (e) {
        try {
            return url.split("product/")[1].split("/");
        } catch (e) {
            try {
                return url.split("-i.")[1].split(".");
            } catch (e) {
                return null;
            }
        }
    }
}

function genShopItemIds(urls, reverse_order) {
    let arr = [];
    console.log(urls);
    urls.forEach(url => {
        let ids = cleanUrl(url);
        if (ids !== null) {
            arr.push(ids)
        };
    })
    console.log(arr);
    if (reverse_order == true) {
        arr = arr.reverse();
    }
    return arr.map(lines => lines.join("\t")).join("\n");
}

copyBtn.addEventListener("click", async () => {
    let isReverseChecked = document.getElementById('reverse-order').checked
    let isActiveWindowChecked = document.getElementById('active-window').checked
    const ids = genShopItemIds(await getTabsUrl(isActiveWindowChecked), isReverseChecked);
    textArea.textContent = ids;
    textArea.select();
    navigator.clipboard.writeText(textArea.textContent);
    if (ids.length !== 0) {
        textArea.textContent = "Copied!";
    } else {
        textArea.textContent = "Nothing to be copied :(";
    }
});

activeWindowCheckBox.addEventListener("change", async (e) => {
    if (e.target.checked == true) {
        let currentOpenTabsNum = new Promise((res) => {

            let regexList = [/-i[.]\d*[.]\d*[?]sp_atk/, /product[/]\d*[/]\d*/, /-i[.]\d*[.]\d*/];

            chrome.tabs.query({
                currentWindow: true
            }, function (tabs) {
                let productTabs = 0;
                tabs.forEach(function (tab) {
                    if (regexList.some(rx => rx.test(tab.url))) {
                        productTabs++;
                    }
                })
                res(productTabs);
            })
        })
        openTabsP.innerText = "Open products: " + await currentOpenTabsNum
        console.log('checked')
    } else {
        openTabsP.innerText = "Open products: " + await openTabsNum
        console.log('unchecked')
    }
});


((async () => {
    openTabsP.innerText = "Open products: " + await openTabsNum;
})()).catch(console.error);
