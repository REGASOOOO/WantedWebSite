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

            <Carousel className="custom-carousel" arrows infinite={false}>
                {state &&
                    Object.keys(state).map((cityKey) => {
                        const city = state[cityKey];
                        if (typeof city === "object" && city !== null && "data" in city) {
                            return city.data.map((item, index) => (
                                <div key={index} className="custom-carousel-item">
                                    <div className="custom-card">
                                        <Card
                                            cover={
                                                <img
                                                    alt={item.uid || "Inconnu"}
                                                    src={item.images[0].original || ""}
                                                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                                                />
                                            }

                                        >
                                            <Action>

                                            </Action>
                                            <Meta
                                                title={item.aliases && Array.isArray(item.aliases)
                                                    ? item.aliases.join(", ")
                                                    : "Aucun alias disponible."}
                                                description={item.description || "Aucune description disponible"}
                                            />
                                        </Card>
                                    </div>
                                </div>
                            ));
                        }
                        return null; // Retourne null si aucune donnée valide
                    })}
            </Carousel>
            <br />
        </>
    );
}