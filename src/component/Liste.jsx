import { useState, useEffect } from 'react';
import { Carousel, Card, Button, Modal, QRCode } from 'antd';
import useOfficesStore from '../store/offices';
import { useParams, useNavigate } from 'react-router-dom';
import { useBreadcrumb } from './BreadCrumb';

const { Meta } = Card;

export default function Liste() {
    const { statesName } = useParams();
    const { getOfficeStates } = useOfficesStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linkPdf, setLinkPdf] = useState('');
    const navigate = useNavigate();
    const { setBreadcrumbItems } = useBreadcrumb();


    useEffect(() => {
        setBreadcrumbItems([{ title: <span onClick={() => handleClick("/")}>Map</span > }, { title: statesName }]);
    }, [setBreadcrumbItems, statesName]);

    const handleClick = (path) => navigate(path);

    const handleView = (uid) => navigate('/' + statesName + '/' + uid);

    const handleQr = (url) => {
        console.log(url);
        setIsModalOpen(true);
        setLinkPdf(url);
    }


    const handleOk = () => setIsModalOpen(false);


    const state = getOfficeStates(statesName) || {};

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
                                            <Meta
                                                title={item.aliases && Array.isArray(item.aliases)
                                                    ? item.aliases.join(", ")
                                                    : "Aucun alias disponible."}
                                                description={item.description || "Aucune description disponible"}
                                            />
                                            <div className='action-button'>
                                                <Button type="primary" onClick={() => handleView(item.uid)}>
                                                    View More
                                                </Button>
                                                <Button type="primary" onClick={() => handleQr(item.files[0].url)}>
                                                    Qrcode
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            ));
                        }
                        return null;
                    })}
            </Carousel>
            <br />
            <Modal title="Scan the QRcode" open={isModalOpen} onCancel={handleOk} onOk={handleOk}>
                {isModalOpen ? (
                    <QRCode value={linkPdf} />
                ) : (
                    "Loading data"
                )}
            </Modal>
        </>
    );
}
