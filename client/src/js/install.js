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
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;//

  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;//
});
