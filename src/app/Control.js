"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


export function Control(){
    const router = useRouter();
    const params = useParams();
    console.log("잘 나오는지 확인 해보자", params);
    const id = params.id;
    return(
      <ul>
        <li><Link href="/create">Create</Link></li>
        {id ? <>
            <li><Link href={`/update/${id}`}>Update</Link></li>
            <li><input type="button" value={"delete"} onClick={() => {
                const options = {method:'DELETE'}
                fetch('http://localhost:9999/topics/'+id, options)
                .then(resp => resp.json())
                .then(result=> {
                    //삭제 작업 후 '/'로 리디랙션
                    router.push('/');
                    router.refresh();
                });
            }}/></li>
        </> : null}

    </ul>
    );
  }