### Twitch-Autoban Scripts
I was the moderator of a streamer friend of mine on his channel. Among other things, it was my job there to protect the channel from spam and bots. 

## Problem
For a while there was the problem that new followers kept coming who all had the same username prefix. These accounts were used to later carry out so-called hate raids.
These accounts had to be banned but when the follow was received, they were not active in the channel because the follow took place via a script.

## Solution
So I was looking for a simple - if possible automated - way to ban these users. I wrote myself a script with which I could check the username for a new follow, whether it corresponds to the known pattern. At the time it was the prefix "hoss0312".
With this script, I am responding to the message from the Streamlabs bot that postet a "thank you"-message for a new follower. The script is basically a bot itself - the user behind it was myself.

## Attention
You can of course also use the script for other cases. But please make sure that the script can also ban uninvolved users if it is not understood correctly. You should therefore be very careful whether you really want that.

## Requirements
In order to be able to use the script, you have to be at least a moderator in the corresponding channel and there has to be a bot who postet a message in the channel if a new follower appears.

## Technical-Requirements
The script runs over Node.js and uses especially the "tmi.js" which is necessary for the connection to Twitch. So you can simply run it locally on your computer while you are present in the stream and then simply stop it again. So you don't need an external hoster for it.

## Additionals
I know there is a very special use case for the use of this script which most people cannot use. Nevertheless, it offers at least a rough indication of what else you can do with it. Please do not reupload the script with your own username/token in the script!

## License
You can of course use this script freely and change whatever you like. I look forward to comments and, of course, suggestions for improvement. But this is my first script here - so don't be too harsh on me;)
