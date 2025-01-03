import { Descriptions } from 'antd';
import useOfficesStore from '../store/offices';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useBreadcrumb } from './BreadCrumb';

export default function Criminal() {

    const { statesName, uid } = useParams();
    const { getCriminals } = useOfficesStore();
    const criminal = getCriminals(statesName, uid);
    const { setBreadcrumbItems } = useBreadcrumb();


    useEffect(() => {
        setBreadcrumbItems([{ title: 'Map' }, { title: statesName }, { title: uid }]);
    }, [statesName, uid, setBreadcrumbItems]);

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
            <Descriptions title="Criminal info" bordered items={info_criminal} column={24} />
            <Descriptions title="Description info" bordered items={info_discription} />
        </>
    )
}
