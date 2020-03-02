# Encrypt Facebook Messenger - Chrome Extension
This extension will encrypt and decrypt your messages **locally** in the browser so that no plain text is sent over the network to Facebook servers.

![example](./encrypt-example.png)

## Background
After reading [this article](https://www.nytimes.com/2020/01/24/opinion/sunday/surveillance-capitalism.html), I was motivated to build something
that would help resist the forces of [surveillance capitalism](https://en.wikipedia.org/wiki/Surveillance_capitalism).

N.B. This extension is *not* intended to be a fully-functioning tool for encrypted messaging ([Signal](https://signal.org/) and [Telegram](https://telegram.org/) are much better for that). Rather, it was built as a proof of concept, an **act of resistance**, and (hopefully) a source of inspiration.

## Installing the extension
Because the extension is unpublished (for now), you have to jump through some hoops to install it.
- Download this repo
- Open Chrome
- Go to [chrome://extensions](chrome://extensions)
- Turn on "Developer Mode" in the top right corner
- Click "Load unpacked"
- Navigate to and select the "Source" folder

## Setup
- Click on the "E" icon in your toolbar
- Click "Options"
- For each friend who also has the extension, type in their username and a previously-agreed-upon secret passphrase
    - Usernames can be found in the address bar when you are messaging them: `https://messenger.com/t/[username]`
- Click "Save"

## Usage
Just go to messenger.com and use it as normal! Note that only text messages (i.e. not images, stickers, gifs) are encrypted for now.

## TODO
- facebook.com support
- change message color if encrypted (option)
- make click send button work (in addition to pressing enter)
- handle "rich" messages (embed emoji/emoticons)
- handle images
- handle gifs, stickers
- handle reactions
- handle replies (maybe already done?)