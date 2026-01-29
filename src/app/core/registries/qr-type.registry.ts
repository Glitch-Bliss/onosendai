import { ElementType } from "../enums/element-type.enum";
import { QrTypeMeta } from "../models/QRTypes-meta.model";

export const QR_TYPE_REGISTRY: Record<ElementType, QrTypeMeta> = {
    [ElementType.VEHICLE]: {
        label: 'Vehicle',
        image: '/public/assets/element-types/vehicle.png',
    },
    [ElementType.BUILDING]: {
        label: 'Vehicle',
        image: 'assets/element-types/vehicle.png',
    },
    [ElementType.NPC]: {
        label: 'Vehicle',
        image: 'assets/element-types/vehicle.png',
    },
    [ElementType.OBJECT]: {
        label: 'Vehicle',
        image: 'assets/element-types/vehicle.png',
    },
    [ElementType.SCATTER]: {
        label: 'Vehicle',
        image: 'assets/element-types/vehicle.png',
    }                
};
