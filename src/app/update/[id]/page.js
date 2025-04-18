"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {

    /*
    Update를 위해서는 Create / Read 기능이 필요하다.
    Create와 동일한 폼을 위해 같은 형식의 form을 사용하고
    해당 글의 원본 글을 읽어와야하니 Read기능이 필요하다.
    */
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`)
            .then(resp => resp.json())
            .then(result => {
                setTitle(result.title);
                setBody(result.body);
                console.log(result);
            })
    },[])
    return (

        <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body })
            }
            fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, options)
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    const lastid = result.id;
                    // router.refresh();
                    router.push(`/read/${lastid}`);
                    //방금 생성한 글로 리디렉션
                    router.refresh();

                })
        }}>
            <p>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </p>
            <p>
                <textarea 
                    name="body" 
                    placeholder="body" 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}>
                </textarea>
            </p>
            <p>
                <input type="submit" value="update" />
            </p>
        </form>
    )
}