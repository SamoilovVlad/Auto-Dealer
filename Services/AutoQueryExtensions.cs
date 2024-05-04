using Car_Dealer.Models;

public static class AutoQueryExtensions
{
    public static IQueryable<AutoModel> FilterByBrand(this IQueryable<AutoModel> query, string brand)
    {
        if (brand != null && brand.Length > 0)
            return query.Where(auto => auto.Maker == brand);
        return query;
    }

    public static IQueryable<AutoModel> FilterByModel(this IQueryable<AutoModel> query, string model)
    {
        if (model != null && model.Length > 0)
            return query.Where(auto => auto.Genmodel == model);
        return query;
    }

    public static IQueryable<AutoModel> FilterByBodyType(this IQueryable<AutoModel> query, string bodyType)
    {
        if (bodyType != null && bodyType.Length > 0)
            return query.Where(auto => auto.Bodytype == bodyType);
        return query;
    }

    public static IQueryable<AutoModel> FilterByColor(this IQueryable<AutoModel> query, string color)
    {
        if (color != null && color.Length > 0)
            return query.Where(auto => auto.Color == color);
        return query;
    }

    public static IQueryable<AutoModel> FilterByGearboxType(this IQueryable<AutoModel> query, List<string> gearboxTypes)
    {
        if (gearboxTypes != null && gearboxTypes.Count > 0)
            return query.Where(auto => gearboxTypes.Contains(auto.Gearbox));
        return query;
    }

    public static IQueryable<AutoModel> FilterByFuelType(this IQueryable<AutoModel> query, List<string> fuelTypes)
    {
        if (fuelTypes != null && fuelTypes.Count > 0)
            return query.Where(auto => fuelTypes.Contains(auto.Fuel_type));
        return query;
    }

    public static IQueryable<AutoModel> FilterByPriceRange(this IQueryable<AutoModel> query, int? priceFrom, int? priceTo)
    {
        if (priceFrom.HasValue)
            query = query.Where(auto => auto.Price >= priceFrom.Value);
        if (priceTo.HasValue)
            query = query.Where(auto => auto.Price <= priceTo.Value);
        return query;
    }

    public static IQueryable<AutoModel> FilterByMilesRange(this IQueryable<AutoModel> query, int? milesFrom, int? milesTo)
    {
        if (milesFrom.HasValue)
            query = query.Where(auto => auto.Runned_Miles >= milesFrom.Value);
        if (milesTo.HasValue)
            query = query.Where(auto => auto.Runned_Miles <= milesTo.Value);
        return query;
    }
}
