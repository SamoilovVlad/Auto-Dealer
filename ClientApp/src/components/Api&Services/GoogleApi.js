const GoogleApi = {
    client_ID: '10255400254-l2tptfksa0cfq5ghq4mmjslr5sfpb3t1.apps.googleusercontent.com',
    client_Secret: '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',
    refresh_token: '1//04kgtLfmImRmMCgYIARAAGAQSNwF-L9IrpobZF2ecWzmq0J-xw-9XnpBabgROfcnLEkynV6QPh-mi0kW9-6mNGGyVjy60kPbjhSs',
    api_key: 'AIzaSyDqBSjBa-mXgNuASntjm2Fd3uatdgcK3M8',

    async getAccessToken() {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');

            if (name === 'access_token') {
                return decodeURIComponent(value);
            }
        }
        return null;
    },

    async saveAccessTokenToCookie(access_token, expires_in_minutes = 55) {
        const expires = new Date(Date.now() + expires_in_minutes * 60000);
        document.cookie = `access_token=${access_token}; expires=${expires.toUTCString()}`;
    },

    async refreshToken() {
        const clientID = this.client_ID;
        const clientSecret = this.client_Secret;
        const refreshToken = this.refresh_token;

        try {
            const response = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: clientID,
                    client_secret: clientSecret,
                    refresh_token: refreshToken,
                    grant_type: 'refresh_token'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const responseData = await response.json();
            const accessToken = responseData.access_token;
            await this.saveAccessTokenToCookie(accessToken, 55);
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    },

    async checkAndReturnAccessToken(access_token) {
        if (access_token === null) {
            await this.refreshToken();
            console.log('access_token was refreshed');
            return await this.getAccessToken();
        }
        return access_token;
    },

    async fetchDriveData(fileId) {
        try {
            const access_token = await this.checkAndReturnAccessToken(await this.getAccessToken());

            const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${this.api_key}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from Google Drive');
            }
            const blob = await response.blob();
            //const imageUrl = URL.createObjectURL(blob);
            //const imgElement = document.createElement('img');
            //imgElement.src = imageUrl;

            //document.body.appendChild(imgElement);
            return blob;

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    },

    async searchFileByName(fileName) {
        const access_token = await this.checkAndReturnAccessToken(await this.getAccessToken());

        try {
            const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=name='${fileName}'+and+mimeType='image/jpeg'&key=${this.api_key}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to search for file in Google Drive');
            }

            const responseData = await response.json();
            return responseData.files[0];

        } catch (error) {
            console.error('Error searching for file:', error.message);
            return null;
        }
    },

    async getImageSrc(id) {
        return `https://drive.google.com/thumbnail?id=${id}`;
    }
}

export default GoogleApi;
