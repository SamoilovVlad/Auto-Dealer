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
        /// Retrieves a collection of auto images associated with the specified criteria.
        /// </summary>
        /// <param name="id">The ID of the auto for which to retrieve the images.</param>
        /// <returns>An IQueryable collection of AutoImageModel objects representing the images associated with the auto matching the specified ID.</returns>
        public async Task<IQueryable<AutoImageModel>> GetAutoImagesByAutoID(string id)
        {
            IQueryable<AutoImageModel> imagesQuery = _DbContext.AutosImages.Where(img => img.Image_ID.StartsWith(id+"$$"));
            return await Task.FromResult(imagesQuery);
        }
    }
}
