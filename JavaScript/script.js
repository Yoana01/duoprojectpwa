//See if the browser supports Service Workers, if so try to register one
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service-worker.js").then(function(registering){
      // Registration was successful
      console.log("Browser: Service Worker registration is successful with the scope",registering.scope);
    }).catch(function(error){
      //The registration of the service worker failed
      console.log("Browser: Service Worker registration failed with the error",error);
    });
  } else {
    //The registration of the service worker failed
    console.log("Browser: I don't support Service Workers :(");
  }


  //Asking for permission with the Notification API
if(typeof Notification!==typeof undefined){ //First check if the API is available in the browser
	Notification.requestPermission().then(function(result){ 
		//If accepted, then save subscriberinfo in database
		if(result==="granted"){
			console.log("Browser: User accepted receiving notifications, save as subscriber data!");
			navigator.serviceWorker.ready.then(function(serviceworker){ //When the Service Worker is ready, generate the subscription with our Serice Worker's pushManager and save it to our list
				const VAPIDPublicKey="BANaopxbv1fa31NNigy3CaCNCtZezF0Ra6rZSxppT-gHWPjJiwA1zrFXhNl1Lb47mpRb3cTz3Z4w-vGhgkKvZdw"; // Fill in your VAPID publicKey here
				const options={applicationServerKey:VAPIDPublicKey,userVisibleOnly:true} //Option userVisibleOnly is neccesary for Chrome
				serviceworker.pushManager.subscribe(options).then((subscription)=>{
          //POST the generated subscription to our saving script (this needs to happen server-side, (client-side) JavaScript can't write files or databases)
					let subscriberFormData=new FormData();
					subscriberFormData.append("json",JSON.stringify(subscription));
					fetch("./data/saveSubscription.php",{method:"POST",body:subscriberFormData});
				});
			});
		}
	}).catch((error)=>{
		console.log(error);
	});
}


//   for having custom button for installing
//   let installPrompt; //Variable to store the install action in
//   let btn = document.getElementsById("install-button")
// window.addEventListener("beforeinstallprompt",(event)=>{	
// 	event.preventDefault(); //Prevent the event (this prevents the default bar to show up)
// 	installPrompt=event; //Install event is stored for triggering it later
// 	//...do something here to show your install button
// 	btn.style.visibility = "visible"
// });

// const installButton = document.getElementById("install-button");

// installButton.addEventListener("click", () => {
//     //Recognize the install variable from before?
// 	installPrompt.prompt();
// 	//..Put code here that hides your install button
// 	btn.style.visibility = "hidden"
// 	installPrompt.userChoice.then((choiceResult)=>{
// 		//Hide the install button here again
// 		btn.style.visibility = "hidden"
// 		if(choiceResult.outcome!=="accepted"){
// 		//..If it was not accepted to install than show the install button again
// 		btn.style.visibility = "visible"
// 		}
// 		installPrompt=null;
// 	});
// });