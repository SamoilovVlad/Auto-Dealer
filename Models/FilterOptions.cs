namespace Car_Dealer.Models;
public class FilterOptions
{
    public int? PriceFrom { get; set; }
    public int? PriceTo { get; set; }
    public int? MilesFrom { get; set; }
    public int? MilesTo { get; set; }
    public List<string> GearboxType { get; set; }
    public List<string> FuelType { get; set; }
    public string Brand { get; set; }
    public string Model { get; set; }
    public string BodyType { get; set; }
    public string Color { get; set; }
}
