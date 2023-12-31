const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// Function to show the install button when the PWA installation prompt is triggered
const showInstallButton = (event) => {
  // Storing the PWA installation prompt event for deferred use
  window.deferredPrompt = event;
  
  // Removing the 'hidden' class from the install button element to make it visible
  butInstall.classList.remove('hidden');
};



// TODO: Implement a click event handler on the `butInstall` element
// Function to handle the user click on the custom install button for PWA installation
const handleInstallClick = async () => {
  
  // Get the stored PWA installation prompt event from the window object
  const promptEvent = window.deferredPrompt;

  // Check if the prompt event is available
  if (!promptEvent) {
    // If the prompt event is not available, return without doing anything
    return;
  }

  // Show the PWA installation prompt to the user
  await promptEvent.prompt();

  // Reset the stored prompt event to null since it can only be used once
  window.deferredPrompt = null;

  // After the prompt has been shown and handled, hide the install button again
  butInstall.classList.add('hidden');
};


// TODO: Add an handler for the `appinstalled` event
// Function to clear the stored PWA installation prompt event
const clearDeferredPrompt = () => {
  // Set the window.deferredPrompt to null, effectively clearing the stored prompt event
  window.deferredPrompt = null;
};

// Event listener to listen for the "beforeinstallprompt" event which is triggered when a PWA installation prompt is available
window.addEventListener('beforeinstallprompt', showInstallButton);

// Event listener for the custom install button click, which initiates the PWA installation prompt
butInstall.addEventListener('click', handleInstallClick);

// Event listener to listen for the "appinstalled" event which is triggered when the PWA is successfully installed
window.addEventListener('appinstalled', clearDeferredPrompt);
