import "./Home.css";
import { motion } from 'framer-motion'
import { useState, useEffect, useRef} from 'react'


export default function Home({changePage}) {
    const game1_URL = "https://www.giantbomb.com/a/uploads/original/20/201266/3703881-2913818626-EGS_SplitFiction_HazelightStudiosAB_S2_1200x1600-d626c4ebc51d7b5bacbfd015368b674c.jpg";
    const game2_URL = "https://www.giantbomb.com/a/uploads/original/35/355500/3707025-repo.jpeg";
    const game3_URL = "https://www.giantbomb.com/a/uploads/original/20/201266/3541054-8609480099-co5zi.png";
    const game4_URL = "https://www.giantbomb.com/a/uploads/original/33/338034/3578206-6730485772-EN_EGST_StorePortrait_1200x1600_1200x1600-a010fb65414cbbc48e055d1f6eac41b8.jpg";
    const game5_URL = "https://www.giantbomb.com/a/uploads/original/20/201266/3615240-3608718123-skobe.jpg";
    const game6_URL = "https://www.giantbomb.com/a/uploads/original/8/87790/3664593-box_bal.png";

    const recomendados = [
        {id:'1', image:'https://www.giantbomb.com/a/uploads/original/24/240391/3355540-co1rgi.png'},
        {id:'2', image:'https://www.giantbomb.com/a/uploads/original/8/87790/3005645-box_celeste.png'},
        {id:'3', image:'https://www.giantbomb.com/a/uploads/original/8/87790/2952215-box_cuphead.png'},
        {id:'4', image:'https://www.giantbomb.com/a/uploads/original/8/87790/3079803-box_an.png'},
        {id:'5', image:'https://www.giantbomb.com/a/uploads/original/8/87790/2993638-box_ahit.png'},
        {id:'6', image:'https://www.giantbomb.com/a/uploads/original/8/87790/3140541-box_p2.png'},
        {id:'7', image:'https://www.giantbomb.com/a/uploads/original/20/201266/3655838-2077891619-EGS_ItTakesTwo_Hazelight_S2_1200x1600-5c82de2d2e21a841dd06ec27e082777e_1200x1600-5c82de2d2e21a841dd06ec27e082777e.jpg'},
        {id:'8', image:'https://www.giantbomb.com/a/uploads/original/0/8169/2600454-81bh2nkwxxl._sl1500_.jpg'},
        {id:'9', image:'https://www.giantbomb.com/a/uploads/original/20/201266/3532465-2909474649-co4jn.png'},
        {id:'10', image:'https://www.giantbomb.com/a/uploads/original/33/338034/3381991-2584519888-libra.jpg'}
    ]

    const carousel = useRef();
    const [width, setWidth] = useState(0)

    useEffect(() => {
        console.log(carousel.current?.scrollWidth,carousel.current?.offsetWidth)
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }, [])

    return (
        <>
        <title>MyPoliGame - A Video Game Collection Tracker</title>
        <div className="background">
            <img src={game1_URL} alt="Game 1"/>
            <img src={game2_URL} alt="Game 2"/>
            <img src={game3_URL} alt="Game 3"/>
            <img src={game4_URL} alt="Game 4"/>
            <img src={game5_URL} alt="Game 5"/>
            <img src={game6_URL} alt="Game 6"/>
        </div>
        <div style={{ height: '35vh' }}></div>
        <motion.img className="Logo" src="./image/Logo.png" animate={{x: 150}}/>
        <h2>O que é o MyPoligame?</h2>
        <p className="resposta">O MyPoliGame é um lugar para montar sua coleção de jogos, onde você pode avaliar e listar os jogos de qualquer plataforma
            para compartilhar com seus amigos e com a comunidade seus gostos e seus feedbacks com a comunidade do jogo. </p>

        <h2>Fique atento a lista de jogos recomendados</h2>
        <p className="resposta">Receba sugestões de jogos recomendados pela home do site</p>
        <div className="recomendado">     
            <h2>Recomendados:</h2>
            <div>
                    <motion.div className='carousel' whileTap={{cursor: 'grabbing '}}>
                        <motion.div 
                        className='inner'
                        drag="x"
                        dragConstraints={{right:0 ,left: -width}}
                        initial={{x:100}}
                        animate={{x:0}}
                        transition={{duration:0.8}}
                        >
                            {recomendados.map( (image) => (
                                <motion.div className="item" key={image.id}> 
                                    <img src={image.image} alt='Texto alt'/>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
            </div>
        </div>   
        <div>
            <div>
                <h2>Acompanhe o crescimento da sua coleção pessoal de jogos</h2>
                <p className="resposta">Registre todo e qualquer jogo que você jogou desde os mais antigos e inusitados até os mais recentes e famosos. 
                   Crie uma lista de jogos que você pretende jogar para sempre ter uma vasta quantidade de opções após terminar o jogo atual.</p>
            </div>
            <div className="recomendado2">
                <h2 className="center">Lista de jogos</h2>
                <img 
                src="./image/List.png"
                alt="Erro"
                />
            </div>
        </div>

        <div>    
            <div>
                <h2>Crie e organize diversas listas</h2>
                <p className="resposta">Registre todo e qualquer jogo que você jogou ou está jogando desde os mais antigos e inusitados até os mais recentes e famosos. 
                   Crie uma lista de jogos que você pretende jogar para sempre ter uma vasta quantidade de opções após terminar o jogo atual.
                   Veja os jogos que você viu que não valem a pena no meio do percurso</p>
            </div>
            <div className="recomendado2">
                <h2 className="center">Lista de Desejos</h2>
                <img 
                    src="./image/WishList.png"
                    alt="Erro"
                    />
            </div>
        </div>
        </>
    );
}
