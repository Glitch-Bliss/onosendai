import { ElementType } from "../enums/element-type.enum";
import { QrTypeMeta } from "../models/QRTypes-meta.model";


export const QR_TYPE_REGISTRY: Record<ElementType, QrTypeMeta> = {
    [ElementType.VEHICLE]: {
        label: 'Vehicle',
        image: 'assets/element-types/vehicle.png',
        qrcodeIndex: 1
    },
    [ElementType.BUILDING]: {
        label: 'Vehicle',
        image: 'assets/element-types/vehicle.png',
        qrcodeIndex: 2
    },
    [ElementType.NPC]: {
        label: 'Vehicle',
        image: 'assets/element-types/vehicle.png',
        qrcodeIndex: 3
    },
    [ElementType.OBJECT]: {
        label: 'Vehicle',
        image: 'assets/element-types/vehicle.png',
        qrcodeIndex: 4
    },
    [ElementType.SCATTER]: {
        label: 'Vehicle',
        image: 'assets/element-types/vehicle.png',
        qrcodeIndex: 5
    }                
};
