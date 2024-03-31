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
        Task<AutoModel?> GetAutoByAdvId(string id);

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
        Task<IQueryable<AutoModel?>> GetAutosByMakerNameAsync(string makerName);

        /// <summary> Retrieves names of all auto makers asynchronously. </summary>
        Task<List<string?>> GetAllAutoMakersNameAsync();

        /// <summary> Retrieves all generation models by maker name asynchronously. </summary>
        /// <param name="makerName"> The name of the auto maker. </param>
        /// <returns> An asynchronous operation returning a list of distinct generation models. </returns>
        Task<List<string?>> GetAllGenModelByMakerNameAsync(string makerName);

        /// <summary> Retrieves autos for the specified generation model and maker name asynchronously. </summary>
        /// <param name="makerName"> The name of the auto maker. </param>
        /// <param name="genModel"> The generation model. </param>
        /// <returns> An asynchronous operation returning IQueryable of AutoModel. </returns>
        Task<IQueryable<AutoModel?>> GetAllAutosByGenModelAsync(string makerName, string genModel);

        /// <summary>
        /// Retrieves a collection of auto images associated with the specified criteria.
        /// </summary>
        /// <param name="id">The ID of the auto for which to retrieve the images.</param>
        /// <returns>An IQueryable collection of AutoImageModel objects representing the images associated with the auto matching the specified ID.</returns>
        Task<IQueryable<AutoImageModel>> GetAutoImagesByAdvIdAsync(string id);

        /// <summary>
        /// Retrieves count of existing autos with some model. 
        /// </summary>
        /// <param name="genModel"></param>
        /// <returns>int which represent number of autos</returns>
        Task<int> GetAutoCountByGenModelAsync(string makerName, string genModel);

        /// <summary>
        /// Gets the body type of a specific car model.
        /// </summary>
        /// <param name="genModel">The generic model name of the car.</param>
        /// <returns>A task representing the asynchronous operation that returns the body type of the specified car model as a string.</returns>
        Task<string> GetModelBodyTypeAsync(string makerName, string genModel);

        /// <summary>
        /// Retrieves the top speed of a specific car model.
        /// </summary>
        /// <param name="genModel">The generic model name of the car.</param>
        /// <returns>A task representing the asynchronous operation that returns the top speed of the specified car model as an integer.</returns>
        Task<int> GetModelTopSpeedAsync(string makerName, string genModel);

        /// <summary>
        /// Retrieves the average price of a specific car model.
        /// </summary>
        /// <param name="genModel">The generic model name of the car.</param>
        /// <returns>A task representing the asynchronous operation that returns the average price of the specified car model as an integer.</returns>
        Task<int> GetModelAveragePriceAsync(string makerName, string genModel);

    }
}