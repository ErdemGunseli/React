// If the user also visits /cars/123, then the [id].js file within the cars directory will be run.
// The square brackets in the file name indicate that this is a dynamic route.
// We can access the id of the car by using the useRouter hook from next/router.

import { useRouter } from "next/router";
// Importing the head component allows us to add metadata to the page.
import Head from "next/head";

export default function CarDetails({ car }) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
               <title>{car.color} {car.id}</title> 
            </Head>
            <h1>Hello {id}</h1>
            <img src={car.image} />
        
        </>
    );
}


/* This function is used to fetch static data at build time and generate a static HTML for that page.
It allows us to specify the properties that should be passed to the page component.
*/
// export async function getStaticProps({ params }) { // params refers to the path parameter in the URL.


/* Instead, implementing getServerSideProps will fetch the data at request time.
So we will be utilising SSR (Server Side Rendering) instead of SSG (Static Site Generation).
The code can remain exactly the same as getStaticProps.
It does the exact same thing, but with each request instead of at build time.
*/
export async function getServerSideProps({ params }) { // params refers to the path parameter in the URL.
    const request = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await request.json(); // Retrieving the json file that has the same name as the id.

    return {
        props: { car: data}
    }
}


/* If we are using getServersideProps, then we do not need to implement getStaticPaths:

export async function getStaticPaths() {
    Next needs to know how many pages it needs to render since this is a dynamic route.
    In order to pre-render all the pages corresponding to the car IDs, Next needs to know all the possible values for the ID.
    To do so, we can implement this function to return an array of all the possible values for the ID.
    For this project, all the possible values are stored in the cars.json file.
    
   const request = await fetch('http://localhost:3000/cars.json');
    const data = await request.json();

    // Transforming the array of IDs into an array of objects.
    const paths = data.map(car => {
        return {params: {id: car}}
    })

    return {
        paths,
        fallback: false // If someone goes to a page with an ID that is not included in paths, then Next will return a 404 page.
    };
}

*/