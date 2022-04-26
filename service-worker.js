const cacheName="cacheName";
//Just take into account that the "files" below are request-url's and not filenames perse. So for your root of your website yous should include "./" and if you use my site (or another plain HTML-site) also "index.html". If you use a server-side language and have friendly url's that could be something like "news/this-is-a-newsarticle/".
const appFiles=[
	"manifest.json",
	"JavaScript/script.js",
	"css/style.css",
  "css/portfolio.css", 
  "css/offline.css", 
  "offline.html",
  "portfolio.html",
  "images/logo.png",
  "images/offline background.gif",
  "images/menu-icons/Home.svg",
  "images/menu-icons/Medal.svg",
  "images/menu-icons/Person.svg",
  "images/menu-icons/Personal Growth.svg",
  "images/menu-icons/Plus +.svg",
  "images/pictures-for-thumbnails/Rectangle 9.png",
  "images/pictures-for-thumbnails/Rectangle 8.png",
  "images/pictures-for-thumbnails/Rectangle 11.png", 
  "images/pictures-for-thumbnails/Rectangle 13.png",
  "images/pictures-for-thumbnails/Rectangle 14.png",
  "images/pictures-for-thumbnails/Rectangle 15.png",
  "images/profiles/profile.jfif",
  "icon-512x512.png",
  "icon-384x384.png",
  "icon-256x256.png",
  "icon-192x192.png"
];


self.addEventListener("install",(installing)=>{
  console.log("Service Worker: I am being installed, hello world!");
  //Put important offline files in cache on installation of the service worker
  installing.waitUntil(
  caches.open(cacheName).then((cache)=>{
    console.log("Service Worker: Caching important offline files");
    return cache.addAll(appFiles);
  })
);
});

self.addEventListener("activate",(activating)=>{	
  console.log("Service Worker: All systems online, ready to go!");
});

self.addEventListener("fetch",(fetching)=>{   
  console.log("Service Worker: User threw a ball, I need to fetch it!");
  fetching.respondWith(
    caches.match(fetching.request.url).then((response)=>{
      console.log("Service Worker: Fetching resource "+fetching.request.url);
      return response||fetch(fetching.request).then((response)=>{
        console.log("Service Worker: Resource "+fetching.request.url+" not available in cache");
        return caches.open(fetching).then((cache)=>{
          console.log("Service Worker: Caching (new) resource "+fetching.request.url);
         cache.put(fetching.request,response.clone());
          return response;
        });
      }).catch(function(){      
        console.log("Service Worker: Fetching online failed, HAALLPPPP!!!");
        //Do something else with the request (for example: respond with a different cached file)
        return caches.match("offline.html")
      })
    })
  );
});

self.addEventListener("push",(pushing)=>{
  if(pushing.data){
  pushdata=JSON.parse(pushing.data.text());		
    console.log("Service Worker: I received this:",pushdata);
    if((pushdata["title"]!="")&&(pushdata["message"]!="")){			
      const options={ body:pushdata["message"] }
      self.registration.showNotification(pushdata["title"],options);
      console.log("Service Worker: I made a notification for the user");
    } else {
      console.log("Service Worker: I didn't make a notification for the user, not all the info was there :(");			
    }
  }
    console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
})
  