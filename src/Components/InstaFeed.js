
export function InstaFeed(props) {

    function timeSince(date) {

        var seconds = Math.floor((new Date() - new Date(date)) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }

    function mapInstaImages(){
        if(props.instaPostData){
            return props.instaPostData.map((postObj, index) => {return (
                <li key={index}>
                    <div className="news-feed-image-container" style={{backgroundImage: `url(${postObj.url})`}}>
                    </div>
                    <p>{postObj.caption}</p>
                    <p>{'posted ' + timeSince(postObj.timestamp) + ' ago'}</p>
                </li>
            )
            })
        }
    }

    return(
        <div>
            <h1>Instagram Feed</h1>
            <ul className="news-feed-container">{mapInstaImages()}</ul>
        </div>
        
    )
}