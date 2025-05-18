// src/app/architecture/data.ts
export const architectureSubcategories = {
    "facadeEngineering": [
        "facadeEngineering.subcategories.structuralCalculations",
        "facadeEngineering.subcategories.insulation"
    ],
    "energyEfficiency": [
        "energyEfficiency.subcategories.sunControlSystems",
        "energyEfficiency.subcategories.smartFacadeSystems",
        "energyEfficiency.subcategories.naturalVentilation"
    ],
    "facadeSystems": [
        "facadeSystems.subcategories.ventilatedFacadeSystems",
        "facadeSystems.subcategories.glassFacadeSystems",
        "facadeSystems.subcategories.prefabFacadeElements"
    ],
    "facadeLighting": [
        "facadeLighting.subcategories.nightLighting",
        "facadeLighting.subcategories.aestheticLighting"
    ],
    "facadeRestoration": [
        "facadeRestoration.subcategories.facadeRenovation",
        "facadeRestoration.subcategories.historicFacadeRestoration"
    ],
    "projectManagement": [
        "projectManagement.subcategories.projectManagement",
        "projectManagement.subcategories.materialSupply",
        "projectManagement.subcategories.implementationConsulting"
    ]
};

export function hasSubcategories(key: string): boolean {
    return Object.keys(architectureSubcategories).includes(key);
}