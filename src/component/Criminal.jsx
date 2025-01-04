import { Descriptions } from 'antd';
import useOfficesStore from '../store/offices';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useBreadcrumb } from './BreadCrumb';
import { useMediaQuery } from "react-responsive";

export default function Criminal() {

    const { statesName, uid } = useParams();
    const { getCriminals } = useOfficesStore();
    const criminal = getCriminals(statesName, uid);
    const { setBreadcrumbItems } = useBreadcrumb();
    const isMobile = useMediaQuery({ maxWidth: 768 }); // Définit un breakpoint pour les téléphones
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    const columnCount = isMobile ? 8 : isTablet ? 16 : 24;
    const navigate = useNavigate();

    useEffect(() => {
        setBreadcrumbItems([{ title: <span onClick={() => handleClick("/")}>Map</span> }, { title: <span onClick={() => handleClick("/" + statesName)}> {statesName}</span> }, { title: uid }]);
    }, [statesName, uid, setBreadcrumbItems]);

    const handleClick = (path) => navigate(path);

    const info_criminal = [
        {
            key: '1',
            label: "aliase",
            children: criminal.aliases && Array.isArray(criminal.aliases)
                ? criminal.aliases.join(", ")
                : "⬛⬛⬛⬛⬛",
            span: 8
        },
        {
            key: '2',
            label: "Age minimum",
            children: criminal.age_min || "⬛⬛",
            span: 8
        },
        {
            key: '3',
            label: "Age maximum",
            children: criminal.age_max || "⬛⬛",
            span: 8
        },
        {
            key: '4',
            label: "caution",
            children: criminal.caution || "⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ ⬛⬛ ⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛ ⬛⬛⬛⬛⬛",
            span: 24,
        },
        {
            key: '5',
            label: "description",
            children: criminal.description || "⬛⬛ ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
            span: 24,
        },
        {
            key: '6',
            label: "sex",
            children: criminal.sex || "⬛⬛⬛⬛⬛",
            span: 12
        },
        {
            key: '7',
            label: "Classification",
            children: criminal.person_classification || "⬛⬛⬛⬛⬛",
            span: 12
        },
        {
            key: '8',
            label: "Details",
            children: criminal.details || "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
            span: 24
        },
        {
            key: '9',
            label: "remarks",
            children: criminal.remarks || "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
        }
    ]
    const info_discription = [
        {
            key: '1',
            label: "eyes color",
            children: criminal.eyes || "⬛⬛⬛⬛",
        },
        {
            key: '2',
            label: "hair",
            children: criminal.hair || "⬛⬛⬛⬛⬛⬛",
        },
        {
            key: '3',
            label: 'height max',
            children: criminal.height_max || "⬛⬛⬛",
        },
        {
            key: '4',
            label: "height min",
            children: criminal.height_min || "⬛⬛⬛"
        },
        {
            key: '5',
            label: "race",
            children: criminal.race || "⬛⬛⬛⬛⬛⬛"
        },
        {
            key: '6',
            label: "weight",
            children: criminal.weight || "⬛⬛⬛⬛⬛"
        }
    ]


    return (
        <>
            <Descriptions title="Criminal info" bordered items={info_criminal} column={columnCount} />
            <Descriptions title="Description info" bordered items={info_discription} />
        </>
    )
}
