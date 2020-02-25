# Encrypt Facebook Messenger - Chrome Extension
This extension will encrypt and decrypt your messages locally in the browser so that no plain text is sent over the network to Facebook servers.

## Installing the extension
Because the extension is unpublished, you have to jump through some hoops to install it.
- Download this repo
- Open Chrome
- Go to [chrome://extensions](chrome://extensions)
- Turn on "Developer Mode" in the top right corner
- Click "Load unpacked"
- Navigate to and select the "Source" folder

## Setup
- Click on the "E" icon in your toolbar
- Click "Options"
- Type in a secret passphrase that you've previously agreed on with your friend
- Click "Save"

## Usage
Just go to messenger.com and use it as normal! Note that only text messages (i.e. not images, stickers, gifs) are encrypted for now.

## TODO
- multiple secret keys
- facebook.com support
- change message color if encrypted (option)
- make click send button work (in addition to pressing enter)
- handle "rich" messages (embed emoji/emoticons)
- handle images
- handle gifs, stickers
- handle reactions
- handle replies (maybe already done?)