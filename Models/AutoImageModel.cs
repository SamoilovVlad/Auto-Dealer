using System.ComponentModel.DataAnnotations;

namespace Car_Dealer.Models
{
    public class AutoImageModel
    {
        public string? Genmodel_ID { get; set; }
        public string? Image_ID { get; set;}
        [Key]
        public string? Image_name { get; set;}
        public short? Predicted_viewpoint { get; set; }
        public string? Quality_check { get; set; }
    }
}
