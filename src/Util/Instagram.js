/*let accessToken = 'IGQVJXOVg5R1ZAWWC1ZAYVBuQ05RTDVvVFdQdzRJX3UtRHJCM1BGb2Y4N3NQVDRFeE9FNFlDM3A4QVk5Tnh6YUdsSThsYmJua09BdV9NNXhyWkg2eS1VbjdQWTVEbHpSdy1BaTFPVndlaERmXzhxV2lUaAZDZD';

export async function getInstaData (onSuccess){
    try{
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,caption,media_url,timestamp,username&access_token=${accessToken}`);
        if(response.ok){
            const jsonResponse = await response.json();
            if(!jsonResponse.data.length) return [];
            onSuccess(jsonResponse.data.map(item => ({url: item.media_url, caption: item.caption, timestamp: item.timestamp, username: item.username })))
        }
     } catch(error){
        console.log(error);
     }
}*/

