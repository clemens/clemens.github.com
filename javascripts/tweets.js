getTwitters('tweets', {
  id: 'clemensk',
  count: 1,
  enableLinks: true,
  ignoreReplies: true,
  clearContents: true,
  template: '%text%<p class="date"><a href="http://twitter.com/%user_screen_name%/statuses/%id%/">%time%</a></p>'
});