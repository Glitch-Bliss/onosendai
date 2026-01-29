import { ElementType } from "../enums/element-type.enum";
import { QrTypeMeta } from "../models/QRTypes-meta.model";


export const QR_TYPE_REGISTRY: Record<ElementType, QrTypeMeta> = {
    [ElementType.VEHICLE]: {
        label: 'Vehicle',
        image: 'assets/element-types/vehicle.png',
        qrcodeIndex: 1
    },
    [ElementType.BUILDING]: {
        label: 'Building',
        image: 'assets/element-types/building.png',
        qrcodeIndex: 2
    },
    [ElementType.NPC]: {
        label: 'Npc',
        image: 'assets/element-types/npc.png',
        qrcodeIndex: 3
    },
    [ElementType.OBJECT]: {
        label: 'Object',
        image: 'assets/element-types/object.png',
        qrcodeIndex: 4
    },
    [ElementType.SCATTER]: {
        label: 'Scatter',
        image: 'assets/element-types/scatter.png',
        qrcodeIndex: 5
    }                
};
