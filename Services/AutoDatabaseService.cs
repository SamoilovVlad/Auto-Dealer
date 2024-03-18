using Car_Dealer.Models;
using Microsoft.Identity.Client;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Car_Dealer.Database;
using Car_Dealer.Interfaces;

namespace Car_Dealer.Services
{
    //Class which represent functionality of my DB
    public class AutoDatabaseService : IAutoService
    {
        private readonly AutoDatabase _DbContext;
        public AutoDatabaseService(AutoDatabase DbContext)
        {
            _DbContext = DbContext;
        }

        public Task CreateAuto(AutoModel auto)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteAuto(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<AutoModel>> GetAllAutos()
        {
            throw new NotImplementedException();
        }


        /// <summary>
        /// Retrieves an auto by its ID asynchronously.
        /// </summary>
        /// <param name="id">The ID of the auto.</param>
        /// <returns>An asynchronous operation returning AutoModel.</returns>
        public async Task<AutoModel?> GetAutoById(string id)
        {
            return await _DbContext
                         .Autos
                         .FirstOrDefaultAsync(auto => auto.Adv_ID == id);
        }

        public Task UpdateAuto(AutoModel auto)
        {
            throw new NotImplementedException();
        }


        /// <summary>
        /// Retrieves all autos by maker name asynchronously.
        /// </summary>
        /// <param name="makerName">The name of the maker.</param>
        /// <returns>An asynchronous operation returning IQueryable of AutoModel.</returns>
        public async Task<IQueryable<AutoModel?>> GetAutosByMakerName(string makerName)
        {
            IQueryable<AutoModel?> autosQuery = _DbContext
                                           .Autos
                                           .Where(auto => auto.Maker == makerName);
            return await Task.FromResult(autosQuery);
        }


        /// <summary>
        /// Retrieves all distinct auto makers asynchronously.
        /// </summary>
        /// <returns>A list of distinct auto makers.</returns>
        public async Task<List<string?>> GetAllAutoMakers()
        {
            List<string?> makers = await _DbContext
                                        .Autos
                                        .Select(auto => auto.Maker)
                                        .Distinct()
                                        .ToListAsync();
            return makers;
        }


        /// <summary>
        /// Retrieves all distinct generation models by maker name asynchronously.
        /// </summary>
        /// <param name="makerName">The name of the auto maker.</param>
        /// <returns>A list of distinct generation models.</returns>
        public async Task<List<string?>> GetAllGenModelByMakerName(string makerName)
        {
            List<string?> models = await _DbContext
                                            .Autos
                                            .Where(auto => auto.Maker == makerName)
                                            .Select(auto => auto.Genmodel)
                                            .Distinct()
                                            .ToListAsync();
            return models;
        }


        /// <summary>
        /// Retrieves all autos by generation model and maker name asynchronously.
        /// </summary>
        /// <param name="makerName">The name of the auto maker.</param>
        /// <param name="genModel">The generation model.</param>
        /// <returns>An asynchronous operation returning IQueryable of AutoModel.</returns>
        public async Task<IQueryable<AutoModel?>> GetAllAutosByGenModel(string makerName, string genModel)
        {
            IQueryable<AutoModel?> autosQuery = await GetAutosByMakerName(makerName);
            autosQuery = autosQuery.Where(auto => auto.Genmodel == genModel);
            return await Task.FromResult(autosQuery);
        }

        /// <summary>
        /// Retrieves count of existing autos with some model. 
        /// </summary>
        /// <param name="genModel"></param>
        /// <returns>int which represent number of autos</returns>
        public async Task<int> GetAutoCountByGenmodel(string genModel)
        {
            int count = _DbContext.Autos.Where(auto => auto.Genmodel == genModel).Count();
            return await Task.FromResult(count);
        }


        /// <summary>
        /// Retrieves a collection of auto images associated with the specified criteria.
        /// </summary>
        /// <param name="id">The ID of the auto for which to retrieve the images.</param>
        /// <returns>An IQueryable collection of AutoImageModel objects representing the images associated with the auto matching the specified ID.</returns>
        public async Task<IQueryable<AutoImageModel>> GetAutoImagesByAutoID(string id)
        {
            IQueryable<AutoImageModel> imagesQuery = _DbContext.AutosImages.Where(img => img.Image_ID.StartsWith(id+"$$"));
            return await Task.FromResult(imagesQuery);
        }

        /// <summary>
        /// Retrieves the primary auto image associated with the specified auto ID.
        /// </summary>
        /// <param name="id">The ID of the auto for which to retrieve the primary image.</param>
        /// <returns>
        /// A single AutoImageModel object representing the primary image associated with the auto
        /// matching the specified ID. Returns null if no image is found.
        /// </returns>
        public async Task<AutoImageModel> GetAutoImageByAutoGenModel(string genModel)
        {
            string id = _DbContext.Autos.FirstOrDefault(auto => auto.Genmodel == genModel).Genmodel_ID; 
            AutoImageModel image = _DbContext.AutosImages.FirstOrDefault(img => img.Image_ID.StartsWith(id+"$$") && img.Predicted_viewpoint == 90);
            if(image == null)
                _DbContext.AutosImages.FirstOrDefault(img => img.Image_ID.StartsWith(id + "$$") && img.Predicted_viewpoint <= 180);
            return await Task.FromResult(image);
        }

        /// <summary>
        /// Gets the body type of a specific car model.
        /// </summary>
        /// <param name="genModel">The generic model name of the car.</param>
        /// <returns>A task representing the asynchronous operation that returns the body type of the specified car model as a string.</returns>
        public async Task<string> GetModelBodyType(string genModel)
        {
            string bodyType = _DbContext.Autos.FirstOrDefault(auto => auto.Genmodel == genModel).Bodytype;
            return await Task.FromResult(bodyType);
        }

        /// <summary>
        /// Retrieves the top speed of a specific car model.
        /// </summary>
        /// <param name="genModel">The generic model name of the car.</param>
        /// <returns>A task representing the asynchronous operation that returns the top speed of the specified car model as an integer.</returns>
        public async Task<int> GetModelTopSpeed(string genModel)
        {
            int topSpeed = await _DbContext.Autos
                                  .Where(auto => auto.Genmodel == genModel && auto.Top_speed.HasValue)
                                  .OrderByDescending(auto => auto.Top_speed)
                                  .Select(auto => auto.Top_speed.Value)
                                  .FirstOrDefaultAsync();

            return topSpeed!=null ? topSpeed : 0;
        }

        /// <summary>
        /// Retrieves the average price of a specific car model.
        /// </summary>
        /// <param name="genModel">The generic model name of the car.</param>
        /// <returns>A task representing the asynchronous operation that returns the average price of the specified car model as an integer.</returns>
        public async Task<int> GetModelAveragePrice(string genModel)
        {
            var averagePrice = await _DbContext.Autos
                                        .Where(auto => auto.Genmodel == genModel && auto.Price.HasValue)
                                        .AverageAsync(auto => auto.Price);
            return averagePrice.HasValue ? (int)averagePrice : 0;
        }
    }
}
