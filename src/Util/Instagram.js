let accessToken = 'IGQVJVaXJMM2RJaGVCQmtRdG1GYV8tcGgxdjZA6UHFvNjRRNHl4emd3TTBXRTFqNjBHaTRDVVpxLWJSUXQ5MEtPSUdnQlUwVE9KR1VnbGI5S01mYm9vN2pMVUhlaXFId0VSSW1nSjRoR0pTUVJYSE15WAZDZD';

/*export async function getInstaData (){
        return fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=${accessToken}`).then(response => {
        return response.json();
    }).then(jsonResponse =>{
        return jsonResponse.data.map(item => item.media_url)
    })
}*/

export async function getInstaData (){
    try{
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,caption,media_url,timestamp,username&access_token=${accessToken}`);
        if(response.ok){
            const jsonResponse = await response.json();
            if(!jsonResponse.data.length) return [];
            return jsonResponse.data.map(item => ({url: item.media_url, caption: item.caption, timestamp: item.timestamp, username: item.username }))
        }
     } catch(error){
        console.log(error);
     }
}

