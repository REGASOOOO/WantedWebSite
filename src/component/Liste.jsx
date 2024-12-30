import { Carousel, Card } from 'antd';
import useOfficesStore from '../store/offices';
import { useParams } from 'react-router-dom';

const { Meta } = Card; // Importation de Meta depuis Card

export default function Liste() {
    const { statesName } = useParams();
    const { getOfficeStates } = useOfficesStore();

    // Récupération des données directement dans le rendu
    const state = getOfficeStates(statesName) || {}; // Garantit que 'state' est défini si non trouvé

    return (
        <>
            <h1>Les criminels recherchés dans l'état de : {statesName}</h1>

            <Carousel arrows infinite={false} style={{ width: '70%' }}>
                {state &&
                    Object.keys(state).map((cityKey) => {
                        const city = state[cityKey];
                        if (typeof city === "object" && city !== null && "data" in city) {
                            return city.data.map((item) => (
                                <Card
                                    key={item.uid}
                                    hoverable
                                    
                                    style={{width: '20%' , margin: '0 auto' }}
                                    cover={
                                        <img
                                            alt="criminal"
                                            src={item.images[0]?.large || "https://bibliojeu.net/images/edition/inconnu.png"}
                                        />
                                    }
                                >
                                    <Meta
                                        title={item.aliases || "Inconnu"}
                                        description={item.description || "Pas de description"}
                                    />
                                </Card>
                            ));
                        }
                        return null;
                    })}
            </Carousel>
            <br />
        </>
    );
}