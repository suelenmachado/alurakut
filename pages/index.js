import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import styled from 'styled-components'
import MainGrid from '../src/components/Maingrid/index'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}>
      </img>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>

      </ul>
    </ProfileRelationsBoxWrapper>



  )
}

export default function Home(props) {
  const usuarioAleatorio = 'props.githubUser';
  const [comunidades, setComunidades] = React.useState([]);
  //const comunidades = comunidades[0];
  //const alteradorDeComunidades/setComunidades = comnidades[1];
  const githubUser = "suelenmachado";
  // const comunidades = ['alurakut'];
  console.log('Nosso teste', comunidades);
  const pessoasFavoritas = [
    'juunegreiros',
    'rafaballerini',
    'omariosouto',
    'peas',
    'marcobrunodev',
    'felipefialho'
  ]

  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function () {
    fetch('https://api.github.com/users/suelenmachado/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      })
    console.log('seguidores antes do return', seguidores);
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '7dcc51c40eef0fe4ca8a9154d50ebd',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
              title
              id
              imageUrl
              creatorSlug
        }
      }`})
    })
      .then((response) => response.json()) // pego o retorno e retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato)

      })
  }, [])
  console.log('seguidores antes do return', seguidores)

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/*<Box Style="grid-area:profileArea;">*/}
        <div className="profileArea" style={{ gridArea: " profileArea " }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div div className="welcomeArea" style={{ gridArea: " welcomeArea " }}>
          <Box>
            <h1 className="title">
              Bem vindo (a)
            </h1>

            <OrkutNostalgicIconSet>

            </OrkutNostalgicIconSet>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?
            </h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio,
              }
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/jason',
                },
                body: JSON.stringify(comunidade)
              })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.regristroCriado);
                  const comunidade = dados.regristroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })

            }}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?" name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input placeholder="Coloque uma URL para usarmos de capa" name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div div className="profileRelationsArea" style={{ gridArea: " profileRelationsArea " }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Comunidades({comunidades.length})

            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Amigos ({pessoasFavoritas.length})
            </h2>
                        <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} >
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>

        </div>
      </MainGrid>
    </>
  )
}

  export async function getServerSideProps(context){
    const cookies = nookies.get(context)
    const token = cookies.USER_TOKEN;
    const { githubUser } = jwt.decode(token);
    const{ isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth',{
      headers : {
        Authorization: token
      }
    })
    .then((resposta) => resposta.json())
    
    if (!isAuthenticated){
      return{
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }
    return {
      props: {
        githubUser
      }, //will be passed to the page component as props
    }
  }


