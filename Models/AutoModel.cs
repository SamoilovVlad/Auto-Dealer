using System.ComponentModel.DataAnnotations;

namespace Car_Dealer.Models
{
    public class AutoModel
    {
        public string? Maker { get; set; }
        public string? Genmodel { get; set; }
        public string Genmodel_ID { get; set; }
        [Key]
        public string? Adv_ID { get; set; }
        public int? Adv_year { get; set;}
        public int? Adv_month { get; set; }
        public string? Color { get; set; }
        public int? Reg_year { get; set;}
        public string? Bodytype { get; set;}
        public int? Runned_Miles { get; set;}
        public string? Engin_size { get; set;}
        public string? Gearbox { get; set;}
        public string? Fuel_type { get;set;}
        public int? Price { get; set;}
        public decimal? Engine_power { get; set;}
        public int? Annual_Tax { get; set;}
        public int? Wheelbase { get; set;}
        public int? Height { get; set;}
        public int? Width { get; set; }
        public int? Length { get; set; }
        public decimal? Average_mpg { get; set;} // in mpg.
        public int? Top_speed { get; set;} // in mph.
        public int? Seat_num { get; set; }
        public int? Door_num { get; set;}
    }
}
