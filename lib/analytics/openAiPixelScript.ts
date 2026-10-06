/** Public pixel ID. Limit collection to the live marketing domain, never previews. */
export const openAiPixelScript = `!function(w,d,s,u){
  if(w.location.hostname!=="recoupable.dev"&&w.location.hostname!=="www.recoupable.dev")return;
  var dnt=[w.navigator.doNotTrack,w.navigator.msDoNotTrack,w.doNotTrack];
  if(w.navigator.globalPrivacyControl===true||dnt.some(function(v){return v==="1"||v==="yes"}))return;
  if(w.oaiq)return;
  var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;
  var j=d.createElement(s);j.async=true;j.src=u;
  var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f);
  q("init",{pixelId:"TqnT6JtP1DyuB7C7H96pYP"});
}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");`;
