import { useState } from 'react';
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
            <p>Les criminels recherchés dans l'état de : {statesName}</p>

            <Carousel arrows infinite={false}>
                {state &&
                    Object.keys(state).map((cityKey) => {
                        const city = state[cityKey];
                        if (typeof city === "object" && city !== null && "data" in city) {
                            return city.data.map((item, index) => (
                                <Card
                                    key={index} // Ajout d'une clé unique
                                    hoverable
                                    cover={
                                        <img
                                            alt="criminal"
                                            src={item.images[0]?.original || "https://via.placeholder.com/150"} // Image par défaut
                                        />
                                    }
                                >
                                    <Meta
                                        title={item.aliases || "Inconnu"} // Nom du criminel ou "Inconnu"
                                        description={item.description || "Pas de description"} // Description
                                    />
                                </Card>
                            ));
                        }
                        return null; // Retourne null si aucune donnée valide
                    })}
            </Carousel>
            <br />
        </>
    );
}