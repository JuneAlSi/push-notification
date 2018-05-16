console.log('Service Worker Loaded')

self.addEventListener('push', e => {
  const data = e.data.json()
  console.log('Push received...')
  self.registration.showNotification(data.title, {
    body: 'Notified by June',
    icon: 'https://tbncdn.freelogodesign.org/393af496-8012-44b7-a16a-411d4395110f.png?1526445433911'
  });
})