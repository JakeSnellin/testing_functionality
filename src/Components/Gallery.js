
export function Gallery (props){

    const galleryImages = (
        <ul className="bio-gallery-container">
            {props.galleryImages}
        </ul>
    )

    return (
        <section>
            <h1>Gallery</h1>
            {galleryImages}
        </section>
    )
}