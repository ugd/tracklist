class t{constructor(t="",e=[]){this.name=t,this.tracks=e}filter(e,n){let r=new t;return r.name=this.name,r.tracks=this.tracks.filter(((t,n)=>n>=e)).filter((t=>!n||t.playedPublic)),r}}function e(t){return Array.prototype.map.call(t.querySelectorAll("NML > COLLECTION > ENTRY"),((t,e)=>{const n={title:t.attributes.TITLE?.value,artist:t.attributes.ARTIST?.value},r=t.querySelectorAll("LOCATION")[0];return n.key=r.attributes.VOLUME.value+r.attributes.DIR.value+r.attributes.FILE.value,n.key=n.key,n})).reduce(((t,e)=>(t[e.key]=e,t)),{})}class n extends t{filter(t,e){const n=super.filter(t,e);return function(t){if(!t.tracks[0]?.startTimeJS)return;const e=t.tracks[0].startTimeJS,n=t.tracks[t.tracks.length-1].startTimeJS,r=c((n-e)/1e3).hours>0,s=0<Math.floor((n-e)/3600/1e3);console.assert(r===s,`${r} === ${s}`),t.tracks.forEach((t=>{t.timeOffset=(t.startTimeJS-e)/1e3,t.timeOffsetString=function(t,e){const n=i(t).toString().padStart(2,"0"),r=o(t).toString().padStart(2,"0"),s=l(t).toString().padStart(2,"0");return e?`${r}:${s}`:`${n}:${r}:${s}`}(t.timeOffset,!r)}))}(n),n}}function r(t){return t>>16}function s(t){return(t>>8)%256}function a(t){return t%256}function l(t){return t%60}function o(t){return Math.floor((t-3600*Math.floor(t/3600))/60)}function i(t){return Math.floor(t/3600)}function c(t){return{hours:i(t),minutes:o(t),seconds:l(t)}}function u(t){const e=t.getElementsByTagName("DJ_PLAYLISTS")[0].getElementsByTagName("COLLECTION")[0].getElementsByTagName("TRACK");return Array.prototype.map.call(e,((t,e)=>({key:t.attributes.TrackID.value,title:t.attributes.Name.value,artist:t.attributes.Artist.value}))).reduce(((t,e)=>(t[e.key]=e,t)),{})}function m(t,e){t.split("\n").forEach(((t,n)=>{(t=t.trim()).length&&e(t,n)}))}class p{constructor(t){this.data=t}get name(){const t=/(\w+)(\s|$)/g.exec(this.data);return t?.[1]?t[1].toUpperCase():""}stringParam(){let t=/^\s*(\w+)\s"(.*)"/.exec(this.data);return t?.[2]?t[2]:(t=/^\s*\w+\s(.*)$/.exec(this.data),t?.[1]?t[1]:void 0)}param(t){return this.data.split(" ")[t]}}class d{onCommand(t,e){switch(e.name){case"TITLE":this.title=e.stringParam();break;case"PERFORMER":this.performer=e.stringParam()}}onNextState(t,e){return"FILE"===e.name?new y:this}}class y{onCommand(e,n){const r=[e.header.title,e.header.performer].filter((t=>t)),s=new t(r.join(" - "));e.archive.playlists.push(s)}onNextState(t,e){return"TRACK"===e.name?new E(t,e.param(1)):this}}class E{constructor(t,e){this.id=e??""+Math.random();const n={key:this.id,title:"",artist:""},r=t.archive.playlists[t.archive.playlists.length-1],s={key:n.key,collectionEntry:n,playedPublic:!0};r?.tracks.push(s),t.archive.collection[n.key]=n}playlist(t){return t.archive.playlists[t.archive.playlists.length-1]}playlistTrack(t){const e=this.playlist(t);return e.tracks[e.tracks.length-1]}collectionTrack(t){const e=this.playlistTrack(t);return t.archive.collection[e.key]}onCommand(t,e){const n=this.collectionTrack(t);switch(e.name){case"TITLE":n.title=e.stringParam()??"";break;case"PERFORMER":n.artist=e.stringParam()??""}}onNextState(t,e){return"TRACK"===e.name?new E(t,e.param(1)):this}}const T="TRACK TITLE",h="ARTIST",g="#";function f(t,e,n){const r=e[t];return void 0!==r&&n[r]?n[r]:null}const k=[class{static format="Traktor";static extensions=[".nml"];parseXML(t){const e=(new DOMParser).parseFromString(t,"text/xml");return 0!==e.getElementsByTagName("parsererror").length?null:e}supports(t){const e=this.parseXML(t);if(!e)return!1;return e.getElementsByTagName("NML").length>0}parse(t){const l=this.parseXML(t);return l?function(t){const l={collection:e(t),playlists:[],format:"Traktor NML"};return l.playlists=function(t,e){const l=t.querySelectorAll("NML PLAYLISTS NODE[TYPE='PLAYLIST']");return Array.prototype.map.call(l,(t=>{const l=new n(t.attributes.NAME?.value,[]);return l.tracks=Array.prototype.map.call(t.querySelectorAll("PLAYLIST > ENTRY"),((t,n)=>{const l={},o=t.getElementsByTagName("PRIMARYKEY")[0];l.key=o.attributes.KEY.value,l.collectionEntry=e[l.key];const i=t.getElementsByTagName("EXTENDEDDATA")[0];if(i){l.playedPublic=!!parseInt(i.attributes.PLAYEDPUBLIC.value);const t=parseInt(i.attributes.STARTTIME.value);l.startTime=c(t);const e=parseInt(i.attributes.STARTDATE.value);l.startDate={year:r(u=e),month:s(u),day:a(u)},l.startTimeJS=new Date(l.startDate.year,l.startDate.month,l.startDate.day,l.startTime.hours,l.startTime.minutes,l.startTime.seconds)}else l.playedPublic=!0;var u;return l})),l}))}(t,l.collection),l}(l):null}},class{static format="RekordBox";static extensions=[".xml"];parseXML(t){const e=(new DOMParser).parseFromString(t,"text/xml");return 0!==e.getElementsByTagName("parsererror").length?null:e}supports(t){const e=this.parseXML(t);if(!e)return!1;return e.getElementsByTagName("DJ_PLAYLISTS").length>0}parse(e){const n=this.parseXML(e);return n?function(e){if(!e.getElementsByTagName("DJ_PLAYLISTS").length)return null;const n={collection:u(e),playlists:[],format:"RekordBox"};return n.playlists=function(e,n){const r=e.querySelectorAll("DJ_PLAYLISTS > PLAYLISTS NODE[KeyType='0']");return Array.prototype.map.call(r,(e=>{const r=new t(e.attributes.Name.value,[]);return r.tracks=Array.prototype.map.call(e.getElementsByTagName("TRACK"),((t,e)=>{const r={key:t.attributes.Key.value,playedPublic:!0};return r.collectionEntry=n[r.key],r})),r}))}(e,n.collection),n}(n):null}},class{static format="M3U";static extensions=[".m3u8"];supports(t){return t.startsWith("#EXTM3U")}parse(e){return function(e){if(!e.startsWith("#EXTM3U"))return null;const n={collection:{},playlists:[],format:"M3U"},r=new t("Untitled Playlist");let s,a;return n.playlists.push(r),m(e,(t=>{const e=/^#EXTINF:(\d+),(([^-]*$)|(.*)( - )(.*))/g.exec(t);if(e&&e[1])s={key:"__TEMP__",title:e[6]||e[3]||"",artist:e[4]||""},a={key:s.key,playedPublic:!0,collectionEntry:s};else if(a&&s){const e=t;s.key=e,a.key=e,n.collection[e]=s,r.tracks.push(a)}})),n}(e)}},class{static format="RekordBox CUE";static extensions=[".cue"];supports(t){return t.startsWith("REM DATE ")}parse(t){return function(t){let e=new d;const n={archive:{collection:{},playlists:[],format:"CUE"},header:e};return function(t,e){m(t,((t,n)=>{const r=new p(t);e(r)}))}(t,(t=>{e.onCommand(n,t),e=e=e.onNextState(n,t)})),n.archive}(t)}},class{static format="RekordBox TXT";static extensions=[".txt"];supports(t){return t.trim().startsWith("#\t")}parse(e){const n={collection:{},playlists:[],format:"CUE"},r=new t;return function(t,e){let n={};m(t,((t,r)=>{const s=t.split("\t");0===r?n=s.reduce(((t,e,n)=>(t[e.toUpperCase()]=n,t)),n):e({key:f(g,n,s)??`${Math.random()}`,title:f(T,n,s)??"",artist:f(h,n,s)??""})}))}(e,(t=>{const e={key:t.key,collectionEntry:t,playedPublic:!0};n.collection[t.key]=t,r.tracks.length||n.playlists.push(r),r.tracks.push(e)})),n}}],I={INDEX:(t,e,n)=>n.replace("${INDEX}",e+1),INDEX_PADDED:(t,e,n)=>{const r=t.tracks.length.toString().length;return n.replace("${INDEX_PADDED}",(e+1).toString().padStart(r,"0"))},TITLE:(t,e,n)=>n.replace("${TITLE}",t.tracks[e].collectionEntry.title||"Unknown Title"),ARTIST:(t,e,n)=>n.replace("${ARTIST}",t.tracks[e].collectionEntry.artist||"Unknown Artist"),OFFSET:(t,e,n)=>{const r=t.tracks[e]?.timeOffsetString??"";return n.replace("${OFFSET}",r)}};function L(t){const e=[],n=function(){let t=document.getElementById("formatString").value;return 0===t.length&&(t="${INDEX}. ${TITLE} - ${ARTIST}"),t}();return e.push(t.name),t.tracks.map(((r,s)=>{return e.push((a=t,l=s,o=n,Object.keys(I).forEach((t=>{o=I[t](a,l,o)})),o));var a,l,o})),e.join("\n")}function S(){const t=function(t,e,n){const r=k.map((e=>{const n=new e;if(n.supports(t))return n})).filter((t=>t));return r.length?r[0].parse(t,e,n):null}(document.getElementById("archive").value);if(document.getElementById("errorResults").setAttribute("class","hidden"),document.getElementById("playlistResults").setAttribute("class","hidden"),!t)return function(t){document.getElementById("errorResults").setAttribute("class","");document.getElementById("errorMessage").innerText=t}("Sorry, we could not parse that file."),void(document.getElementById("trackList").innerText="No playlists found.");const e=document.getElementById("playlistsDropDown");e.replaceChildren(""),t.playlists.forEach(((t,n)=>{const r=document.createElement("option");t.name.trim().length?r.innerText=t.name:r.innerText=`Playlist ${n+1}`,r.playlist=t,e.appendChild(r)})),document.getElementById("playlistResults").setAttribute("class",""),A()}function A(){const t=document.getElementById("playlistsDropDown").selectedOptions[0],e=Math.max(1,document.getElementById("startTrackIndex").value)-1,n=document.getElementById("publicTracks").checked,r=t.playlist.filter(e,n);document.getElementById("trackList").textContent=L(r)}function v(t){const e=t.target.files[0];if(!e)return;const n=new FileReader;n.readAsText(e),n.onload=function(){document.getElementById("archive").value=n.result.toString(),S()},t.target.value=""}function B(){const t=document.getElementById("trackList").innerText;navigator.clipboard.writeText(t)}window.addEventListener("DOMContentLoaded",(()=>{document.getElementById("archiveFile").addEventListener("change",v,!1),document.getElementById("formatString").addEventListener("input",A,!1),document.getElementById("startTrackIndex").addEventListener("input",A,!1),document.getElementById("publicTracks").addEventListener("input",A,!1),document.getElementById("copyToClipboard").addEventListener("click",B,!1),document.getElementById("playlistsDropDown").addEventListener("change",A,!1);const t=Object.keys(I).map((t=>`\${${t}}`)).join(" ");document.getElementById("fieldList").textContent=document.getElementById("fieldList").textContent+t;const e=k.map((t=>t.extensions)).flat();document.getElementById("archiveFile").accept=e.join(",")}));
//# sourceMappingURL=index.b18fec81.js.map
