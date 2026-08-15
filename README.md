# powerline.io-hacks

## Introduction

This repo contains all the work I've done on powerline.io, before the 1 August 2026 update.
Here you can find lots of things, like the deobfuscated powerline client source code, some hacks I wrote, and a small
tool to spawn bots in game.

In the new updates, the developer of the game introduced VM obfuscation to some parts of
the code to prevent deobfuscation. As a result, most of the network code is now kinda lost (unless you want to
spend tens of hours into it). Instead you can dive into this older code, as most of
it is still relevant (the hacks work too if you know how to use them).

## Tools

`ws-proxy` is a tool that acts as an intermediary between your local copy of the powerline website and the official
websocket server. The local website connects to this websocket proxy server, and all the communication from part A
is passed to part B. The reason for this tool is that the browser's WebSocket API does not allow you to change the
headers of the request when connecting to a server, so the powerline server will instantly reject the connection.
This tool makes sure all headers are set up correctly, also it works well with the bots because it looks in
the 'protocols' of the request. So an extra benefit is that you get easy access between the communications of the
connection.

The local website runs through Chromium, which has set up a proxy server. `http-proxy` is a small script that runs the
proxy server. You can then simply connect to `http://powerline.io` and all traffic will instead be routed to the
local website. I'm not sure why I'm still using a proxy here actually

The `website` folder contains all the local website data. Here is my version of the (mostly) deobfuscated pl source
code. Also here are the hacks I wrote. `start.sh` serves the website.

`ezbots` is a CLI tool to spawn bots in game. On startup, it will start searching for good proxies that can connect
to pl. More details can be found in the source code.

## Conclusion

I'll be back when Calvin stops with the updates.