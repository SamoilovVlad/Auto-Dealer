const AppApi = {
    async getAutosByMakerAndModelNames(makerName, genmodelName, page = 0, pageSize = 12, filters) {
        try {
            const response = await fetch(`Autos/${makerName}/Models/${genmodelName}?page=${page}&pageSize=${pageSize}` +
                `${filters.bodyType ? "&bodyType=" + filters.bodyType : ""}` +
                `${filters.gearboxType ? "&gearBox=" + filters.gearboxType : ""}` +
                `${filters.fuelType ? "&fuelType=" + filters.fuelType : ""}` +
                `${filters.minPrice ? "&minPrice=" + filters.minPrice : ""}` +
                `${filters.maxPrice ? "&maxPrice=" + filters.maxPrice : ""}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching cars by maker name:', error);
            throw error;
        }
    },

    async getAutoModelsByMakerName(maker) {
        try {
            const response = await fetch(`Autos/${maker}/Models`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching cars by maker name:', error);
            throw error;
        }
    },

    async getAutoImagesById(advId) {
        try {
            const response = await fetch(`Autos/images/${advId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching auto data by ID:', error);
            throw error;
        }
    },

    async getAutoImageByGenmodelName(makerName, genmodelName) {
        try {
            const response = await fetch(`Autos/image/${makerName}/${genmodelName}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching auto data by ID:', error);
            throw error;
        }
    },

    async getAutoInfoByModelName(makerName, modelName) {
        try {
            const response = await fetch(`Autos/modelInfo/${makerName}/${modelName}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching auto data by ID:', error);
            throw error;
        }
    },

    async getAutoInfoByAdvId(advId) {
        try {
            const response = await fetch(`Autos/auto/info/${advId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching auto data by ID:', error);
            throw error;
        }
    }
};

export default AppApi;