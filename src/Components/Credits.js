
export function Credits (props){
    return (
    <section>
        <h1>Credits</h1>
        <div className="credits" dangerouslySetInnerHTML={{__html: props.credits}}/>
    </section>
    )
}