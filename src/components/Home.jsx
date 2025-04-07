import "./Home.css";
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const todasAsImagens = [
    'https://www.giantbomb.com/a/uploads/original/24/240391/3355540-co1rgi.png',
    'https://www.giantbomb.com/a/uploads/original/8/87790/3005645-box_celeste.png',
    'https://www.giantbomb.com/a/uploads/original/8/87790/2952215-box_cuphead.png',
    'https://www.giantbomb.com/a/uploads/original/8/87790/3079803-box_an.png',
    'https://www.giantbomb.com/a/uploads/original/8/87790/2993638-box_ahit.png',
    'https://www.giantbomb.com/a/uploads/original/8/87790/3140541-box_p2.png',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3655838-2077891619-EGS_ItTakesTwo_Hazelight_S2_1200x1600-5c82de2d2e21a841dd06ec27e082777e_1200x1600-5c82de2d2e21a841dd06ec27e082777e.jpg',
    'https://www.giantbomb.com/a/uploads/original/0/8169/2600454-81bh2nkwxxl._sl1500_.jpg',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3532465-2909474649-co4jn.png',
    'https://www.giantbomb.com/a/uploads/original/33/338034/3381991-2584519888-libra.jpg',
    'https://www.giantbomb.com/a/uploads/original/24/240391/3355540-co1rgi.png',
    'https://www.giantbomb.com/a/uploads/original/0/1992/3716946-screenshot2025-04-02at11.48.22%E2%80%AFam.png',
    'https://www.giantbomb.com/a/uploads/original/8/87790/3023792-box_ml.png',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3593754-5514229e3a28.jpg',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3536208-f5ebad930a2f6eb715579a056807033f.png',
    'https://www.giantbomb.com/a/uploads/original/0/1992/3587046-5466182583-9edb6.jpg',
    'https://www.giantbomb.com/a/uploads/original/0/1992/3591121-8948250288-icon_.png',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3534937-1484271343-co1ni.png',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3546420-21872ec5d097.png',
    'https://www.giantbomb.com/a/uploads/original/0/9517/2815652-1200x630bf.jpg',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3534685-lies_of_p.png',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3718634-berserker.jpg',
    'https://www.giantbomb.com/a/uploads/original/8/87790/3081870-box_ds3.png',
    'https://www.giantbomb.com/a/uploads/original/8/87790/3046323-box_ssdt.png',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3532465-2909474649-co4jn.png',
    'https://www.giantbomb.com/a/uploads/original/0/3699/2734931-bloodborne%20v5.jpg',
    'https://www.giantbomb.com/a/uploads/original/8/87790/2171285-box_pkmnpv.png',
    'https://www.giantbomb.com/a/uploads/original/0/976/2068104-pokemon_whack.jpg',
    'https://www.giantbomb.com/a/uploads/original/33/338034/3295700-0880306823-EGS_GenshinImpact_miHoYoLimited_S2_1200x1600-c12cdcc2cac330df2185aa58c508e820.jpg',
    'https://www.giantbomb.com/a/uploads/original/8/87790/3029623-box_oc2.png',
    'https://www.giantbomb.com/a/uploads/original/33/338034/3368834-6036509858-libra.jpg',
    'https://www.giantbomb.com/a/uploads/original/8/87790/3019631-box_sv.png',
    'https://www.giantbomb.com/a/uploads/original/33/338034/3345861-0023135362-EGS_SIFUStandardEdition_Sloclap_S4_1200x1600-32aca69d756abfcc25f8581942a6162b.jpg',
    'https://www.giantbomb.com/a/uploads/original/0/7369/624305-main_menu.png',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3699618-3374044048-co4wd.jpg',
    'https://www.giantbomb.com/a/uploads/original/8/82063/2863872-pmcs.jpg',
    'https://www.giantbomb.com/a/uploads/original/0/1992/2848306-cotd_email_1440429715_00063.jpg',
    'https://www.giantbomb.com/a/uploads/original/8/87790/3140522-box_ets2.png',
    'https://www.giantbomb.com/a/uploads/original/8/87790/2994875-box_terr.png',
    'https://www.giantbomb.com/a/uploads/original/38/385066/3029302-btd6_logo%2Bbg.jpg',
    'https://www.giantbomb.com/a/uploads/original/33/338034/3538835-3283403370-libra.jpg',
    'https://www.giantbomb.com/a/uploads/original/16/165036/3253895-pz.jpg',
    'https://www.giantbomb.com/a/uploads/original/8/87790/2578162-box_dstarve.png',
    'https://www.giantbomb.com/a/uploads/original/20/201266/3536967-3719316109-EGS_FallGuys_Mediatonic_S2_1200x1600-6ea0c038d654d7b6dc06bf86a1522f21.jpg',
    'https://www.giantbomb.com/a/uploads/original/8/87790/1633133-box_supermeatboy.png',
    'https://www.giantbomb.com/a/uploads/original/10/103881/2965875-2965793-5225871244-heade.jpg',
    'https://www.giantbomb.com/a/uploads/original/8/87790/2993644-box_uch.png',
    'https://www.giantbomb.com/a/uploads/original/8/87790/2991341-box_hff.png',
    'https://www.giantbomb.com/a/uploads/original/8/87790/1331136-ccrasher_box.png',

];



