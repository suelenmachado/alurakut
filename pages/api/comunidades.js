import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '7dcc51c40eef0fe4ca8a9154d50ebd';
        const client = new SiteClient(TOKEN);
    
    const registroCriado = await client.items.create({
        itemType: "967570",
        ...request.body,
        // title: "Comunidade de teste",
        // imageUrl: "https://github.com/suelenmachado.png",
        // creatorSlug: 'suelen'
    })

    console.log(registroCriado);

    response.json({
        dados: 'Algum dado',
        registroCriado: registroCriado,
    })
    return;
}}
