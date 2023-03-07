# A Chrome extension working on Shopee's product urls
A simple Chrome extension enabling copying of product and shop ids from Shopee's urls in one click.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)

## General Information
- Generally, product and shop ids from Shopee's url can be copied using already existing Chrome extensions and then extracted using Excel formulas, but that's a lot of steps for very little. With this tailor-made solution extracting that information from any open product is a one-click operation, with the result ready to paste into Excel/Google Sheets.


## Technologies Used
- JavaScript, HTML, CSS


## Features
Main functionalities:
- Detecting and copying product and shop ids in url by using three different regular expressions
- Copying order selection
- Copying from all browser windows or just the active


## Screenshots
> Interface of the extension

![image](https://user-images.githubusercontent.com/31664490/223474313-effeabd7-ffd6-4e29-82b9-d6effd508a3d.png)


## Setup
1. First, download [zipped extension](https://github.com/dberinger/product-ids-getter/releases/download/production-v1.0.0/product-ids-getter.zip) and unpack it.
2. Then go to **chrome://extensions/** in Chrome browser and toggle on **Developer mode**.
3. Still in Chrome extensions page, on the left, click **Load unpacked** and select unpacked folder.
4. Now extension should be visible among others. Make sure to toggle it on and optionally pin to browser's top bar.


## Usage
To use the extension, first make sure to follow steps in Setup section above. Once done, in order to copy any product and shop ids a Shopee product page needs to be open. For example you can go to [Shopee MY](https://shopee.com.my/Helmets-Riding-Gears-cat.11001440.11001511.11001522) and open some products. Then click the extension, choose your copying order and click **Copy** to get ids.


## Project Status
Project is: _no longer being worked on_.