export default function Home({ changePage }) {
    const game1_URL = "https://www.giantbomb.com/a/uploads/original/20/201266/3703881-2913818626-EGS_SplitFiction_HazelightStudiosAB_S2_1200x1600-d626c4ebc51d7b5bacbfd015368b674c.jpg";
    const game2_URL = "https://www.giantbomb.com/a/uploads/original/35/355500/3707025-repo.jpeg";
    const game3_URL = "https://www.giantbomb.com/a/uploads/original/20/201266/3541054-8609480099-co5zi.png";
    const game4_URL = "https://www.giantbomb.com/a/uploads/original/33/338034/3578206-6730485772-EN_EGST_StorePortrait_1200x1600_1200x1600-a010fb65414cbbc48e055d1f6eac41b8.jpg";
    const game5_URL = "https://www.giantbomb.com/a/uploads/original/20/201266/3615240-3608718123-skobe.jpg";
    const game6_URL = "https://www.giantbomb.com/a/uploads/original/8/87790/3664593-box_bal.png";

    // const recomendados = [
    //     { id: '1', image: 'https://www.giantbomb.com/a/uploads/original/24/240391/3355540-co1rgi.png' },
    //     { id: '2', image: 'https://www.giantbomb.com/a/uploads/original/8/87790/3005645-box_celeste.png' },
    //     { id: '3', image: 'https://www.giantbomb.com/a/uploads/original/8/87790/2952215-box_cuphead.png' },
    //     { id: '4', image: 'https://www.giantbomb.com/a/uploads/original/8/87790/3079803-box_an.png' },
    //     { id: '5', image: 'https://www.giantbomb.com/a/uploads/original/8/87790/2993638-box_ahit.png' },
    //     { id: '6', image: 'https://www.giantbomb.com/a/uploads/original/8/87790/3140541-box_p2.png' },
    //     { id: '7', image: 'https://www.giantbomb.com/a/uploads/original/20/201266/3655838-2077891619-EGS_ItTakesTwo_Hazelight_S2_1200x1600-5c82de2d2e21a841dd06ec27e082777e_1200x1600-5c82de2d2e21a841dd06ec27e082777e.jpg' },
    //     { id: '8', image: 'https://www.giantbomb.com/a/uploads/original/0/8169/2600454-81bh2nkwxxl._sl1500_.jpg' },
    //     { id: '9', image: 'https://www.giantbomb.com/a/uploads/original/20/201266/3532465-2909474649-co4jn.png' },
    //     { id: '10', image: 'https://www.giantbomb.com/a/uploads/original/33/338034/3381991-2584519888-libra.jpg' }
    // ]
    function gerarRecomendados(quantidade) {
        const embaralhado = [...todasAsImagens].sort(() => 0.5 - Math.random());
        const selecionados = embaralhado.slice(0, quantidade);
        return selecionados.map((url, index) => ({ id: String(index + 1), image: url }));
    }


    const carouselRef = useRef();
    const innerRef = useRef();
    const [width, setWidth] = useState(0);
    const [recomendados, setRecomendados] = useState(() => gerarRecomendados(20)); // ou qualquer número de jogos




    useEffect(() => {
        const carouselWidth = carouselRef.current.offsetWidth;
        const innerWidth = innerRef.current.scrollWidth;
        setWidth(innerWidth - carouselWidth);
    }, []);



    return (
        <>
            <title>MyPoliGame - A Video Game Collection Tracker</title>
            <div className="background">
                <img src={game1_URL} alt="Game 1" />
                <img src={game2_URL} alt="Game 2" />
                <img src={game3_URL} alt="Game 3" />
                <img src={game4_URL} alt="Game 4" />
                <img src={game5_URL} alt="Game 5" />
                <img src={game6_URL} alt="Game 6" />
            </div>
            <div style={{ height: '35vh' }}></div>
            <motion.img className="Logo" src="./image/Logo.png" animate={{ x: 150 }} />
            <h2>O que é o MyPoligame?</h2>
            <p className="resposta">O MyPoliGame é um lugar para montar sua coleção de jogos, onde você pode avaliar e listar os jogos de qualquer plataforma
                para compartilhar com seus amigos e com a comunidade seus gostos e seus feedbacks com a comunidade do jogo. </p>

            <h2>Fique atento a lista de jogos recomendados</h2>
            <p className="resposta">Receba sugestões de jogos recomendados pela home do site</p>
            <div className="recomendado">
                <h2>Recomendados:</h2>
                <div>
                    <motion.div className='carousel' ref={carouselRef} whileTap={{ cursor: 'grabbing' }}>
                        <motion.div
                            className='inner'
                            ref={innerRef}
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {recomendados.map((image) => (
                                <motion.div className="item" key={image.id}>
                                    <img src={image.image} alt='Texto alt' />
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
