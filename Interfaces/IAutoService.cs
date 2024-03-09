using Car_Dealer.Models;

namespace Car_Dealer.Interfaces
{
    public interface IAutoService
    {
        /// <summary> Retrieves all autos asynchronously. </summary>
        Task<List<AutoModel>> GetAllAutos();

        /// <summary> Retrieves an auto by its ID asynchronously. </summary>
        /// <param name="id"> The ID of the auto. </param>
        /// <returns> An asynchronous operation returning AutoModel. </returns>
        Task<AutoModel?> GetAutoById(string id);

        /// <summary> Creates an auto asynchronously. </summary>
        /// <param name="auto"> The auto to create. </param>
        Task CreateAuto(AutoModel auto);

        /// <summary> Updates an auto asynchronously. </summary>
        /// <param name="auto"> The auto to update. </param>
        Task UpdateAuto(AutoModel auto);

        /// <summary> Deletes an auto asynchronously. </summary>
        /// <param name="id"> The ID of the auto to delete. </param>
        Task DeleteAuto(int id);

        /// <summary> Retrieves all autos by maker name asynchronously. </summary>
        /// <param name="makerName"> The name of the auto maker. </param>
        /// <returns> An asynchronous operation returning IQueryable of AutoModel. </returns>
        Task<IQueryable<AutoModel?>> GetAutosByMakerName(string makerName);

        /// <summary> Retrieves names of all auto makers asynchronously. </summary>
        Task<List<string?>> GetAllAutoMakers();

        /// <summary> Retrieves all generation models by maker name asynchronously. </summary>
        /// <param name="makerName"> The name of the auto maker. </param>
        /// <returns> An asynchronous operation returning a list of distinct generation models. </returns>
        Task<List<string?>> GetAllGenModelByMakerName(string makerName);

        /// <summary> Retrieves autos for the specified generation model and maker name asynchronously. </summary>
        /// <param name="makerName"> The name of the auto maker. </param>
        /// <param name="genModel"> The generation model. </param>
        /// <returns> An asynchronous operation returning IQueryable of AutoModel. </returns>
        Task<IQueryable<AutoModel?>> GetAllAutosByGenModel(string makerName, string genModel);

        /// <summary>
        /// Retrieves a collection of auto images associated with the specified criteria.
        /// </summary>
        /// <param name="id">The ID of the auto for which to retrieve the images.</param>
        /// <returns>An IQueryable collection of AutoImageModel objects representing the images associated with the auto matching the specified ID.</returns>
        Task<IQueryable<AutoImageModel>> GetAutoImagesByAutoID(string id);
    }
}
