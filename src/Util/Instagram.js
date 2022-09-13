
export async function getInstaData (onSuccess){
        fetch('https://feeds.behold.so/J7uMqxIw9c53S5063Cie')
            .then(data => data.json())
            .then(photos => {
            onSuccess(photos.map(item => ({
            url: item.mediaUrl,
            caption: item.caption,
            timestamp: item.timestamp
        })));
    });
  }

