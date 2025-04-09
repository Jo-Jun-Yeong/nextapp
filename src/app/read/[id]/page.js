export default async function Read({params}){
const awaitParams = await params;
const resp = await fetch(`http://localhost:9999/topics/${awaitParams.id}`, {cache: 'no-store'});
const topic = await resp.json();

    return(
        <>
            <h2> {topic.title}</h2>
            
            {topic.body}
            
        </>

    )
}