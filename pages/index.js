import styled from 'styled-components'
import MainGrid from '../src/components/Maingrid/index'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box >
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}>
      </img>

    </Box>
  )
}

export default function Home() {
  const githubUser = "suelenmachado";
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

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
        </div>
        <div div className="profileRelationsArea" style={{ gridArea: " profileRelationsArea " }}>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            Pessoas favoritas
            <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return(
                <li>
                  <a href={`/users/${itemAtual}`} key={itemAtual}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
                  </a>
                </li>
                 
                  )
              })}    
                 </ul> 
                     
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </div>
    </MainGrid>
    </>
    )
}
