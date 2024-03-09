import AppApi from "./AppApi";
import GoogleApi from "./GoogleApi";


const Auto = (auto) => {
    async function GetFullDataByAutoId(id) {
        const autoData = await AppApi.getAutoDataById(id)
        console.log(autoData);
        const imagesData = await AppApi.getAutoImagesById(autoData.adv_ID);
        console.log(imagesData);
        const promises = [];

        for (var i = 0; i < imagesData.length; i++) {
            promises.push(
                (async () => {
                    const data1 = await GoogleApi.searchFileByName(imagesData[i].image_name);
                    const data2 = await GoogleApi.fetchDriveData(data1);
                    var img = document.createElement('img');
                    img.src = data2;
                    var root = document.querySelector('body');
                    root.appendChild(img);
                })()
            );
        }
        await Promise.all(promises);
    }

    GetFullDataByAutoId(auto.id);
}

export default Auto;