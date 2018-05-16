const publicVapidKey = 'BFeMUcHVX9UfayJZrgsXcSO5SoownE061_ozvRo9BasiTGFQEVajs_ZOByGcbp4CoiTnupHunTWO8X8SSXiR_Tc';

// Check for service worker
if ('serviceWorker' in navigator) {
  send().catch(err => console.log(err))
}

// Register service worker and push, and send push
async function send() {
  // Register Service Worker
  console.log('Registering service worker...')
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  })
  console.log('Service Worker Registered.')

  // Register Push
  console.log('Registering Push...')
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })
  console.log('Push Registered...');

  // Send Pust Notification
  console.log('Sending Push...')
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  })
  console.log('Push sent...')
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// const vapidPublicKey = '<Your Public Key from generateVAPIDKeys()>';
// const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

// registration.pushManager.subscribe({
//   userVisibleOnly: true,
//   applicationServerKey: convertedVapidKey
// });