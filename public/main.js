var storage = firebase.storage(),
	storageRef = storage.ref(),
	userDirRef = '';
	user = firebase.auth().currentUser,
	currentFileName = '',
	ui = new firebaseui.auth.AuthUI(firebase.auth()),
	uiConfig = {
		callbacks: {
			signInSuccess: function(currentUser, credential, redirectUrl) {
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				
				initUserDir();
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

	
function initUserDir(){
	userDirRef = storageRef.child(user.uid);
}

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
	initUserDir();
  } else {
    // No user is signed in.
  }
});

$('.modal').modal();
$('.button-collapse').sideNav();

$("#saveForm").submit(function(e){
	e.preventDefault();
	e.stopPropagation();
	
	currentFileName = this.filename.value;
	
	$('.modal').modal('close');
});

$('.fileExplorerTrigger').click(function(){
  $('#fileExplorer').modal('open');
});

$(".downloadTrigger").click(function(){
  var blob = new Blob([$("textarea")[0].value],{"type":"text/plain"});
  
  var url = URL.createObjectURL(blob);
  
  var downloadName = currentFileName || "Untitled";
  
  $("#downloadLink").attr("href",url).attr("download",downloadName+".txt").click();
  
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