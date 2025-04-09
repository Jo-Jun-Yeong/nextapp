"use client"

import { useRouter } from "next/navigation";

export default function Create(){

    // client Component에서만 사용 가능
    //사용자에게 정보를 받고 db에 정보입력 후 해당 개시글로 이동
const router = useRouter();

    return(
        <form onSubmit={(e)=>{
            e.preventDefault();
            const title=e.target.title.value;
            const body=e.target.body.value;
            const options = {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch(process.env.NEXT_PUBLIC_API_URL +'topics', options)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                const lastid = result.id;
                //방금 생성한 글로 리디렉션
                router.push(`/read/${lastid}`);
                router.refresh();
                
            })
        }}>
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create"/>
            </p>
        </form>
    )
}