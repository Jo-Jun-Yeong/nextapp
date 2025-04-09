export default async function Read({params}){
const awaitParams = await params;
const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${awaitParams.id}`, {cache: 'no-store'});
const topic = await resp.json();

    return(
        <>
            <h2> {topic.title}</h2>
            
            {topic.body}
            
        </>

    )
}