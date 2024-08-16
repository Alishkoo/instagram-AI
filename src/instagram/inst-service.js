import 'dotenv/config';
import {IgApiClient} from 'instagram-private-api';
import {createClient} from 'pexels';

dotenv.config();

const client = createClient(process.env.PEXELS_API);

async function getPhoto(photo_keywords) {
    try{
        const response = await client.videos.search({ photo_keywords, orientation: "portrait" });
    }catch(err){
        console.log(err);
    }
}

const postToInstagram = async () => {

}