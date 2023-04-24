import { useRouter } from "next/router";
export default function foo({ posts}){
    const router = new useRouter();
    const {id} = router.query;
    console.info('querywww', posts);
    return <h1>hello {id}</h1>
}

export async function loadPosts() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json()
  
    return data
  }

export async function getStaticProps() {
    // Instead of fetching your `/api` route you can call the same
    // function directly in `getStaticProps`
    
    const posts = await loadPosts()
  
    // Props returned will be passed to the page component
    return { props: { posts } }
  }
