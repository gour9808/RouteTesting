//pROBABLY NOT gonna use this
export module FuelType {

    export enum EngineType {
        PETROL,
        DIESEL,
        FLEXI_FUEL,
        ELECTRICITY,
        LPG,
        NG,
        HYDROGEN,
        PETROL_ETHANOL
    }
    export const FuelType = [
        { name: "Normal", engineType: EngineType.PETROL },
        { name: "Super", engineType: EngineType.PETROL },
        { name: "Super E10", engineType: EngineType.PETROL },
        { name: "Super Premium", engineType: EngineType.PETROL },
        { name: "Diesel", engineType: EngineType.DIESEL },
        { name: "Diesel Premium", engineType: EngineType.DIESEL },
        { name: "Exhaust Fluid", engineType: EngineType.DIESEL },
        { name: "Truck Diesel", engineType: EngineType.DIESEL },
        { name: "CNG", engineType: EngineType.NG },
        { name: "LPG", engineType: EngineType.LPG },
        { name: "Ethanol", engineType: EngineType.PETROL_ETHANOL },
        { name: "Hydrogen", engineType: EngineType.HYDROGEN },
        { name: "Electricity", engineType: EngineType.ELECTRICITY },
        { name: "Petrol", engineType: EngineType.PETROL },
        { name: "Petrol Premium", engineType: EngineType.PETROL }
    ]
}