using Car_Dealer.Models;
using Microsoft.Identity.Client;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Car_Dealer.Database;
using Car_Dealer.Interfaces;

namespace Car_Dealer.Services
{
    // Class representing the functionality of the auto database
    public class AutoDatabaseService : IAutoService
    {
        private readonly AutoDatabase _DbContext;

        // Constructor of the class
        public AutoDatabaseService(AutoDatabase DbContext)
        {
            _DbContext = DbContext;
        }

        // Method to create an auto (Not implemented)
        public Task CreateAuto(AutoModel auto)
        {
            throw new NotImplementedException();
        }

        // Method to delete an auto (Not implemented)
        public Task DeleteAuto(int id)
        {
            throw new NotImplementedException();
        }

        // Method to get all autos (Not implemented)
        public IQueryable<AutoModel> GetAllAutos()
        {
            // Повертає запит IQueryable<AutoModel> з бази даних
            return _DbContext.Autos.AsQueryable();
        }


        // Method to get an auto by advertisement ID
        public async Task<AutoModel?> GetAutoByAdvId(string advId)
        {
            return await _DbContext
                         .Autos
                         .FirstOrDefaultAsync(auto => auto.Adv_ID == advId);
        }

        // Method to update an auto (Not implemented)
        public Task UpdateAuto(AutoModel auto)
        {
            throw new NotImplementedException();
        }

        // Method to get autos by maker name asynchronously
        public async Task<IQueryable<AutoModel?>> GetAutosByMakerNameAsync(string makerName)
        {
            IQueryable<AutoModel?> autosQuery = _DbContext
                                        .Autos
                                        .FilterByBrand(makerName);
            return await Task.FromResult(autosQuery);
        }

        // Method to get all auto makers' names asynchronously
        public async Task<List<string?>> GetAllAutoMakersNameAsync()
        {
            List<string?> makers = await _DbContext
                                        .Autos
                                        .Select(auto => auto.Maker)
                                        .Distinct()
                                        .ToListAsync();
            return makers;
        }

        // Method to get all generation models by maker name asynchronously
        public async Task<List<string?>> GetAllGenModelByMakerNameAsync(string makerName)
        {
            List<string?> models = await _DbContext
                                            .Autos
                                            .FilterByBrand(makerName)
                                            .Select(auto => auto.Genmodel)
                                            .Distinct()
                                            .ToListAsync();
            return models;
        }

        // Method to get all autos by generation model and maker name asynchronously
        public async Task<IQueryable<AutoModel?>> GetAllAutosByGenModelAsync(string makerName, string genModel)
        {
            IQueryable<AutoModel?> autosQuery = await GetAutosByMakerNameAsync(makerName);
            autosQuery = autosQuery.FilterByModel(genModel);
            return autosQuery;
        }

        // Method to get the count of autos by generation model asynchronously
        public async Task<int> GetAutoCountByGenModelAsync(string makerName, string genModel)
        {
            IQueryable<AutoModel?> autos = await GetAllAutosByGenModelAsync(makerName, genModel);
            return await autos.CountAsync();
        }

        // Method to get auto images by advertisement ID asynchronously
        public async Task<IQueryable<AutoImageModel>> GetAutoImagesByAdvIdAsync(string advId)
        {
            IQueryable<AutoImageModel> imagesQuery = _DbContext
                                                     .AutosImages
                                                     .Where(img => img.Image_ID.StartsWith(advId + "$$"));

            return await Task.FromResult(imagesQuery);
        }

        // Method to get the body type of a model asynchronously
        public async Task<string> GetModelBodyTypeAsync(string makerName, string genModel)
        {
            IQueryable<AutoModel?> autos = await GetAllAutosByGenModelAsync(makerName, genModel);
            string? bodyType = await autos
                                    .Where(auto => auto.Bodytype != null)
                                    .Select(auto => auto.Bodytype)
                                    .FirstOrDefaultAsync();

            return bodyType != null ? bodyType : "Not Mentioned";
        }

        // Method to get the top speed of a model asynchronously
        public async Task<int> GetModelTopSpeedAsync(string makerName, string genModel)
        {
            IQueryable<AutoModel?> autos = await GetAllAutosByGenModelAsync(makerName, genModel);
            int? topSpeed = await autos
                                  .Where(auto => auto.Top_speed.HasValue)
                                  .Select(auto => auto.Top_speed)
                                  .FirstOrDefaultAsync();

            return topSpeed != null ? (int)topSpeed : 0;
        }

        // Method to get the average price of a model asynchronously
        public async Task<int> GetModelAveragePriceAsync(string makerName, string genModel)
        {
            IQueryable<AutoModel?> autos = await GetAllAutosByGenModelAsync(makerName, genModel);
            int? averagePrice = (int?)await autos
                                          .Where(auto => auto.Price.HasValue)
                                          .Select(auto => auto.Price)
                                          .AverageAsync();

            if (averagePrice == null) return 0;
            return (int)averagePrice;
        }
    }
}
