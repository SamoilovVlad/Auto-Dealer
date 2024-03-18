const AppApi = {
    async getCarsByMakerName(name, count) {
        try {
            const response = await fetch(`Autos/${name}`);
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

    async getAutoDataById(id) {
        try {
            const response = await fetch(`Autos/auto/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching auto data by ID:', error);
            throw error;
        }
    },

    async getAutoImagesById(id) {
        try {
            const response = await fetch(`Autos/images/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching auto data by ID:', error);
            throw error;
        }
    },

    async getAutoImageByGenmodelName(genmodelName) {
        try {
            const response = await fetch(`Autos/image/${genmodelName}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching auto data by ID:', error);
            throw error;
        }
    },

    async getAutoInfoByModelName(modelName) {
        try {
            const response = await fetch(`Autos/modelInfo/${modelName}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching auto data by ID:', error);
            throw error;
        }
    }
};

export default AppApi;

