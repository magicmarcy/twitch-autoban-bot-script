const tmi = require('tmi.js');

// EDIT THIS:
const PROHIBITORY_USERNAME_PREFIX   = "hoss03012";                    // the forbidden username prefix
const TRIGGERTEXT_FOLLOW            = 'thank you for following';      // The text posted from the bot
const BOTNAME                       = 'streamlabs';                   // The name of the Bot who post the 'Thank you for following'-message
const CHANNEL_TO_ADMIN              = '';                             // The channel you want to join
const TWITCH_USERNAME               = '';                             // Your Twitch-Username
const TWITCH_OAUTH                  = '';                             // Your Twitch-OAuthToken

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
      reconnect: true,
      secure: true
  },
  identity: {
    username: `${TWITCH_USERNAME}`,
    password: `oauth:${TWITCH_OAUTH}`
  },
  channels: `['${CHANNEL_TO_ADMIN}']'`
});

client.connect();

client.on('message', (channel, tags, message, self) => {  
  // Ignore echoed messages.
  if(self) return;

  // the message from the bot is: 'Thank you for following username!' but can be different!
  if(channel.toLowerCase() == CHANNEL_TO_ADMIN && 
     tags.username.toLowerCase() == BOTNAME && 
     message.toLowerCase().startsWith(TRIGGERTEXT_FOLLOW)) {

    console.log('[AUTOMOD] new follower-alert by streamlabs! -> check username');

    // split the message into array
    const splittedMessage = message.toLowerCase().split(" ");
    console.log('[AUTOMOD] message splitted: ', splittedMessage);

    // we need exactly 5 parts in the array (thank, you, for, following, username!)
    if (splittedMessage.length === 5) {
      console.log('[AUTOMOD] array-size is 5!');

      // the username is the last part of the array and has an exclamationmark at it's end which will be cutted here
      const username = splittedMessage[4].substring(0, (splittedMessage[4].length - 1));
      console.log('[AUTOMOD] username extracted from follower-alert: ', username);

      if (username.toLowerCase().startsWith(PROHIBITORY_USERNAME_PREFIX)) {
        console.log('[AUTOMOD] Username starts with <', PROHIBITORY_USERNAME_PREFIX, '>, now ban him...');
        
        // this is visible only for you (the result for every mod/admin)
        client.say(channel, '/ban @' + username + 'Bot-Account');

        console.log('[AUTOMOD] user <', username, '> was banned!');
        console.log('[AUTOMOD] unban user can be done with "/unban ', username, '" if needed');
      } else {
        console.log('[AUTOMOD] no match for a prohibited username.');
      }
    } else {
      console.log('[AUTOMOD] array-size is not 5. something is going wrong!');
      console.log('[AUTOMOD] username could not be read from the alert!');
    }
  }
});
