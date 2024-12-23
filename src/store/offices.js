import { create } from 'zustand';
import fieldOffices from '../constants/fieldOffices';
import OfficeService from '../services/office.service';

const generateDefaultStates = () => {
    const obj = {};
    fieldOffices.forEach((data) => {
        if (!obj[data.state]) {
            obj[data.state] = { total: 0 };
        }
        data.offices.forEach((office) => {
            const formattedOfficeName = OfficeService.formatOfficeName(office);
            if (!obj[data.state][formattedOfficeName]) {
                obj[data.state][formattedOfficeName] = { total: 0, data: [] };
            }
        })

    })
    console.log(obj)
    return obj;
}

const useOfficesStore = create((set, get) => ({
    selectedState: null,
    setSelectedState: (state) => {
        set({ selectedState: state });
    },
    states: generateDefaultStates(),
    setStateOfficesResults: (office, data) => {
        const selectedState = get().selectedState;
        console.log(selectedState.state, office, data.length);
    },
    updateStateData: (stateName, officeName, totals, newData) => {
        set((state) => {
            if (!state.states[stateName]) {
                console.error(`State "${stateName}" not found in states.`);
                return;
            }
            if (!state.states[stateName][officeName]) {
                console.error(`Office "${officeName}" not found in state "${stateName}".`);
                return;
            }

            const updatedState = {
                states: {
                    ...state.states, // Copie les autres États sans les modifier
                    [stateName]: {
                        ...state.states[stateName],
                        total: totals,
                        // Copie l'État spécifique
                        [officeName]: {
                            ...state.states[stateName][officeName], // Copie les données existantes du bureau
                            ...newData, // Fusionne avec les nouvelles données
                        },
                    },
                },
            };
            console.log("updatedState:", updatedState); // Maintenant, updatedState est défini
            return updatedState;

        });
    },
    getOfficeStates: (stateName) => {

        return get().states[stateName] || {};
    },
}));

export default useOfficesStore;