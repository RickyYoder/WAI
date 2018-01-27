var user = firebase.auth().currentUser,
	currentFileName = '',
	actions = [],
	ui = new firebaseui.auth.AuthUI(firebase.auth()),
	uiConfig = {
		callbacks: {
			signInSuccess: function(currentUser, credential, redirectUrl) {
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				return false;
			},
			uiShown: function() {
				// The widget is rendered.
				// Hide the loader.
				//document.getElementById('loader').style.display = 'none';
			}
		},
		// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		signInFlow: 'popup',
		signInSuccessUrl: '',
		signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			firebase.auth.GoogleAuthProvider.PROVIDER_ID
		],
		// Terms of service url.
		tosUrl:''
	};


firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
.then(function() {
	//existing and future auth states are going to be persistent even when the window/browser is closed
	ui.start('#firebaseui-auth-container', uiConfig);
})
.catch(function(error) {
	//handling errors
	console.log(error);
});

firebase.auth().onAuthStateChanged(function(u) {
  if (u) {
    // User is signed in.
	user = u;
  } else {
    // No user is signed in.
  }
});

$('.modal').modal();
$('.button-collapse').sideNav();

$('.fileExplorerTrigger').click(function(){
  $('#fileExplorer').modal('open');
});

$(".downloadTrigger").click(function(){
  var blob = new Blob([$("textarea")[0].value],{"type":"text/plain"});
  
  var url = URL.createObjectURL(blob);
  
  $("#downloadLink").attr("href",url).attr("download","myFile.txt").click();
  
  document.getElementById('downloadLink').click();
});

$(".saveTrigger").click(function(){
  if(user) $('#saveFileModal').modal('open');
  else{
	  $('#authContainer').modal('open');
	 
  }
});

$('.close').click(function(){
  $('.modal.open').modal('close');
});